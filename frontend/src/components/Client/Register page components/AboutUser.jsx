import React, { useContext, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import { registerContext } from '../../../context/RegisterContext';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from "react-icons/fa";
import SelectLevel from './SelectLevel';
import { useGetAllAvatarQuery } from '../../../redux/rtk query/Slices/avatarSlice';
import { usePostRegisterMutation } from '../../../redux/rtk query/Slices/registerSlice';
import LoaderIcon from '../../Loaders/Loader';

let validationSchema = yup.object().shape({
    firstName: yup.string()
        .required("Please, enter your first name.")
        .trim()
        .matches(/^\S*$/, "Boşluqlar olmamalıdır")
        .max(20, "max 20 characters").min(3, "min 3 characters"),
    lastName: yup.string()
        .required("Please, enter your last name.")
        .trim()
        .matches(/^\S*$/, "Boşluqlar olmamalıdır")
        .max(20, "max 20 characters").min(3, "min 3 characters"),
    userName: yup.string()
        .required("Please, enter your username.")
        .trim()
        .matches(/^\S*$/, "Boşluqlar olmamalıdır")
        .max(20, "max 20 characters").min(3, "min 3 characters"),
    levelId: yup.string()
        .required("Please, enter your level.")
});

export default function AboutUser({ }) {
    let navigate = useNavigate()
    let { emailPassword } = useContext(registerContext)
    let [postRegister, { data: postData, error: postError, isError: postIsError, isLoading: postIsLoading }] = usePostRegisterMutation()

    let [selectedAvatar, setSelectedAvatar] = useState(null);
    let [binnaryAvatar, setBinnaryAvatar] = useState(null);
    // avatar data
    let { data, isLoading, error, isError } = useGetAllAvatarQuery()
    console.log(data);

    let [registerError, setRegisterError] = useState("")

    // console.log(data);

    useEffect(() => {
        if (!isLoading && !isError && data?.length > 0) {
            setSelectedAvatar(data[0]);
        }
    }, [isLoading, data, isError]);

    if (isError) {
        return <div className='my-5'>Error: {error}</div>;
    }

    // permission modal
    const [show, setShow] = useState(false);
    // avatar modal
    const [showAvatar, setShowAvatar] = useState(false);
    // select image in user's images
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setBinnaryAvatar(file)
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedAvatar(e.target.result);
            };
            reader.readAsDataURL(file);
            setShowAvatar(false)
        } else {
            alert("Zəhmət olmasa şəkil seçin");
        }
    };
    // page refresh warning 
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message = "Səhifəni yeniləyirsiniz, dəyişikliklər itə bilər!";
            event.returnValue = message;
            return message;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className='bg-[var(--bg-color)] text-[var(--text-color)] mt-[103px]'>
                        <Container>
                            <div className='py-5 max-w-[500px] my-0 mx-auto'>
                                {/* title */}
                                <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Register</h1>
                                {/* form */}
                                <Formik
                                    initialValues={
                                        {
                                            firstName: '',
                                            lastName: '',
                                            userName: '',
                                            aboutUser: '',
                                            loginAfterRegister: false,
                                            acceptMail: false,
                                            checkbox: false,
                                            avatarImage: null,
                                            levelId: ''
                                        }
                                    }
                                    validationSchema={validationSchema}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        let formData = new FormData()
                                        formData.append("UserName", values.userName);
                                        formData.append("FirstName", values.firstName);
                                        formData.append("LastName", values.lastName);
                                        formData.append("Email", emailPassword.email);
                                        formData.append("Password", emailPassword.password);
                                        formData.append("About", values.aboutUser);
                                        formData.append("LevelId", values.levelId);
                                        formData.append("LoginAfterRegister", values.loginAfterRegister);
                                        formData.append("AcceptMail", values.acceptMail);
                                        if (binnaryAvatar === null) {
                                            formData.append("AvatarId", values.AvatarId);
                                        } else {
                                            formData.append("AvatarImage", binnaryAvatar);
                                        }
                                        if (values.checkbox) {
                                            try {
                                                const response = await postRegister(formData);
                                                console.log(response);
                                                if (response) {
                                                    if (values.loginAfterRegister) {
                                                        localStorage.setItem("token", response.data.token);
                                                        localStorage.setItem("expiration", response.data.expiration);
                                                        navigate('/')
                                                    } else {
                                                        navigate("/login")
                                                    }
                                                }
                                                if (response.error) {
                                                    setRegisterError("❌ " + response.error.data)
                                                }
                                            } catch (error) {
                                                if (error.response) {
                                                    const { status, data, statusText } = error.response;
                                                    console.error("Error Status Code:", status);
                                                    console.error("Error Message:", data);
                                                    console.error("Error Status Text:", statusText);

                                                    if (status === 400) {
                                                        setRegisterError("❌ Bad request, check your input.");
                                                    } else if (status === 404) {
                                                        setRegisterError("❌ Endpoint not found.");
                                                    } else if (status === 500) {
                                                        setRegisterError("❌ Server error, please try again later.");
                                                    }
                                                } else {
                                                    console.error("Unknown error:", error);
                                                }
                                            }
                                        } else {
                                            alert("Şərtlərimiz ilə razılaşın")
                                            setSubmitting(false)
                                        }
                                    }}
                                >
                                    {({ isSubmitting, setFieldValue }) => (
                                        <>
                                            {
                                                useEffect(() => {
                                                    setFieldValue("AvatarId", selectedAvatar?.id);
                                                }, [selectedAvatar])
                                            }
                                            <Form >
                                                <div className='grid sm:grid-cols-2 sm:gap-4'>
                                                    <div>
                                                        <label htmlFor="firstName" className='mt-4 text-xl'>First Name: </label>
                                                        <Field type="text" name="firstName"
                                                            placeholder='Enter your first name'
                                                            className="focus:outline-none 
                                                            focus:shadow-[0_0px_300px_0px_#06b6d4] 
                                                            w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                                        <ErrorMessage name="firstName" component="div" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="lastName" className='mt-4 text-xl'>Last Name: </label>
                                                        <Field type="text" name="lastName"
                                                            placeholder='Enter your email'
                                                            className="focus:outline-none 
                                                            focus:shadow-[0_0px_300px_0px_#06b6d4] 
                                                            w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                                        <ErrorMessage name="lastName" component="div" />
                                                    </div>
                                                </div>
                                                <div className='grid sm:grid-cols-2 sm:gap-4'>
                                                    <div>
                                                        <label htmlFor="userName" className='mt-4 text-xl'> Username: </label>
                                                        <Field type="text" name="userName"
                                                            placeholder='Enter your username'
                                                            className="focus:outline-none 
                                                            focus:shadow-[0_0px_300px_0px_#06b6d4] 
                                                            w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                                        <ErrorMessage name="userName" component="div" />
                                                    </div>
                                                    <div className='flex items-center justify-center mt-4 gap-2'>
                                                        <label htmlFor="avatar" className='text-xl'>Avatar: </label>
                                                        <div onClick={() => setShowAvatar(true)} title='select avatar'
                                                            className="w-full p-2 rounded cursor-pointer flex items-center justify-center">
                                                            <img src={selectedAvatar?.id
                                                                ? `https://englishwithmovies.blob.core.windows.net/avatar/${selectedAvatar?.imgName}`
                                                                : selectedAvatar
                                                            }
                                                                alt="Selected Avatar" className="h-16 w-16 rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label htmlFor="levelId" className='mt-4 text-xl'>Your Level: </label>
                                                    <SelectLevel name='levelId' />
                                                    <ErrorMessage name="levelId" component="div" />
                                                </div>

                                                <div>
                                                    <label htmlFor="aboutUser" className='mt-4 text-xl'>About (optional): </label>
                                                    <Field type="text" name="aboutUser"
                                                        placeholder='Enter your about'
                                                        className="focus:outline-none 
                                                        focus:shadow-[0_0px_300px_0px_#06b6d4] 
                                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                                </div>

                                                <div className='flex items-center mt-4 text-lg checkbox-wrapper-19'>
                                                    <Field type="checkbox" name="loginAfterRegister" id='cbtest-19'
                                                        className="p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                                    <label htmlFor="cbtest-19" className='check-box'></label>
                                                    <label htmlFor="cbtest-19" className='cursor-pointer font-["PT_Serif"] ml-2'> Birbaşa Login etmək istəyirsiz mi? </label>
                                                </div>

                                                <div className='flex items-center checkbox-wrapper-19 mt-1 text-lg'>
                                                    <Field type="checkbox" name="acceptMail" id='cbtest-19-1'
                                                        className="p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                                    <label htmlFor="cbtest-19-1" className='check-box'></label>
                                                    <label htmlFor="cbtest-19-1" className='cursor-pointer ml-2'> Bildiriş maillərini qəbul edirsiniz mi? </label>
                                                </div>

                                                <div className='flex items-center checkbox-wrapper-19 mt-1 text-lg'>
                                                    <Field type="checkbox" name="checkbox" id='cbtest-19-2'
                                                        className="p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                                    <label htmlFor="cbtest-19-2" className='check-box'></label>
                                                    <label htmlFor="cbtest-19-2" className='cursor-pointer ml-2'>
                                                        <span
                                                            onClick={() => setShow(true)}
                                                            className='text-blue-400'> Şərtlərimizi</span> qəbul edirsiz mi?
                                                    </label>
                                                </div>
                                                <div>{registerError}</div>
                                                <div className='flex items-center justify-center'>
                                                    <button type="submit" disabled={isSubmitting}
                                                        className="max-w-[200px] text-xl font-semibold
                                                        text-[var(--text-color)] p-2 w-full mt-4
                                                        hover:text-white hover:bg-[#06b6d4] rounded-3xl   
                                                        transition-all ease-in duration-200">
                                                        {postIsLoading ? 'Registering...' : 'Confirm'}
                                                    </button>
                                                </div>
                                            </Form>
                                            {postData && <div>Registration Successful!</div>}
                                        </>
                                    )}
                                </Formik>
                                {/* or text */}
                                <div className='flex items-center justify-between gap-2 my-4'>
                                    <div className='h-[1px] w-full bg-[var(--text-color)]'></div>
                                    OR
                                    <div className='h-[1px] w-full bg-[var(--text-color)]'></div>
                                </div>
                                {/* login */}
                                <div className='text-center text-lg'>
                                    Have an account?
                                    <span onClick={() => navigate("/login")}
                                        className='cursor-pointer text-[#06b6d4]'> Log in!</span>
                                </div>
                            </div>

                            {/* Modal avatar */}
                            <Modal
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                size="lg"
                                className='flex items-center justify-center'
                                show={showAvatar}
                                onHide={() => setShowAvatar(false)}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton className='bg-[var(--movies-bg)] text-[var(--text-color)] rounded'>
                                    <Modal.Title>Choose Avatar</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='bg-[var(--movies-bg)] text-[var(--text-color)] rounded'>
                                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 items-center justify-between'>
                                        <>
                                            <div className="flex items-center justify-center">
                                                <div
                                                    onClick={handleButtonClick}
                                                    className="w-[60px] h-[60px] xs:w-[100px] xs:h-[100px] rounded-[50%] hover:opacity-60
                                                    flex items-center justify-center text-gray-300 text-3xl text-center
                                                    transition-all duration-200 ease-in cursor-pointer"
                                                    style={{
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                    }}
                                                >
                                                    {(<FaPlus className="cursor-pointer" />)}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        style={{ display: "none" }}
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                            </div>

                                            {data.map((avatar, index) => (
                                                !avatar.isCustom ? (
                                                    <img
                                                        key={index}
                                                        src={`https://englishwithmovies.blob.core.windows.net/avatar/` + avatar.imgName}
                                                        alt={`Avatar ${index + 1}`}
                                                        className={`w-20 h-20 rounded-full cursor-pointer border-3 ${selectedAvatar?.imgName === avatar.imgName ? "border-blue-500" : "border-transparent"
                                                            }`}
                                                        onClick={() => { setSelectedAvatar(avatar); setShowAvatar(false); }}
                                                    />
                                                ) : (<></>)
                                            ))}
                                        </>
                                    </div>
                                </Modal.Body>
                            </Modal>
                            {/* Modal terms */}
                            <Modal
                                show={show}
                                onHide={() => setShow(false)}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton className='bg-[var(--movies-bg)] text-[var(--text-color)] rounded'>
                                    <Modal.Title>Şərtlərimiz</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='bg-[var(--movies-bg)] text-[var(--text-color)] rounded'>
                                    <p>1 - dövüş kulübü’nün ilk kuralı, dövüş kulübü hakkında konuşmamaktır.</p>
                                    <p>2 - dövüş kulübü’nün ikinci kuralı, dövüş kulübü hakkında konuşmamaktır!</p>
                                    <p>3 - dövüş kulübünün üçüncü kuralı biri “pes” diye bağırır, sakatlanır ya da bayılırsa dövüş sona erer.</p>
                                    <p>4 - dördüncü kural, bir dövüşte yalnızca iki kişi dövüşür.</p>
                                    <p>5 - beşinci kural her seferde tek bir dövüş gerçekleşir.</p>
                                    <p>6 - altıncı kural t-shirt ve ayakkabı yok.</p>
                                    <p>7 - yedinci kural, dövüş ne kadar sürmesi gerekiyorsa o kadar sürer.</p>
                                    <p>8 - sekizinci ve son kural, eğer bu dövüş kulübü’nde ilk gecenizse, dövüşmek zorundasınız.</p>
                                </Modal.Body>
                            </Modal>
                        </Container >
                    </div >
                )
            }

        </>
    );
}