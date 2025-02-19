import React, { useContext } from 'react';
import QuizFirstPage from '../../../components/Client/Quiz components/QuizFirstPage';
import { Helmet } from 'react-helmet';
import { quizDataContext } from '../../../context/QuizDataContext';

export default function QuizPage() {
    let { quizDataArray } = useContext(quizDataContext)
    console.log(quizDataArray);
    
    return (
        <>
            <Helmet>
                <title>Test</title>
            </Helmet>
            <QuizFirstPage />
        </>
    )
}