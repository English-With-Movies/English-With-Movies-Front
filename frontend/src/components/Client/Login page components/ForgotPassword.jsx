import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet';

let validationSchema = yup.object().shape({
    email: yup.string().email().required(),
});

export default function ForgotPassword({ setPage }) {
    return (
        <>
            <Helmet>
                <title>Forgot Password</title>
            </Helmet>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] pt-[103px]'>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Login</h1>
                        <h4 className='text-center'>Şifrənizi unutmusuz?</h4>
                        <p className='text-center text-lg'>E-mail hesabınızı daxil edin və biz sizə hesabınıza qayıtmaq üçün 6 simvollu kod göndərəcəyik.</p>
                        {/* formik */}
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);
                                // evvel maili yoxluyuruq bele mail yoxdusa alert verir setSubmitting false olur varsa setPage deyisir ve maile reqem gedir
                                setPage('confirm-password')
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <label htmlFor="email" className='mt-2 text-xl'>E-mail: </label>
                                    <Field type="email" name="email"
                                        placeholder='Enter your email'
                                        className="focus:outline-none 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                    <ErrorMessage name="email" component="div" />

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
    )
}