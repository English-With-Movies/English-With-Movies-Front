import Container from 'react-bootstrap/Container';
import Cup from '../../../assets/trophy.png'
import Calcifer from '../../../assets/calcifer-streak1.png'
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { userInfoContext } from '../../../context/UserInfo';
import { useContext, useEffect, useState } from 'react';
import { useGetByIdUserQuery, useUserUpdateProfileMutation } from '../../../redux/rtk query/Slices/userSlice';
import LoaderIcon from '../../../components/Loaders/Loader';
import { GrUserSettings } from "react-icons/gr";
import { useGetByIdAvatarQuery } from '../../../redux/rtk query/Slices/avatarSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
// material ui modal
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useGetAllFrameQuery } from '../../../redux/rtk query/Slices/frameSlice';
import { FaRegHeart } from 'react-icons/fa6';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

let validationSchema = yup.object().shape({
    firstName: yup.string()
        .required("First name is required.")
        .trim()
        .matches(/^\S*$/, "Boşluqlar olmamalıdır")
        .max(20, "max 20 characters").min(3, "min 3 characters"),
    lastName: yup.string()
        .required("Last name is required.")
        .trim()
        .matches(/^\S*$/, "Boşluqlar olmamalıdır")
        .max(20, "max 20 characters").min(3, "min 3 characters"),
    userName: yup.string()
        .required("Username is required.")
        .trim()
        .matches(/^\S*$/, "Boşluqlar olmamalıdır")
        .max(20, "max 20 characters").min(3, "min 3 characters"),
    email: yup.string().email().required("Email is required."),
});

export default function UserProfile() {
    // material ui modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { userInfo } = useContext(userInfoContext);
    const navigate = useNavigate();
    const userId = userInfo?.userId ?? "";
    const userQuery = useGetByIdUserQuery(userId, { skip: !userId });
    const avatarQuery = useGetByIdAvatarQuery(userQuery.data?.avatarId, { skip: !userQuery.data?.avatarId });
    const { data: allFrame } = useGetAllFrameQuery();

    if (userQuery.isError) {
        return <div>Error: {userQuery.error?.message}</div>;
    }
    const userData = userQuery.data;
    const userRefetch = userQuery.refetch
    console.log(userData);
    const avatarData = avatarQuery.data;
    let [userUpdateProfile] = useUserUpdateProfileMutation()

    const changeAvatar = (avatarData) => {
        console.log(avatarData);

    }

    useEffect(() => {
        if (userData) {
            userRefetch()
        }
    }, [])


    // function playBase64Audio(base64String) {
    //     // Base64 string-dən binary məlumat al
    //     const byteCharacters = atob(base64String);
    //     const byteNumbers = new Uint8Array(byteCharacters.length);
        
    //     for (let i = 0; i < byteCharacters.length; i++) {
    //         byteNumbers[i] = byteCharacters.charCodeAt(i);
    //     }
        
    //     // Binary məlumatı Blob-a çevir
    //     const blob = new Blob([byteNumbers], { type: 'audio/mp3' }); // Type-ı backenddən asılı olaraq dəyiş
        
    //     // Blob-dan URL yarat
    //     const audioUrl = URL.createObjectURL(blob);
    
    //     // Audio elementi yarat və oynat
    //     const audio = new Audio(audioUrl);
    //     audio.play();
    // }

    return (
        <>
            <Helmet>
                <title>{userData?.userName}</title>
            </Helmet>
            {
                userQuery.isLoading ? (
                    <LoaderIcon />
                ) : (
                    <>
                        <div className='user-profile bg-[var(--bg-color)] text-[var(--text-color)] pt-[170px] pb-[20px]'>
                            <Container>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    <div className='font-["PT_Serif"]'>
                                        <div onClick={() => changeAvatar(avatarData)} className='cursor-pointer relative flex items-center justify-center w-[220px] h-[220px]'>
                                            <img className='w-[75%] h-[75%] rounded-full object-cover z-0' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatarData?.imgName}`} alt="profile" />
                                            {
                                                userData?.userFrames &&
                                                userData?.userFrames.map((frame) => {
                                                    if (frame.isCurrent) {
                                                        let userFrame = allFrame?.find((value) => value.id == frame.frameId);
                                                        return (
                                                            <div
                                                                key={frame.frameId}
                                                                className="absolute w-full h-full bg-cover bg-center z-10"
                                                                style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}
                                                            ></div>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
                                        </div>
                                        <h4 onClick={() => navigate('/premium')} className='cursor-pointer p-2 rounded transition duration-200 hover:shadow-yellow-400 my-3 bg-[var(--movies-bg)] hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]'>PREMİUM OL!</h4>
                                        <h5 className='font-["Kanit"] text-lg'>{userData?.userName}</h5>
                                        <h5 className='text-md'>{userData?.firstName} {userData?.lastName}</h5>
                                        <p>{userData?.about}</p>
                                        <p>Ümumi xal: <span className='text-orange-500 font-bold text-lg'>{userData?.point}</span></p>
                                        <div onClick={() => handleOpen()} className='flex items-center gap-2 text-gray-400 cursor-pointer'><GrUserSettings /> Parametrlər</div>
                                    </div>

                                    <div>
                                        <div className='grid grid-cols-2 gap-4 mb-4'>
                                            <div className='hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)] cursor-pointer p-2 rounded transition hover:shadow-yellow-400 bg-[var(--movies-bg)]' onClick={() => navigate('points-ranking')}>
                                                <img src={Cup} className='w-full rounded' alt="Points Ranking" />
                                            </div>
                                            <div className='cursor-pointer flex flex-col items-center justify-center p-2 rounded transition hover:shadow-yellow-400 bg-[var(--movies-bg)] hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]' onClick={() => navigate('streak-ranking')}>
                                                <div className='items-center justify-center flex flex-col'>
                                                    <img src={Calcifer} className='w-[50%]' alt="Streak" />
                                                    <h5 className='text-center text-sm'>STREAK {userData?.streak} GÜN</h5>
                                                    <p className='text-center text-xs'>Hər gün Quiz'dən ən azı 1000 xal topla və serini davam etdir!</p>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 onClick={() => navigate('known-words')} className='p-3 rounded bg-[var(--movies-bg)] cursor-pointer transition hover:shadow-yellow-400 hover:shadow-[0_0px_20px_0px_yellow] hover:bg-[var(--movies-bg)]'>Bildiyiniz sözlər</h4>
                                    </div>

                                    <div className='w-full rounded-lg flex flex-col gap-2'>
                                        {
                                            userData?.blogs.length == 0 ? (
                                                <h4 className='font-["Kanit"]'>Bu hesabda heç bir blog paylaşılmayıb</h4>
                                            ) : (
                                                userData?.blogs?.slice(0, 3).map((blog) =>
                                                    <div key={blog.id} onClick={() => { navigate(`/blog/${blog.id}`) }} className="cursor-pointer p-3 rounded-4 bg-[var(--movies-bg)] transition-all duration-250 ease-in hover:shadow-gray-500 hover:shadow-lg">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="font-['Kanit'] text-sm md:text-xl">{blog.title}</h3>
                                                            <span onClick={() => addFavBlog(blog.id)} className="text-xl"><FaRegHeart /></span>
                                                        </div>
                                                        <div className="flex gap-2 justify-end">
                                                            <div className="flex flex-col items-end justify-center">
                                                                <span className="font-['PT_Serif'] text-sm md:text-md">{userData?.userName}</span>
                                                                <span className="font-['PT_Serif'] text-sm md:text-md">{moment.utc(blog?.createdAt.split('.')[0]).local().fromNow()}</span>
                                                            </div>
                                                            <div className='relative flex items-center justify-center w-[65px] h-[65px]'>
                                                                <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatarData?.imgName}`} alt="profile" />
                                                                {
                                                                    userData?.userFrames &&
                                                                    userData?.userFrames.map((frame) => {
                                                                        if (frame.isCurrent) {
                                                                            let userFrame = allFrame?.find((value) => value.id == frame.frameId);
                                                                            return (
                                                                                <div
                                                                                    key={frame.frameId}
                                                                                    className="absolute w-full h-full bg-cover bg-center z-10"
                                                                                    style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}
                                                                                ></div>
                                                                            );
                                                                        }
                                                                        return null;
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>)
                                            )
                                        }
                                    </div>
                                </div>
                            </Container>
                        </div>

                        {/* material ui modal */}
                        <div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{ ...style }} className="max-w-2xl mx-auto">
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        <strong>Edit Profile</strong>
                                    </Typography>
                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                        <div>
                                            <Formik
                                                initialValues={{ id: userData?.id, email: userData?.email, userName: userData?.userName, firstName: userData?.firstName, lastName: userData?.lastName, about: userData?.about, acceptMail: false }}
                                                validationSchema={validationSchema}
                                                onSubmit={async (values) => {
                                                    const editPostFormData = new FormData()
                                                    editPostFormData.append("Id", values.id)
                                                    editPostFormData.append("Email", values.email)
                                                    editPostFormData.append("UserName", values.userName)
                                                    editPostFormData.append("FirstName", values.firstName)
                                                    editPostFormData.append("LastName", values.lastName)
                                                    editPostFormData.append("About", values.about)
                                                    editPostFormData.append("AcceptMail", values.acceptMail)
                                                    try {
                                                        const response = await userUpdateProfile(editPostFormData);
                                                        userRefetch()
                                                        console.log(response);
                                                        if (response.data) {
                                                            alert('Profil məlumatlarınız edit olundu');
                                                            setOpen(false)
                                                        }
                                                        if (response.error) {
                                                            alert("❌ " + response.error.data)
                                                        }
                                                    } catch (error) {
                                                        if (error.response) {
                                                            const { status, data, statusText } = error.response;
                                                            console.error("Error Status Code:", status);
                                                            console.error("Error Message:", data);
                                                            console.error("Error Status Text:", statusText);

                                                            if (status === 400) {
                                                                alert("❌ Bad request, check your input.");
                                                            } else if (status === 404) {
                                                                alert("❌ Endpoint not found.");
                                                            } else if (status === 500) {
                                                                alert("❌ Server error, please try again later.");
                                                            }
                                                        } else {
                                                            console.error("Unknown error:", error);
                                                        }
                                                    }
                                                }}
                                            >
                                                {({ isSubmitting }) => (
                                                    <Form className="flex flex-col">
                                                        <label htmlFor="userName" className='mt-1'>Username:</label>
                                                        <Field type="text" name="userName" id='userName' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none mb-1' placeholder='Edit username' />
                                                        <ErrorMessage name="userName" component="div" />

                                                        <label htmlFor="firstName" className='mt-1'>First Name:</label>
                                                        <Field type="text" name="firstName" id='firstName' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none mb-1' placeholder='Edit first name' />
                                                        <ErrorMessage name="firstName" component="div" />

                                                        <label htmlFor="lastName" className='mt-1'>Last Name:</label>
                                                        <Field type="text" name="lastName" id='lastName' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none mb-1' placeholder='Edit last name' />
                                                        <ErrorMessage name="lastName" component="div" />

                                                        <label htmlFor="about" className='mt-1'>About:</label>
                                                        <Field type="text" name="about" id='about' className='border-2 border-blue-400 rounded py-1 px-2 focus:outline-none mb-1' placeholder='Edit about' />
                                                        <ErrorMessage name="about" component="div" />

                                                        <div className='flex items-center mt-4 text-lg checkbox-wrapper-19'>
                                                            <Field type="checkbox" name="acceptMail" id='cbtest-19' />
                                                            <label htmlFor="cbtest-19" className='check-box' style={{ borderColor: 'gray' }}></label>
                                                            <label htmlFor="cbtest-19" className='cursor-pointer font-["PT_Serif"] ml-2'> Bildiriş maillərini qəbul edirsiz? </label>
                                                        </div>

                                                        <button type="submit" disabled={isSubmitting} className="mt-3 text-white rounded max-w-[150px] bg-gradient-to-r from-blue-800 to-blue-300 mx-auto px-3 py-1">
                                                            Submit
                                                        </button>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </Typography>
                                </Box>
                            </Modal>
                        </div>
                    </>

                )
            }
        </>
    )
}