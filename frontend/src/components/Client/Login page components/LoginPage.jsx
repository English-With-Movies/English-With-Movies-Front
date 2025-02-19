import React, { useContext, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import { FaRegEye } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import { usePostLoginMutation } from '../../../redux/rtk query/Slices/registerSlice';

let validationSchema = yup.object().shape({
    email: yup.string().required("Email or username required"),
    password: yup.string().required("Password required")
});

export default function LoginFirstPart({ setPage }) {
    let navigate = useNavigate()
    let passwordRef = useRef()
    let [loginError, setLoginError] = useState("")
    let [postLogin] = usePostLoginMutation()

    const typeChange = () => {
        if (passwordRef.current.type !== "text") {
            passwordRef.current.type = "text"
        } else {
            passwordRef.current.type = "password"
        }
    }

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] pt-[103px]'>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Login</h1>
                        {/* formik */}
                        <Formik
                            // remember me
                            initialValues={{ email: '', password: '', rememberMe: false }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                let formData = new FormData()
                                formData.append("EmailOrUserName", values.email);
                                formData.append("Password", values.password);
                                formData.append("RememberMe", values.rememberMe);     
                                try {
                                    const response = await postLogin(formData);
                                    if (response.data) {
                                        localStorage.setItem("token", response.data.token);
                                        localStorage.setItem("expiration", response.data.expiration);
                                        navigate('/')
                                    }
                                    if (response.error) {
                                        setLoginError("❌ " + response.error.data)
                                    }
                                } catch (error) {
                                    console.error("Login xətası:", error);
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <label htmlFor="email" className='mt-4 text-xl'>E-mail or UserName: </label>
                                    <Field type="text" name="email"
                                        placeholder='Enter your email or username'
                                        className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                    <ErrorMessage name="email" component="div" />

                                    <label htmlFor="password" className='mt-4 text-xl'>Password: </label>
                                    <div className='relative flex'>
                                        <Field type="password" name="password"
                                            placeholder='Enter your password'
                                            className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] w-full p-2 border-2 border-[#06b6d4] rounded mt-1" innerRef={passwordRef} />
                                        <span
                                            onClick={() => typeChange()}
                                            className='absolute right-[20px] top-[37%] text-xl cursor-pointer'><FaRegEye /></span>
                                    </div>
                                    <ErrorMessage name="password" component="div" />
                                    <div className='flex items-center mt-4 text-lg checkbox-wrapper-19'>
                                        <Field type="checkbox" name="rememberMe" id='cbtest-19'
                                            className=" p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                        <label htmlFor="cbtest-19" className='check-box'></label>
                                        <label htmlFor="cbtest-19" className='cursor-pointer font-["PT_Serif"] ml-2'> Xatırla məni</label>
                                    </div>
                                    <div className='text-red-500 font-semibold mt-1'>{loginError}</div>
                                    <div className='flex items-center justify-center'>
                                        <button type="submit" disabled={isSubmitting}
                                            className="max-w-[200px] text-xl font-semibold
                                    text-[var(--text-color)] p-2 w-full mt-4
                                    hover:text-white hover:bg-[#06b6d4] rounded-3xl   
                                    transition-all ease-in duration-200">
                                            Submit
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
                        {/* forget password */}
                        <div className='text-center text-lg'>
                            <span className='cursor-pointer hover:text-[#06b6d4] transition-all ease-in duration-200' onClick={() => setPage("forgot-password")}>Forgot Password?</span>
                        </div>
                        {/* sign up */}
                        <div className='text-center text-lg'>
                            Don't have an account?
                            <span onClick={() => navigate("/register")}
                                className='cursor-pointer text-[#06b6d4]'> Sign up!</span>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );

}