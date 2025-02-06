import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import { FaRegEye } from "react-icons/fa";

let validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

export default function LoginFirstPart({ setPage }) {
    let navigate = useNavigate()
    let passwordRef = useRef()

    const typeChange = () => {
        if (passwordRef.current.type !== "text") {
            passwordRef.current.type = "text"
        } else {
            passwordRef.current.type = "password"
        }
    }

    return (
        <>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)]'>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Login</h1>
                        {/* formik */}
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);

                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <label htmlFor="email" className='mt-4 text-xl'>E-mail: </label>
                                    <Field type="email" name="email"
                                        placeholder='Enter your email or username'
                                        className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                    <ErrorMessage name="email" component="div" />

                                    <label htmlFor="password" className='mt-4 text-xl'>Password: </label>
                                    <div className='relative flex '>
                                        <Field type="password" name="password"
                                            placeholder='Enter your password'
                                            className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] w-full p-2 border-2 border-[#06b6d4] rounded mt-1" innerRef={passwordRef} />
                                        <span
                                            onClick={() => typeChange()}
                                            className='absolute right-[20px] top-[37%] text-xl cursor-pointer'><FaRegEye /></span>
                                    </div>
                                    <ErrorMessage name="password" component="div" />

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