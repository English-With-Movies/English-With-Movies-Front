import React, { useContext, useEffect, useRef, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { quizDataContext } from '../../../context/QuizDataContext';
import { useNavigate } from 'react-router';

export default function QuizFirstPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    let { quizDataArray } = useContext(quizDataContext)
    let navigate = useNavigate()

    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        setIsDisabled(quizDataArray.length < 4);
    }, [quizDataArray]);

    const goToQuestions = (page) => {
        navigate(page)
    }

    return (
        <>
            <div className="pt-[140px] bg-[var(--bg-color)] text-[var(--text-color)]">
                <div className='max-w-[800px] mx-auto my-0 px-3 py-5 text-center'>
                    <h2 className='font-["Kanit"]'>Quiz səhifəsinə xoş gəlmisiniz!</h2>
                    <p className='font-["Kanit"]'>İstədiyiniz növ testi seçərək sualları cavablandırıb xallar toplamağa başlayın.</p>
                    <div className='max-w-[600px]  mx-auto my-0  flex items-center justify-center'>
                        <DotLottieReact
                            src="https://lottie.host/6591a48d-04b7-430b-b13e-e052c56e60f5/2ayOvHA2ic.lottie"
                            loop
                            autoplay
                        />
                    </div>
                    <div className='grid grid-cols-2 max-w-[600px] mx-auto my-0'>
                        <button onClick={() => goToQuestions('english-question')} disabled={isDisabled}
                            className={`rounded border-2 border-[#06b6d4] py-2 transition-all duration-300 ease-in hover:bg-[#06b6d4] ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            İngiliscə suallar
                        </button>
                        <button onClick={() => goToQuestions('azerbaijani-question')} disabled={isDisabled}
                            className={`rounded border-2 border-[#06b6d4] py-2 transition-all duration-300 ease-in hover:bg-[#06b6d4] ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                            Azərbaycanca suallar
                        </button>
                    </div>
                    <p className='mt-2 font-["Kanit"] text-lg mb-0'>Testin yarısından çıxsanız belə topladığınız xallar silinməyəcək</p>
                    <p>{quizDataArray.length < 4 ? 'Testə başlamaq üçün ən azı 4 sual olmalıdır' : ''}</p>
                </div>
            </div >
        </>
    )
}