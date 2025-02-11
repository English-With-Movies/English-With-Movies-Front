import { useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet'
import { HiSpeakerWave } from 'react-icons/hi2';
import { FaPlus } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";

export default function QuizPage() {
    // asagida nece sual qalib gostersin buttonlarin rengi deyissin deaktiv olsun sehv olanda sad smaylik duz olanda happy smaylik ya da icon 
    // cavab secilende next, sentence, totalPoint --> hidden-visible
    let [point, setPoint] = useState(170)
    let intervalRef = useRef()
    let nextButtonRef = useRef()
    let sentenceRef = useRef()
    let optionButtonRef = useRef()

    const quizWords = [
        {
            word: "advertise",
            meaning: "reklam yapmak"
        },
        {
            word: "absolute",
            meaning: "mutlak, kesin"
        },
        {
            word: "abstain",
            meaning: "kaçınmak, çekinmek"
        },
        {
            word: "accurate",
            meaning: "doğru, kesin"
        },
        {
            word: "acquittal",
            meaning: "beraat"
        },
        {
            word: "ad",
            meaning: "ilan"
        }
    ]

    let [question, setQuestion] = useState(quizWords[Math.floor(Math.random() * quizWords.length)])
    let [options, setOptions] = useState([]);
    let [selectedOption, setSelectedOption] = useState(null);
    console.log(question);

    const checkAnswer = (option) => {
        setSelectedOption(option)
        nextButtonRef.current.classList.remove("hidden")
        sentenceRef.current.classList.remove("hidden")
        clearInterval(intervalRef.current);
    }
    const changeQuestion = () => {
        setSelectedOption(null)
        setQuestion(quizWords[Math.floor(Math.random() * quizWords.length)])
        setPoint(170)
        nextButtonRef.current.classList.add("hidden")
        sentenceRef.current.classList.add("hidden")
        // pointButton()
    }
    // options
    useEffect(() => {
        let newOptions = [question.meaning];
        while (newOptions.length < 4) {
            let randomTranslation = quizWords[Math.floor(Math.random() * quizWords.length)].meaning;
            if (!newOptions.includes(randomTranslation)) {
                newOptions.push(randomTranslation);
            }
        }
        setOptions(newOptions.sort(() => Math.random() - 0.5));
    }, [question]);

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
        }, 100);

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
        }, 500);
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
        }, 1000);
    }

    return (
        <>
            <Helmet>
                <title>Test</title>
            </Helmet>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] mt-[103px]'>
                <div className='max-w-[500px] py-5 mx-auto my-0 flex gap-3 flex-col justify-center items-center relative'>
                    <h1 className='font-["Kanit"] bg-red-300 px-4 py-2 rounded-5'>{point}</h1>
                    <div className='bg-purple-600 w-full flex justify-center items-center flex-col relative p-2 py-5 rounded-4'>
                        <h2>{question.word}</h2>
                        <div className='absolute top-2 left-2 text-3xl cursor-pointer'><FaPlus /></div>
                        <div className='absolute top-2 right-2 text-3xl cursor-pointer'><HiSpeakerWave /></div>
                        <div className='absolute bottom-2 left-2 hidden' ref={sentenceRef}>Company advertises new product on TV.</div>
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        {
                            options.map((option, index) => (
                                <div onClick={() => checkAnswer(option)} key={index} ref={optionButtonRef}
                                    className={`rounded-5 py-1 text-center font-bold text-2xl font-["PT_Series"] cursor-pointer 
                                    ${selectedOption ? option === question.meaning ? "bg-lime-500" : "bg-red-500" : "bg-gray-500"}`}>
                                    {option}
                                </div>
                            ))
                        }
                    </div>
                    <div className='absolute top-[55%] right-[-15%] text-6xl cursor-pointer hidden' onClick={() => changeQuestion()} ref={nextButtonRef}>
                        <FaAnglesRight />
                    </div>
                </div>
            </div>

        </>
    )
}