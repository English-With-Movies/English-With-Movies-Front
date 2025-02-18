import React, { useContext, useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import QuizFirstPage from '../../../components/Client/Quiz components/QuizFirstPage';
import { Helmet } from 'react-helmet';
import { quizDataContext } from '../../../context/QuizDataContext';

export default function QuizPage() {
    let [quizPage, setQuizPage] = useState(localStorage.getItem('quizPage') || 'first-page')

    

    const handlePageChange = (newPage) => {
        if (newPage === 'english-question' || newPage === 'azerbaijan-question') {
            setQuizPage(newPage);
        } else {
            setQuizPage(newPage);
        }
    };

    let { quizDataArray, setQuizDataArray } = useContext(quizDataContext)
    console.log(quizDataArray);
    
    return (
        <>
            <Helmet>
                <title>Test</title>
            </Helmet>
            <QuizFirstPage />
            {/* {quizPage === 'first-page' && <QuizFirstPage setQuizPage={handlePageChange} />} */}
            {/* {quizPage === 'english-question' && <EnglishQuestions setQuizPage={handlePageChange}/>}
            {quizPage === 'azerbaijan-question' && <AzerbaijanQuestions setQuizPage={handlePageChange}/>} */}
        </>
    )
}