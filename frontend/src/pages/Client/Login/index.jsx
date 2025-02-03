import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';

let validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
    // name: yup.string().required(),
    // age: yup.number().required().positive().integer(),
    // website: yup.string().url(),
    // createdOn: yup.date().default(function () {
    //     return new Date();
    // }),
});

export default function LoginPage() {
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
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);

                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <Field type="email" name="email"
                                        placeholder='Enter your email'
                                        className="w-full p-2 border-2 border-[#06b6d4] rounded mt-4" />
                                    <ErrorMessage name="email" component="div" />
                                    <Field type="password" name="password"
                                        placeholder='Enter your password'
                                        className="w-full p-2 border-2 border-[#06b6d4] rounded my-4" />
                                    <ErrorMessage name="password" component="div" />
                                    <button type="submit" disabled={isSubmitting}
                                        className="border-y-2 border-[#06b6d4] 
                                    text-[var(--text-color)] p-2 w-full 
                                    hover:text-white hover:bg-[#06b6d4]
                                    transition-all ease-in duration-200">
                                        Submit
                                    </button>
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
                            <span className='cursor-pointer hover:text-[#06b6d4] transition-all ease-in duration-200' onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
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