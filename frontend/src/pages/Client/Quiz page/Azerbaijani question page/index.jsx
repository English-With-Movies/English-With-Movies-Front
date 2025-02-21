import React, { useContext } from 'react';
import { useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet'
import { HiSpeakerWave } from 'react-icons/hi2';
import { FaPlus } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { quizDataContext } from '../../../../context/QuizDataContext';
import { useNavigate } from 'react-router';
import { useAddPointToUserMutation, useGetByIdUserQuery } from '../../../../redux/rtk query/Slices/userSlice';
import { userInfoContext } from '../../../../context/UserInfo';
import { useGetKnownWordListByIdQuery, usePostWordToKnownWordListMutation } from '../../../../redux/rtk query/Slices/knownWordListSlice';

export default function AzerbaijanQuestionsPage() {
    let { quizDataArray } = useContext(quizDataContext)
    let [quizWords, setQuizWords] = useState([...quizDataArray])
    let navigate = useNavigate()
    let [addPointToUser] = useAddPointToUserMutation()
    let { userInfo } = useContext(userInfoContext)
    let [postWordToKnownWordList] = usePostWordToKnownWordListMutation()
    let { data: userData } = useGetByIdUserQuery(userInfo?.userId)
    let { data: knowmData, refech } = useGetKnownWordListByIdQuery(userData?.knownWordListId)
    let [point, setPoint] = useState(150)
    let [totalPoint, setTotalPoint] = useState(0)
    let [correctQuestion, setCorrectQuestion] = useState()
    let intervalRef = useRef()
    let nextButtonRef = useRef()
    let sentenceRef = useRef()
    const optionRefs = useRef([]);
    let finishedRef = useRef()
    let startedRef = useRef()

    let [question, setQuestion] = useState(getRandomQuestion())
    let [options, setOptions] = useState([]);
    let [selectedOption, setSelectedOption] = useState(null);

    const disableButtons = (boolean) => {
        optionRefs.current.forEach((btn) => {
            if (btn) {
                btn.disabled = boolean;
            }
        });
    };

    // random question
    function getRandomQuestion() {
        if (quizWords.length > 0) {
            return quizWords[Math.floor(Math.random() * quizWords.length)];
        } else {
            return null;
        }
    }

    // options
    useEffect(() => {
        let newOptions = [question.word.wordText];
        while (newOptions.length < 4) {
            let randomTranslation = quizDataArray[Math.floor(Math.random() * quizDataArray.length)].word.wordText;
            if (!newOptions.includes(randomTranslation)) {
                newOptions.push(randomTranslation);
            }
        }
        setOptions(newOptions.sort(() => Math.random() - 0.5));
    }, [question]);

    const checkAnswer = async (option) => {
        disableButtons(true)
        setSelectedOption(option)
        nextButtonRef.current.classList.remove("hidden")
        sentenceRef.current.classList.remove("hidden")
        if (option === question.word.wordText) {
            setCorrectQuestion(prev => prev + 1)
            setTotalPoint(prevTotal => prevTotal + point)
            clearInterval(intervalRef.current);
            await postWordToKnownWordList({ knownWordListId: userData?.knownWordListId, wordId: question.wordId })
            await addPointToUser({ userId: userInfo.userId, amount: point });
        } else {
            clearInterval(intervalRef.current)
        }
        setQuizWords(prev => prev.filter(q => q.word.meaning !== question.word.meaning));

    }

    const changeQuestion = () => {
        disableButtons(false)
        setQuizWords((prevQuestions) => prevQuestions.filter((value) => value.word.meaning !== question.word.meaning))
        console.log(quizWords);
        setSelectedOption(null)
        const newQuestion = getRandomQuestion();
        if (quizWords.length > 0) {
            setQuestion(newQuestion);
            setPoint(150);
            nextButtonRef.current.classList.add("hidden");
            sentenceRef.current.classList.add("hidden");
        } else {
            startedRef.current.classList.add("hidden")
            finishedRef.current.classList.remove("hidden")
        }
    }

    const addPoint = async () => {
        await addPointToUser({ userId: userInfo.userId, amount: totalPoint });
        navigate("/")
    }

    // point function
    useEffect(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setPoint((prevPoint) => {
                if (prevPoint > 100) {
                    return prevPoint - 1;
                } else {
                    clearInterval(intervalRef.current);
                    secondStage();
                    return prevPoint;
                }
            });
        }, 20);
        return () => clearInterval(intervalRef.current);
    }, [question]);
    function secondStage() {
        intervalRef.current = setInterval(() => {
            setPoint((prevPoint) => {
                if (prevPoint > 50) {
                    return prevPoint - 1;
                } else {
                    clearInterval(intervalRef.current);
                    thirdStage();
                    return prevPoint;
                }
            });
        }, 80);
    }
    function thirdStage() {
        intervalRef.current = setInterval(() => {
            setPoint((prevPoint) => {
                if (prevPoint > 5) {
                    return prevPoint - 1;
                } else {
                    clearInterval(intervalRef.current);
                    return prevPoint;
                }
            });
        }, 100);
    }
    // page refresh warning 
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
            <Helmet>
                <title>Azərbaycanca Suallar</title>
            </Helmet>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] pt-[103px]'>
                <div ref={startedRef} className='max-w-[500px] py-5 mx-auto my-0 flex gap-3 flex-col justify-center items-center relative'>
                    <h1 className='font-["Kanit"] bg-red-300 px-4 py-2 rounded-5'>{point}</h1>
                    <div className='bg-purple-600 w-full flex justify-center items-center flex-col relative p-2 py-5 rounded-4'>
                        <h2>{question.word.meaning}</h2>
                        <div className='absolute top-2 left-2 text-3xl cursor-pointer'><FaPlus /></div>
                        <div className='absolute top-2 right-2 text-3xl cursor-pointer'><HiSpeakerWave /></div>
                        <div className='absolute bottom-2 left-2 hidden' ref={sentenceRef}>Company advertises new product on TV.</div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        {
                            options.map((option, index) => (
                                <button onClick={() => {
                                    checkAnswer(option)
                                }}
                                    key={index} ref={(el) => (optionRefs.current[index] = el)}
                                    className={`rounded-5 py-1 text-center font-bold text-2xl font-["PT_Series"] cursor-pointer 
                                        ${selectedOption ? option === question.word.wordText ? "bg-lime-500" : "bg-red-500" : "bg-gray-500"}`}>
                                    {option}
                                </button>
                            ))
                        }
                    </div>
                    <div>Sizin ümumi xalınız: {totalPoint}</div>
                    <div>Qalan sual sayı: <strong>{quizWords.length}</strong></div>
                    <div className='absolute top-[55%] right-[-15%] text-6xl cursor-pointer hidden' onClick={() => changeQuestion()} ref={nextButtonRef}>
                        <FaAnglesRight />
                    </div>
                </div>
                <div className='max-w-[500px] py-5 mx-auto my-0 flex gap-3 flex-col justify-center items-center hidden relative' ref={finishedRef}>
                    <h1 className='font-["Kanit"]'>Test bitdi!</h1>
                    <button onClick={() => addPoint()} className='px-3 py-1 bg-blue-500 font-["Kanit"] rounded'>Sonlandır</button>
                    <p className='font-["Kanit"] text-lg'>Testi sonlandırmaq üçün düyməyə basın</p>
                    <div className='h-[180px]'>
                        <DotLottieReact
                            src="https://lottie.host/2c083beb-aeee-414f-8f7a-63a833a08609/6fozHSRYsB.lottie"
                            loop
                            autoplay
                        />
                    </div>
                    <div className='font-["Kanit"] text-lg'>Düzgün sual sayınız: {correctQuestion}</div>
                    <div className='font-["Kanit"] text-lg'>Topladığınız xal: {totalPoint}</div>
                    <div className='font-["Kanit"] text-sm'>Testi sonlandırsaz topladığınız xal sizin ümumi xalınızın üzərinə gələcək</div>
                </div>
            </div>

        </>
    )
}