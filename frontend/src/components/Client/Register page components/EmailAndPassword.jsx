import React, { useContext, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import { registerContext } from '../../../context/RegisterContext';
import { FaRegEye } from 'react-icons/fa';

let validationSchema = yup.object().shape({
    email: yup.string().email().required("Please, enter your email."),
    password: yup.string().required("Please, enter your password.")
        .trim()
        .matches(/^\S*$/, "Boşluqlar olmamalıdır")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            "One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .min(8, "Password is too short - should be 8 chars minimum."),
    confirmPassword: yup.string().required("Please, enter your password again.")
});

export default function EmailAndPassword({ setPage }) {
    let navigate = useNavigate()
    let { emailPassword, setEmailPassword } = useContext(registerContext)
    let passwordRef = useRef()
    let confirmRef = useRef()

    const typeChange = () => {
        if (passwordRef.current.type !== "text") {
            passwordRef.current.type = "text"
        } else {
            passwordRef.current.type = "password"
        }
    }

    const typeChangeConfirm = () => {
        if (confirmRef.current.type !== "text") {
            confirmRef.current.type = "text"
        } else {
            confirmRef.current.type = "password"
        }
    }

    return (
        <>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] mt-[103px]'>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Register</h1>
                        {/* form */}
                        <Formik
                            initialValues={{ email: '', password: '', confirmPassword: '' }}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                if (values.password == values.confirmPassword) {
                                    setEmailPassword(values);
                                    setPage("about-user")
                                } else {
                                    alert("Zəhmət olmasa passwordu düzgün daxil edin")
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form >
                                    <label htmlFor="email" className='mt-4 text-xl'>E-mail: </label>
                                    <Field type="email" name="email"
                                        placeholder='Enter your email'
                                        className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                    <ErrorMessage name="email" component="div" />

                                    <label htmlFor="password" className='mt-4 text-xl'>Password: </label>
                                    <div className="relative flex">
                                        <Field type="password" name="password"
                                            placeholder='Enter your password'
                                            className="focus:outline-none 
                                            focus:shadow-[0_0px_200px_0px_#06b6d4] w-full p-2 border-2 border-[#06b6d4] rounded mt-1" innerRef={passwordRef} />
                                        <span
                                            onClick={() => typeChange()}
                                            className='absolute right-[20px] top-[37%] text-xl cursor-pointer'><FaRegEye /></span>
                                    </div>
                                    <ErrorMessage name="password" component="div" />

                                    <label htmlFor="confirmPassword" className='mt-4 text-xl'>Confirm Password: </label>
                                    <div className="relative flex">
                                        <Field type="password" name="confirmPassword"
                                            placeholder='Enter your password again'
                                            className="focus:outline-none 
                                            focus:shadow-[0_0px_200px_0px_#06b6d4] w-full p-2 border-2 border-[#06b6d4] rounded mt-1" innerRef={confirmRef} />
                                        <span
                                            onClick={() => typeChangeConfirm()}
                                            className='absolute right-[20px] top-[37%] text-xl cursor-pointer'><FaRegEye /></span>
                                    </div>
                                    <ErrorMessage name="confirmPassword" component="div" />

                                    <div className='flex items-center justify-center'>
                                        <button type="submit" disabled={isSubmitting}
                                            className="max-w-[200px] text-xl font-semibold
                                    text-[var(--text-color)] p-2 w-full mt-4
                                    hover:text-white hover:bg-[#06b6d4] rounded-3xl   
                                    transition-all ease-in duration-200">
                                            Next
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
                </Container>
            </div>
        </>
    );
}