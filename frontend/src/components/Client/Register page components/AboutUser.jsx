import React, { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import { registerContext } from '../../../context/RegisterContext';

//  name surname username email password profilephoto 
let validationSchema = yup.object().shape({
    firstName: yup.string().required("Please, enter your first name.").max(20, "max 10 characters").min(3, "min 3 characters"),
    lastName: yup.string().required("Please, enter your last name.").max(20, "max 10 characters").min(3, "min 3 characters"),
    userName: yup.string().required("Please, enter your username.").max(20, "max 10 characters").min(3, "min 3 characters")
});

export default function AboutUser({ setPage }) {
    let navigate = useNavigate()
    let { emailPassword } = useContext(registerContext)

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
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] '>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Register</h1>
                        {/* form */}
                        <Formik
                            initialValues={{ firstName: '', lastName: '', userName: '', aboutUser: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                // setEmailPassword(values);
                                // setPage("about-user")
                                console.log({ ...emailPassword, ...values });
                                navigate("/")

                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form >
                                    <div className='grid grid-cols-2 gap-4'>
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
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label htmlFor="userName" className='mt-4 text-xl'> Username: </label>
                                            <Field type="text" name="userName"
                                                placeholder='Enter your username'
                                                className="focus:outline-none 
                                        focus:shadow-[0_0px_300px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                            <ErrorMessage name="userName" component="div" />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className='mt-4 text-xl'>Avatar: </label>
                                            <Field type="text" name="lastName"
                                                placeholder='Enter your email'
                                                className="focus:outline-none 
                                        focus:shadow-[0_0px_300px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                            <ErrorMessage name="lastName" component="div" />
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
                                        <Field type="checkbox" name="checkbox" id='checkbox'
                                            className="mr-2 p-2 border-2 border-[#06b6d4] rounded cursor-pointer" />
                                        <label htmlFor="checkbox" className='cursor-pointer'>Birbaşa Login etmək isteyirsiz mi? </label>
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
                </Container>
            </div>
        </>
    );
}