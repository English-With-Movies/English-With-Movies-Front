import React, { useContext } from 'react';
import { useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet'
import { HiSpeakerWave } from 'react-icons/hi2';
import { FaPlus } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { quizDataContext } from '../../../../context/QuizDataContext';
import { useAddPointToUserMutation, useGetByIdUserQuery } from '../../../../redux/rtk query/Slices/userSlice';
import { userInfoContext } from '../../../../context/UserInfo';
import { useNavigate } from 'react-router';
import { useGetKnownWordListByIdQuery, usePostWordToKnownWordListMutation } from '../../../../redux/rtk query/Slices/knownWordListSlice';
import { useGenerateSentencesMutation, useGenerateSpeechMutation } from '../../../../redux/rtk query/Slices/aiSlice';

export default function EnglishQuestionsPage() {
    let { quizDataArray } = useContext(quizDataContext)
    let [quizWords, setQuizWords] = useState([...quizDataArray])
    let navigate = useNavigate()
    let [addPointToUser] = useAddPointToUserMutation()
    let { userInfo } = useContext(userInfoContext)
    let [postWordToKnownWordList] = usePostWordToKnownWordListMutation()
    let { data: userData } = useGetByIdUserQuery(userInfo?.userId)
    let [point, setPoint] = useState(150)
    let [totalPoint, setTotalPoint] = useState(0)
    let [correctQuestion, setCorrectQuestion] = useState(0)
    let intervalRef = useRef()
    let nextButtonRef = useRef()
    let sentenceRef = useRef()
    const optionRefs = useRef([]);
    let finishedRef = useRef()
    let startedRef = useRef()

    let [question, setQuestion] = useState(getRandomQuestion())
    let [options, setOptions] = useState([]);
    let [selectedOption, setSelectedOption] = useState(null);
    let [generateSentences] = useGenerateSentencesMutation()
    let [generateSpeech] = useGenerateSpeechMutation()
    let [createdSentenceWithWordText, setCreatedSentenceWithWordText] = useState()

    // audio function
    function playBase64Audio(base64String) {
        const byteCharacters = atob(base64String);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
    }

    const showSentence = async (word) => {
        const response = await generateSentences(word)
        setCreatedSentenceWithWordText(response.data)
    }

    const speakingText = async (text) => {
        const response = await generateSpeech(text)        
        playBase64Audio(response.data.audioBase64)
    }

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
        let newOptions = [question.word.meaning];
        while (newOptions.length < 4) {
            let randomTranslation = quizDataArray[Math.floor(Math.random() * quizDataArray.length)].word.meaning;
            if (!newOptions.includes(randomTranslation)) {
                newOptions.push(randomTranslation);
            }
        }
        setOptions(newOptions.sort(() => Math.random() - 0.5));
    }, [question]);

    const checkAnswer = async (option) => {
        disableButtons(true)
        setSelectedOption(option)
        showSentence(question.word.wordText)
        nextButtonRef.current.classList.remove("hidden")
        sentenceRef.current.classList.remove("hidden")
        if (option === question.word.meaning) {
            setCorrectQuestion(prev => prev + 1)
            setTotalPoint(prevTotal => prevTotal + point)
            clearInterval(intervalRef.current);
            await postWordToKnownWordList({ knownWordListId: userData?.knownWordListId, wordId: question.wordId })
            await addPointToUser({ userId: userInfo?.userId, amount: point });
        } else {
            clearInterval(intervalRef.current);
        }
        setQuizWords(prev => prev.filter(q => q.word.wordText !== question.word.wordText));
    }

    const changeQuestion = () => {
        disableButtons(false)
        setCreatedSentenceWithWordText({})
        setQuizWords((prevQuestions) => prevQuestions.filter((value) => value.word.wordText !== question.word.wordText))
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
                if (prevPoint > 20) {
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
                <title>İngiliscə suallar</title>
            </Helmet>
            <div className='bg-[var(--bg-color)] text-white pt-[103px]'>
                <div ref={startedRef} className='max-w-[500px] py-5 mx-auto my-0 flex gap-3 flex-col justify-center items-center relative'>
                    <h1 className='font-["Kanit"] bg-[#5693db] px-4 py-2 rounded-5'>{point}</h1>
                    <div className='bg-[#18406e] w-full flex justify-center items-center flex-col relative p-2 py-5 rounded-4'>
                        <h2>{question.word.wordText}</h2>
                        <div className='hover:text-gray-400 absolute top-2 left-2 text-3xl cursor-pointer'><FaPlus /></div>
                        <div onClick={() => speakingText(question.word.wordText)} className='absolute top-2 right-2 text-3xl cursor- hover:text-blue-400'><HiSpeakerWave /></div>
                        <div className='absolute bottom-2 left-2 hidden' ref={sentenceRef}>
                            <div className='-mb-1'>{createdSentenceWithWordText?.english}</div>
                            <div>{createdSentenceWithWordText?.azerbaijani}</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        {
                            options.map((option, index) => (
                                <button onClick={() => {
                                    checkAnswer(option);
                                }}
                                    key={index} ref={(el) => (optionRefs.current[index] = el)}
                                    className={`rounded-5 py-1 text-center font-bold text-2xl font-["PT_Series"] cursor-pointer 
                                        ${selectedOption ? option === question.word.meaning ? "bg-lime-500" : "bg-red-500" : "bg-gray-500"}`}>
                                    {option}
                                </button>
                            ))
                        }
                    </div>
                    <div>Sizin ümumi xalınız: {totalPoint}</div>
                    <div>Qalan sual sayı: <strong>{quizWords.length}</strong></div>
                    <div className='absolute top-[8%] right-[0%] md:top-[50%] md:right-[-15%] text-6xl cursor-pointer hidden' onClick={() => changeQuestion()} ref={nextButtonRef}>
                        <FaAnglesRight />
                    </div>
                </div>
                <div className='max-w-[500px] py-5 mx-auto my-0 flex gap-3 flex-col justify-center items-center hidden relative' ref={finishedRef}>
                    <h1 className='font-["Kanit"]'>Test bitdi!</h1>
                    <button onClick={() => navigate("/")} className='px-3 py-1 bg-blue-500 font-["Kanit"] rounded'>Sonlandır</button>
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
                    <div className='font-["Kanit"] text-sm'>Testi sonlandırsanız ana səhifəyə qayıdacaqsınız</div>
                </div>
            </div >

        </>
    )
}