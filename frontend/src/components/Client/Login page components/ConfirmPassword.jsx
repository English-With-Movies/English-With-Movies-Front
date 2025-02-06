import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Container from 'react-bootstrap/Container';

export default function ConfirmPassword({ setPage }) {
    let variabledidene = "abc123"
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    return (
        <>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)]'>
                <Container>
                    <div className='py-5 max-w-[500px] my-0 mx-auto'>
                        {/* title */}
                        <h1 className='text-center text-[#06b6d4] font-["Dancing_Script"]'>Login</h1>
                        <h4 className='text-center'>Zəhmət olmasa mailinizə gələn 6 simvollu kodu daxil edin.</h4>
                        {/* formik */}
                        <Formik
                            initialValues={{ code: "" }}
                            onSubmit={async (values, {setSubmitting}) => {
                                if (values.code == variabledidene) {
                                    // kod bura yazilacaq
                                    console.log(values);
                                    setPage("new-password")
                                } else {
                                    alert("sehvsen")
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ isSubmitting, values }) => {
                                // input length
                                const isCodeValid = values.code.trim().replace(/\s+/g, '').length === 6;
                                setIsButtonDisabled(!isCodeValid);

                                return (
                                    <Form>
                                        <Field type="text" name="code" maxLength={6}
                                            className="focus:outline-none font-bold text-2xl 
                                        focus:shadow-[0_0px_200px_0px_#06b6d4] 
                                        w-full p-2 border-2 border-[#06b6d4] rounded mt-1" />
                                        <ErrorMessage name="code" component="div" />

                                        <div className='flex items-center justify-center'>
                                            <button type="submit" disabled={isButtonDisabled || isSubmitting}
                                                className="max-w-[200px] text-xl font-semibold
                                    text-[var(--text-color)] p-2 w-full mt-4
                                    hover:text-white hover:bg-[#06b6d4] rounded-3xl   
                                    transition-all ease-in duration-200"
                                                style={{ cursor: isButtonDisabled ? 'not-allowed' : "pointer" }}>
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                </Container>
            </div>
        </>
    )
}