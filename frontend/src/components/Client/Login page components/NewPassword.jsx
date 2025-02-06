import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';

let validationSchema = yup.object().shape({
    password: yup.string().required("Please, enter your password.").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "One Uppercase, One Lowercase, One Number and One Special Case Character"
    ).min(8, "Password is too short - should be 8 chars minimum."),
    confirmPassword: yup.string().required("Please, enter your password again.")
});

export default function NewPassword({ setPage }) {
    let navigate = useNavigate()

    return (
        <>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)]'>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Login</h1>
                        {/* formik */}
                        <Formik
                            initialValues={{ password: '', confirmPassword: '' }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, {setSubmitting}) => {
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
                                    <label htmlFor="password" className='mt-4 text-xl'>New Password: </label>
                                    <Field type="password" name="password" id='password'
                                        placeholder='Enter your new password'
                                        className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                    <ErrorMessage name="password" component="div" />

                                    <label htmlFor="confirmPassword" className='mt-4 text-xl'>New Password Again: </label>
                                    <Field type="password" name="confirmPassword"
                                        placeholder='Enter your new password again'
                                        className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
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