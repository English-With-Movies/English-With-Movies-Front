import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';

//  name surname username email password profilephoto 
let validationSchema = yup.object().shape({
    email: yup.string().email().required("Please, enter your email."),
    password: yup.string().required("Please, enter your password.").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "One Uppercase, One Lowercase, One Number and One Special Case Character"
    ).min(8, "Password is too short - should be 8 chars minimum. ")

    // name: yup.string().required(),
    // age: yup.number().required().positive().integer(),
    // website: yup.string().url(),
    // createdOn: yup.date().default(function () {
    //     return new Date();
    // }),

});

export default function RegisterPage() {
    let navigate = useNavigate()
    return (
        <>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] '>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Register</h1>
                        {/* form */}
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form >
                                    <label htmlFor="email" className='mt-4 text'>E-mail: </label>
                                    <Field type="email" name="email"
                                        placeholder='Enter your email'
                                        className="focus:outline-none 
                                        focus:shadow-[0_0px_300px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded my-1" />
                                    <ErrorMessage name="email" component="div" />


                                    <Field type="password" name="password"
                                        placeholder='Enter your password'
                                        className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] w-full p-2 border-2 border-[#06b6d4] rounded mt-4" />
                                    <ErrorMessage name="password" component="div" />


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