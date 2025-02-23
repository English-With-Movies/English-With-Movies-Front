import { useContext, useEffect, useRef } from "react";
import { IoRocketSharp } from "react-icons/io5";
import { quizDataContext } from "../../../context/QuizDataContext";
import { useNavigate } from "react-router";
import { userInfoContext } from "../../../context/UserInfo";
import { useGetByIdUserQuery } from "../../../redux/rtk query/Slices/userSlice";
import { useGetKnownWordListByIdQuery } from "../../../redux/rtk query/Slices/knownWordListSlice";

export default function QuizIcon({ wordList, checkboxStates }) {
    let quizIconRef = useRef()
    let navigate = useNavigate()
    let { userInfo } = useContext(userInfoContext)
    useEffect(() => {
        const handleScroll = () => {
            if (!quizIconRef.current) return;
            if (window.scrollY < 350) {
                quizIconRef.current.classList.add("hidden");
            } else {
                quizIconRef.current.classList.remove("hidden");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    let { data: userData } = useGetByIdUserQuery(userInfo?.userId)
    let { data: knownList, isLoading } = useGetKnownWordListByIdQuery(userData?.knownWordListId)
    let { quizDataArray, setQuizDataArray } = useContext(quizDataContext)
    // go to quiz page
    const goToQuizPage = () => {
        if (userInfo.userId && !isLoading) {
            let filter = wordList?.filter((value) => !knownList?.knownWordListWords.some(el => el.word.id === value.wordId))
            setQuizDataArray(filter)
            navigate('/quiz')
        } else {
            navigate("/login")
        }

    }
    console.log(quizDataArray);

    return (
        <div className={`${!(checkboxStates?.find((bool) => bool == true)) ? 'hidden' : 'block'}`}>
            <div ref={quizIconRef} onClick={() => goToQuizPage()}
                className='z-index-10 border-2 border-solid border-red-500 bg-red-500 p-[20px] sm:p-[40px] fixed bottom-[3%] w-12 h-12 rounded-full items-center justify-center flex flex-col text-white cursor-pointer transition-all duration-250 ease-in hover:bg-blue-500/[.3] fixed-arrow hidden left-[5%]'>
                <span className='text-3xl mb-1'><IoRocketSharp /></span>
                <span className='text-sm text-white sm:block hidden'>Quiz</span>
            </div>
        </div>
    )
}