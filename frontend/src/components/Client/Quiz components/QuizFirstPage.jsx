import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function QuizFirstPage({ setQuizPage }) {
    // asagida nece sual qalib gostersin buttonlarin rengi deyissin
    // hansisa pageden quize kecende o secilmis sozler ki var onlari contexte atacaq, quiz ordan goturecek ve useStateye menimsedecek

    return (
        <>
            <div className="pt-[140px] bg-[var(--bg-color)] text-[var(--text-color)]">
                <div className='max-w-[800px] mx-auto my-0 px-3 py-5 text-center'>
                    <h2 className='font-["Kanit"]'>Quiz səhifəsinə xoş gəlmisiniz!</h2>
                    <p className='font-["Kanit"]'>İstədiyiniz seçimi edərək sualları cavablandırıb xallar toplamağa başlayın.</p>
                    <div className='max-w-[600px]  mx-auto my-0  flex items-center justify-center'>
                        <DotLottieReact
                            src="https://lottie.host/6591a48d-04b7-430b-b13e-e052c56e60f5/2ayOvHA2ic.lottie"
                            loop
                            autoplay
                        />
                    </div>
                    <div className='grid grid-cols-2 max-w-[600px] mx-auto my-0'>
                        <div onClick={setQuizPage('english-question')} className='rounded border-2 border-[#06b6d4] cursor-pointer py-2 transition-all duration-300 ease-in hover:bg-[#06b6d4]'>
                            auauauau
                        </div>
                        <div onClick={setQuizPage('azerbaijan-question')} className='rounded border-2 border-[#06b6d4] cursor-pointer py-2 transition-all duration-300 ease-in hover:bg-[#06b6d4]'>
                            aiaiaiia
                        </div>
                    </div>
                    <p className='mt-2 font-["Kanit"] text-red-400'>Testin yarısından çıxmaq istəsəz topladığınız xallar silinəcək 😔</p>
                </div>
            </div >
        </>
    )
}