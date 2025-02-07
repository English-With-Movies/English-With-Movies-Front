import React, { useContext, useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import { registerContext } from '../../../context/RegisterContext';
// modal
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import Calcifer from '../../../assets/calcifer-streak1.png'
import Calcifer1 from '../../../assets/calcifer1.png'
import Calcifer2 from '../../../assets/calcifer2.png'
import Calcifer3 from '../../../assets/calcifer3.png'
import Calcifer4 from '../../../assets/calcifer4.png'
import { FaPlus } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa";

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
        .max(20, "max 20 characters").min(3, "min 3 characters")
});

export default function AboutUser({ setPage }) {
    let navigate = useNavigate()
    let { emailPassword } = useContext(registerContext)

    const [selectedAvatar, setSelectedAvatar] = useState(Calcifer);

    const otherAvatars = [Calcifer1, Calcifer2, Calcifer3, Calcifer4]

    // modal
    const [show, setShow] = useState(false);
    const [showAvatar, setShowAvatar] = useState(false);
    const fileInputRef = useRef(null);
    let defaultAvatar = <FaUserNinja />
    const [avatar, setAvatar] = useState(null);
    // səhifə yenilənəndə məlumatların silinəcəyi ilə bağlı xəbər verir
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




    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Zəhmət olmasa şəkil seçin");
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(event.target.result);
                setSelectedAvatar(event.target.result);
            };
            reader.readAsDataURL(file);
            setShowAvatar(false)
        }
    };

    return (
        <>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] '>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Register</h1>
                        {/* form */}
                        <Formik
                            initialValues={{ firstName: '', lastName: '', userName: '', aboutUser: '', checkboxLogin: false, checkbox: false }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log({ ...emailPassword, ...values });
                                if (values.checkbox) {
                                    if (values.checkboxLogin) {
                                        navigate("/")
                                    } else {
                                        navigate("/login")
                                    }
                                } else {
                                    alert("Şərtlərimiz ilə razılaşın")
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
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
                                                className="focus:outline-none hover:shadow-[0_0px_300px_0px_#06b6d4] w-full p-2 rounded cursor-pointer">
                                                {selectedAvatar ? <img src={selectedAvatar} alt="Selected Avatar" className="h-16 w-16 rounded-full" /> : defaultAvatar}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="aboutUser" className='mt-4 text-xl'>About (optional): </label>
                                        <Field type="text" name="aboutUser"
                                            placeholder='Enter your about'
                                            className="focus:outline-none 
                                        focus:shadow-[0_0px_300px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                        {/* <ErrorMessage name="aboutUser" component="div" /> */}
                                    </div>

                                    <div className='flex mt-4 text-lg'>
                                        <Field type="checkbox" name="checkboxLogin" id='checkboxLogin'
                                            className="mr-2 p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                        <label htmlFor="checkboxLogin" className='cursor-pointer'>Birbaşa Login etmək istəyirsiz mi? </label>
                                    </div>

                                    <div className='flex mt-4 text-lg'>
                                        <Field type="checkbox" name="checkbox" id='checkbox'
                                            className="mr-2 p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                        <label htmlFor="checkbox" className='cursor-pointer'>
                                            <span
                                                onClick={() => setShow(true)}
                                                className='text-blue-400'>Şərtlərimizi</span> qəbul edirsiz mi?
                                        </label>
                                    </div>

                                    <div className='flex items-center justify-center'>
                                        <button type="submit" disabled={isSubmitting}
                                            className="max-w-[200px] text-xl font-semibold
                                    text-[var(--text-color)] p-2 w-full mt-4
                                    hover:text-white hover:bg-[#06b6d4] rounded-3xl   
                                    transition-all ease-in duration-200">
                                            Confirm
                                        </button>
                                    </div>
                                </Form>
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
                            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 items-center justify-between'>
                                <>
                                    <div className="flex items-center justify-center">
                                        <div
                                            onClick={handleButtonClick}
                                            className="w-[100px] h-[100px] rounded-[50%] hover:opacity-60
                                        flex items-center justify-center text-gray-300 text-3xl text-center
                                        transition-all duration-200 ease-in cursor-pointer"
                                            style={{
                                                backgroundImage: `url(${avatar})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        >
                                            {/* Şəkil yoxdursa ikon görünsün */}
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

                                    {otherAvatars.map((avatar, index) => (
                                        <img
                                            key={index}
                                            src={avatar}
                                            alt={`Avatar ${index + 1}`}
                                            className={`w-20 h-20 rounded-full cursor-pointer border-2 ${selectedAvatar === avatar ? "border-blue-500" : "border-transparent"
                                                }`}
                                            onClick={() => { setSelectedAvatar(avatar); setShowAvatar(false); }}
                                        />
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
                </Container>
            </div>
        </>
    );
}