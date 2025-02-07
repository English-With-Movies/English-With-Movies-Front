import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import { FaRegEye } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

let validationSchema = yup.object().shape({
    password: yup.string().required("Please, enter your password.").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "One Uppercase, One Lowercase, One Number and One Special Case Character"
    ).min(8, "Password is too short - should be 8 chars minimum."),
    confirmPassword: yup.string().required("Please, enter your password again.")
});

export default function NewPassword({ setPage }) {
    let navigate = useNavigate()
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
            <Helmet>
                <title>New Password</title>
            </Helmet>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)]'>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Login</h1>
                        {/* formik */}
                        <Formik
                            initialValues={{ password: '', confirmPassword: '' }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                if (values.password == values.confirmPassword) {
                                    console.log("passwordunuz deyisdirildi");
                                } else {
                                    alert("Şifrənizi düzgün daxil edin")
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <label htmlFor="password" className='mt-4 text-xl'>Yeni Şifrə: </label>
                                    <div className='relative flex '>
                                        <Field type="password" name="password" id='password'
                                            placeholder='Enter your new password'
                                            className="focus:outline-none focus:shadow-[0_0px_200px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" innerRef={passwordRef} />
                                        <span
                                            onClick={() => typeChange()}
                                            className='absolute right-[20px] top-[37%] text-xl cursor-pointer'><FaRegEye /></span>
                                    </div>
                                    <ErrorMessage name="password" component="div" />

                                    <label htmlFor="confirmPassword" className='mt-4 text-xl'>Yeni Şifrə Təkrar: </label>
                                    <div className='relative flex '>
                                        <Field type="password" name="confirmPassword"
                                            placeholder='Enter your new password again'
                                            className="focus:outline-none focus:shadow-[0_0px_200px_0px_#06b6d4] w-full p-2 border-2 border-[#06b6d4] rounded mt-1" innerRef={confirmRef} />
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
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </Container>
            </div>
        </>
    );
}