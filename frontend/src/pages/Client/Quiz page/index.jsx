import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import QuizFirstPage from '../../../components/Client/Quiz components/QuizFirstPage';
import EnglishQuestions from '../../../components/Client/Quiz components/EnglishQuestions';
import AzerbaijanQuestions from '../../../components/Client/Quiz components/AzerbaijanQuestions';
import { Helmet } from 'react-helmet';

export default function QuizPage() {
    let [quizPage, setQuizPage] = useState(localStorage.getItem('quizPage') || 'first-page')

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (quizPage !== 'first-page') {
                const message = "Səhifəni yeniləyirsiniz, dəyişikliklər itə bilər!";
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // Səhifə dəyişiklikləri zamanı `localStorage`-da saxlayırıq
        localStorage.setItem('quizPage', quizPage);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [quizPage]);

    const handlePageChange = (newPage) => {
        if (newPage === 'english-question' || newPage === 'azerbaijan-question') {
            // English və Azerbaijan səhifələrinə keçdikdə `beforeunload`-u işə salırıq
            setQuizPage(newPage);
        } else {
            // First page-ə qayıtdıqda isə yenilənmə olmur
            setQuizPage(newPage);
        }
    };

    return (
        <>
            <Helmet>
                <title>Test</title>
            </Helmet>
            {quizPage === 'first-page' && <QuizFirstPage setQuizPage={handlePageChange} />}
            {quizPage === 'english-question' && <EnglishQuestions setQuizPage={handlePageChange}/>}
            {quizPage === 'azerbaijan-question' && <AzerbaijanQuestions setQuizPage={handlePageChange}/>}
        </>
    )
}