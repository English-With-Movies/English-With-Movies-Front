import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet'
import { HiSpeakerWave } from 'react-icons/hi2';
import { FaPlus } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";
// import { Lottie } from 'react-lottie';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function QuizPage() {
    // asagida nece sual qalib gostersin buttonlarin rengi deyissin deaktiv olsun sehv olanda sad smaylik duz olanda happy smaylik ya da icon 
    // div'lere 2ci defe tiklamak olmasin
    // cavab secilende next, sentence, totalPoint --> hidden-visible

    let [point, setPoint] = useState(170)
    let [totalPoint, setTotalPoint] = useState(0)
    let intervalRef = useRef()
    let nextButtonRef = useRef()
    let sentenceRef = useRef()
    const optionRefs = useRef([]);
    let finishedRef = useRef()
    let startedRef = useRef()
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
    const [usedQuestions, setUsedQuestions] = useState([...quizWords]);

    let [question, setQuestion] = useState(getRandomQuestion())
    let [options, setOptions] = useState([]);
    let [selectedOption, setSelectedOption] = useState(null);
    const disableDiv = () => {
        optionRefs.current.forEach((div) => {
            div.classList.add("pointer-events-none", "opacity-90");
        });
    };
    // random question
    function getRandomQuestion() {
        // const unusedQuestions = quizWords.filter(q => !usedQuestions.includes(q.word));
        // console.log(unusedQuestions);
        // if (unusedQuestions.length > 0) {
        //     return unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
        // } else {
        //     return null;
        // }
        if (usedQuestions.length > 0) {
            return usedQuestions[Math.floor(Math.random() * usedQuestions.length)];
        } else {
            return null;
        }
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

    // disableDiv()
    const checkAnswer = (option) => {
        setSelectedOption(option)
        disableDiv()
        nextButtonRef.current.classList.remove("hidden")
        sentenceRef.current.classList.remove("hidden")
        if (option === question.meaning) {
            setTotalPoint(prevTotal => prevTotal + point)
        }
        setUsedQuestions(prev => prev.filter(q => q.word !== question.word));
        clearInterval(intervalRef.current);
    }
    console.log(usedQuestions);

    // console.log(totalPoint);
    const changeQuestion = () => {
        setUsedQuestions((prevQuestions) => prevQuestions.filter((value) => value.word !== question.word))
        console.log(usedQuestions);
        
        setSelectedOption(null)
        const newQuestion = getRandomQuestion();
        if (usedQuestions.length > 0) {
            setQuestion(newQuestion);
            setPoint(170);
            nextButtonRef.current.classList.add("hidden");
            sentenceRef.current.classList.add("hidden");
        } else {
            // console.log("Bütün suallar bitdi!");
            startedRef.current.classList.add("hidden")
            finishedRef.current.classList.remove("hidden")
        }
    }
    // chooise answer disabled div
    // useEffect(() => {
    //     if (selectedOption) {
    //         disableDiv();
    //     }
    // }, [selectedOption]);

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
                <title>Test</title>
            </Helmet>
            <div className='bg-[var(--bg-color)] text-[var(--text-color)] pt-[103px]'>
                <div ref={startedRef} className='max-w-[500px] py-5 mx-auto my-0 flex gap-3 flex-col justify-center items-center relative'>
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
                                <div onClick={() => checkAnswer(option)} key={index} ref={(el) => (optionRefs.current[index] = el)}
                                    className={`rounded-5 py-1 text-center font-bold text-2xl font-["PT_Series"] cursor-pointer 
                                    ${selectedOption ? option === question.meaning ? "bg-lime-500" : "bg-red-500" : "bg-gray-500"}`}>
                                    {option}
                                </div>
                            ))
                        }
                    </div>
                    <div>Sizin ümumi xalınız: {totalPoint}</div>
                    <div className='absolute top-[55%] right-[-15%] text-6xl cursor-pointer hidden' onClick={() => changeQuestion()} ref={nextButtonRef}>
                        <FaAnglesRight />
                    </div>
                </div>
                <div className='max-w-[500px] py-5 mx-auto my-0 flex gap-3 flex-col justify-center items-center hidden relative' ref={finishedRef}>
                    <h1 className='font-["Kanit"]'>Test bitdi!</h1>
                    <button className='px-3 py-1 bg-blue-500 font-["Kanit"] rounded'>Sonlandır</button>
                    <p className='font-["Kanit"] text-lg'>Testi sonlandırmaq üçün düyməyə basın</p>
                    <div>
                        {/* <DotLottieReact
                            src="https://lottie.host/d132469d-b8e1-4686-9c7e-e7da3a207aef/6Sd8T2EhyO.lottie"
                            loop
                            autoplay
                        /> */}
                        {/* <Lottie animationData='https://lottie.host/9ba86824-e626-41b1-95be-25180682551d/vt3h2YWuyi.json' loop autoplay style={{ width: 400, height: 400 }} /> */}

                        {/* <DotLottieReact
                            src="https://lottie.host/9ba86824-e626-41b1-95be-25180682551d/vt3h2YWuyi.json"
                            loop
                            autoplay
                        /> */}
                        {/* <DotLottieReact
                            src="https://lottie.host/b9380d6d-965a-4b6f-901c-62a28b7385b6/QZIsy00JCk.lottie"
                            loop
                            autoplay
                        /> */}
                        {/* <DotLottieReact
                            src="https://lottie.host/ed9f6416-a670-422c-b445-5168ae26bb65/cq6nhkEF0T.lottie"
                            loop
                            autoplay
                        /> */}
                        <DotLottieReact
                            src="https://lottie.host/2c083beb-aeee-414f-8f7a-63a833a08609/6fozHSRYsB.lottie"
                            loop
                            autoplay
                        />
                        {/* <DotLottieReact
                            src="https://lottie.host/d132469d-b8e1-4686-9c7e-e7da3a207aef/6Sd8T2EhyO.lottie"
                            loop
                            autoplay
                        /> */}
                    </div>
                    <div>Topladığınız xal: {totalPoint}</div>
                    <div>Testi sonlandırsaz topladığınız xal sizin ümumi xalınızın üzərinə gələcək</div>
                </div>
            </div>

        </>
    )
}