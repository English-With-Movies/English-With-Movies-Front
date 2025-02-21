import { useContext, useEffect, useReducer, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { FaBarsStaggered, FaRegCircleCheck } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { ImBin } from "react-icons/im";
import { IoRocketSharp } from "react-icons/io5";
import { useDeleteWordFromKnownWordListMutation, useGetKnownWordListByIdQuery, usePostWordToKnownWordListMutation } from "../../../redux/rtk query/Slices/knownWordListSlice";
import UserInfo, { userInfoContext } from "../../../context/UserInfo";
import { useNavigate } from "react-router";
import { useGetByIdUserQuery } from "../../../redux/rtk query/Slices/userSlice";
import QuizIcon from "../../../components/Client/Quiz Icon";
// import QuizIcon from "../../../components/Client/Quiz Icon";

export default function KnownWords() {
    // scroll
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    let navigate = useNavigate()
    
    // known list table and delete
    let [deleteWordFromKnownWordList] = useDeleteWordFromKnownWordListMutation()
    let { userInfo } = useContext(userInfoContext)
    let { data: userData } = useGetByIdUserQuery(userInfo?.userId, { skip: !userInfo?.userId })
    let { data: userKnownList, isLoading, refetch } = useGetKnownWordListByIdQuery(userData?.knownWordListId, { skip: !userData?.knownWordListId })
    console.log(userKnownList);
    const deleteKnownWordListFunction = async (word) => {
        await deleteWordFromKnownWordList({ knownWordListId: userKnownList.id, wordId: word.word.id })
        refetch()
    }
    let [wordList, setWordList] = useState([])
    useEffect(() => {
        if (!isLoading && userKnownList) {
            setWordList(userKnownList?.knownWordListWords)
        }
    }, [isLoading, userKnownList])

    // select word level checkbox
    const [checkboxStates, setCheckboxStates] = useState(
        Array.from({ length: 5 }).fill(true)
    );
    const [selectedLevels, setSelectedLevels] = useState([]);
    useEffect(() => {
        const selected = checkboxStates
            .map((isChecked, i) => (isChecked ? i + 1 : null))
            .filter(Boolean);
        setSelectedLevels(selected);
    }, [checkboxStates])

    useEffect(() => {
        const filteredWords = selectedLevels?.length ? userKnownList?.knownWordListWords.filter((value) => selectedLevels.includes(value.word.levelId)) : wordList;
        setWordList(filteredWords);
    }, [selectedLevels, checkboxStates])

    // visible sort 
    let sortWords = useRef()
    const sortedWordsFunction = () => {
        sortWords.current.classList.toggle("handleBars")
    }

    // sorted word function
    const handleSortWords = (value) => {
        if (value == 'a-z') {
            let sortAZ = wordList.toSorted((a, b) => a.word.wordText.localeCompare(b.word.wordText))
            setWordList(sortAZ)
        } else if (value == 'z-a') {
            let sortZA = wordList.toSorted((a, b) => b.word.wordText.localeCompare(a.word.wordText))
            setWordList(sortZA)
        }
    }

    // selected words' level
    const handleCheckboxChange = (index) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);

        const selected = updatedStates
            .map((isChecked, i) => (isChecked ? i + 1 : null))
            .filter(Boolean);
        setSelectedLevels(selected);
    };


    return (
        <>
            <Helmet>
                <title>Bilinən sözlər</title>
            </Helmet>

            <div className="pt-[130px] bg-[var(--bg-color)] text-white">
                <Container>
                    <h1 className="font-['Kanit']" onClick={() => addword()}>Bilinən sözlər</h1>
                    {/* level choice */}
                    <div className="max-w-[1000px] mx-auto my-5 text-[var(--text-color)] bg-[var(--movies-bg)] rounded-4 py-3 flex flex-col">
                        <h3 className="text-center mb-4 font-[Kanit]">Sözlərin çətinlik səviyyəsini seçin</h3>
                        <div className="flex items-center gap-2 justify-around flex-wrap sm:flex-nowrap">
                            {
                                Array.from({ length: 5 }).map((_, index) => (
                                    <div key={index + 1}>
                                        <div className="text-[var(--text-color)] font-bold text-lg">LEVEL {index + 1}</div>
                                        <div className="level-button flex items-center justify-center">
                                            <input type="checkbox" className="difficulty-check" id={`difficulty-check-${index + 1}`} checked={checkboxStates[index]} onChange={() => handleCheckboxChange(index)} />
                                            <label htmlFor={`difficulty-check-${index + 1}`} className="theme-label"></label>
                                            <div className="background"></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                        <div className="text-xl">{wordList?.length} söz</div>
                        <div className="text-3xl font-['Kanit']">Sözlər</div>
                        <div className="my-3 relative flex justify-end">
                            <span className="text-3xl cursor-pointer" onClick={() => sortedWordsFunction()}><FaBarsStaggered /></span>
                            <ul
                                className='absolute w-[100px] -top-4 rounded bg-white text-black opacity-90 
                                transition-all duration-200 ease-in right-10 handleBars'
                                ref={sortWords}>
                                <li data-value="1" onClick={() => handleSortWords('a-z')}
                                    className='hover:bg-[#91d1dec0] rounded ml-[-32px] p-1 cursor-pointer'>A-Z</li>
                                <li data-value="2" onClick={() => handleSortWords('z-a')}
                                    className='hover:bg-[#91d1dec0] rounded ml-[-32px] p-1 cursor-pointer'>Z-A</li>

                            </ul>
                        </div>
                    </div>
                    {/* table */}
                    <div className="rounded max-[850px]:overflow-x-scroll py-[45px]">
                        <table className="rounded-5 w-full whitespace-nowrap">
                            <tbody className="rounded-5">
                                {
                                    checkboxStates.find((bool) => bool == true) && wordList?.length != 0 ? (
                                        wordList?.map((value) => (
                                            <tr className="bg-[var(--movies-bg)] text-xl rounded-5 text-[var(--text-color)] border-y" key={value.id}>
                                                <td className="p-3 text-3xl cursor-pointer relative hover:text-blue-600 transition-all ease-in duration-200 hover-title">
                                                    <div className="p-2 bg-blue-600 absolute top-[-35%] z-index-2 text-sm text-white rounded-4">Səsləndirin</div>
                                                    <HiSpeakerWave />
                                                </td>
                                                <td className="p-3">{value.word.wordText}</td>
                                                <td className="p-3">{value.word.meaning}</td>
                                                <td className="p-3 text-3xl text-lime-400 hover-title relative">
                                                    <div className="p-2 bg-lime-400 absolute top-[-55%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısındadır</div>
                                                    <FaRegCircleCheck />
                                                </td>
                                                <td className="p-3 text-3xl relative hover-title flex">
                                                    <div className="p-2 bg-red-600 absolute top-[-55%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısından silin</div>
                                                    <span onClick={() => deleteKnownWordListFunction(value)} className="cursor-pointer p-1 "><ImBin /></span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : checkboxStates.find((bool) => bool == true) && wordList?.length == 0 ? (
                                        <h3>Siyahınızda bu leveldə söz yoxdur</h3>
                                    ) : (
                                        <h3>Level seçərək başlayın</h3>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                </Container>
                {
                    userInfo.userId ? (
                        <QuizIcon wordList={wordList} checkboxStates={checkboxStates} />
                    ) : (
                        <></>
                    )
                }

            </div>
        </>

    )
}