import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { useContext, useEffect } from "react";
import { userInfoContext } from "../../../context/UserInfo";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from 'formik';
// material ui
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { themeContext } from "../../../context/ThemeContext";
import { usePostFeedbackMutation } from "../../../redux/rtk query/Slices/feedbackSlice";

export default function FeedbackPage() {
    let navigate = useNavigate()
    let { darkMode } = useContext(themeContext)
    let { userInfo } = useContext(userInfoContext)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    const [category, setCategory] = React.useState('');
    let [postFeedback] = usePostFeedbackMutation()


    return (
        <>
            <Helmet>
                <title>Feedback</title>
            </Helmet>
            <div className="pt-[103px]">
                <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-2">
                    <Container>
                        <div className="bg-[var(--movies-bg)] rounded max-w-[900px] mx-auto">
                            <div className="mt-5 mb-4 py-5">
                                <p className="text-center text-3xl font-['Kanit']">GERİBİLDİRİM VƏ RƏYLƏR</p>
                                <div>
                                    <Formik
                                        initialValues={{ message: '', category: '' }}
                                        // validationSchema={validationSchema}
                                        onSubmit={async (values) => {
                                            const feedbackFormData = new FormData()
                                            feedbackFormData.append("UserId", userInfo?.userId)
                                            feedbackFormData.append("Message", values.message.trim())
                                            feedbackFormData.append("Category", values.category)
                                            console.log(...feedbackFormData);
                                            if (!userInfo?.userId) {
                                                navigate('/login')
                                                return;
                                            }
                                            try {
                                                const response = await postFeedback(feedbackFormData);
                                                if (response.data) {
                                                    alert('Rəyiniz göndərildi');
                                                    navigate('/')
                                                }
                                                if (response.error) {
                                                    if (response.error.status === 400) {
                                                        alert(response.error.data.errors?.Message+ '\n' +response.error.data.errors?.Category)
                                                        return;
                                                    }
                                                    alert("❌ Xəta baş verdi")
                                                }
                                            } catch (error) {
                                                if (error.response) {
                                                    const { status, data, statusText } = error.response;
                                                    console.error("Error Status Code:", status);
                                                    console.error("Error Message:", data);
                                                    console.error("Error Status Text:", statusText);

                                                    if (status === 400) {
                                                        alert("❌ Bad request, check your input.");
                                                    } else if (status === 404) {
                                                        alert("❌ Endpoint not found.");
                                                    } else if (status === 500) {
                                                        alert("❌ Server error, please try again later.");
                                                    }
                                                } else {
                                                    console.error("Unknown error:", error);
                                                }
                                            }
                                        }}
                                    >
                                        {({ isSubmitting, setFieldValue }) => (
                                            <Form className="flex flex-col text-white">
                                                <div>
                                                    <FormControl variant="standard" className='w-full'>
                                                        <InputLabel style={{ color: '#06b6d4' }} id="demo-simple-select-standard-label">Kateqoriya:</InputLabel>
                                                        <Select
                                                            name='category'
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={category}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                setFieldValue('category', value)
                                                                setCategory(value);
                                                            }}
                                                            label="Category"
                                                            sx={{
                                                                padding: '5px 10px',
                                                                color: 'var(--text-color)',
                                                                '& .MuiSelect-icon': { color: 'var(--text-color)' },
                                                            }}
                                                        >
                                                            <MenuItem disabled selected >Seçin</MenuItem>
                                                            {
                                                                ['Ümumi rəy', 'Xəta hesabatı', 'Xüsusiyyət sorğusu', 'İstifadəçi təcrübəsi', 'Performans', 'Məzmun keyfiyyəti', 'Təhlükəsizlik narahatlığı', 'Hesab problemləri', 'Bildirişlər', 'Ödəniş problemləri', 'Moderasiya icma təlimatları'].map((key, index) => (
                                                                    <MenuItem value={index + 1}>{key}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>

                                                <div>
                                                    <Field
                                                        as="textarea"
                                                        name="message"
                                                        placeholder="...əlavə fikirlərinizi yazın"
                                                        className={`mt-2 border-2 border-gray-500 w-full rounded p-2 text-black min-h-[300px] placeholder-gray-400 focus:border-blue-500 focus:outline-none text-lg 
                                                                ${darkMode ? 'text-white' : 'text-black'}`}
                                                        style={{ cursor: 'text', textAlign: 'left' }}
                                                    />
                                                </div>

                                                <button type="submit" disabled={isSubmitting} className="mt-3 text-white rounded max-w-[150px] bg-gradient-to-r from-blue-800 to-blue-300 mx-auto px-3 py-1">
                                                    Submit
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}