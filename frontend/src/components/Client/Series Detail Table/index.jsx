import { useRef } from "react";
import { FaBarsStaggered, FaRegCircleCheck, FaRegEye } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
// material ui
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { themeContext } from "../../../context/ThemeContext";
import QuizIcon from "../Quiz Icon";
import { useDeleteWordFromKnownWordListMutation, useGetKnownWordListByIdQuery, usePostWordToKnownWordListMutation } from "../../../redux/rtk query/Slices/knownWordListSlice";
import { userInfoContext } from "../../../context/UserInfo";
import { useContext } from "react";
import { useGetByIdUserQuery } from "../../../redux/rtk query/Slices/userSlice";
import { useNavigate } from "react-router";
import LoaderIcon from "../../Loaders/Loader";
import { useEffect } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { useGenerateSentencesMutation, useGenerateSpeechMutation } from "../../../redux/rtk query/Slices/aiSlice";
import UserLoader from "../../Loaders/UserLoader";
import { IoCloseSharp } from "react-icons/io5";

export default function SerieTable({ season, handleChangeSeason, data, episode, handleChangeEpisode, seasonData, wordList, setWordList, setCheckboxStates, checkboxStates }) {
    let navigate = useNavigate()
    let { darkMode } = React.useContext(themeContext)
    let [generateSentences, { isLoading }] = useGenerateSentencesMutation()
    let [generateSpeech, { isLoading: speechLoading }] = useGenerateSpeechMutation()
    let [open, setOpen] = React.useState(false)
    let [stateData, setStateData] = useState({})

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

    // known word list
    let [postWordToKnownWordList] = usePostWordToKnownWordListMutation()
    let [deleteWordFromKnownWordList] = useDeleteWordFromKnownWordListMutation()
    let { userInfo } = useContext(userInfoContext)
    const { data: userData, isLoading: userLoading } = useGetByIdUserQuery(userInfo?.userId, { skip: !userInfo?.userId });
    const { data: userKnownList, refetch, isLoading: knownListLoading } = useGetKnownWordListByIdQuery(
        userData?.knownWordListId, { skip: !userData?.knownWordListId }
    );
    useEffect(() => {
        if (userData?.knownWordListId) {
            refetch();
        }
    }, [userData?.knownWordListId, refetch]);

    if (userLoading || knownListLoading) {
        return <LoaderIcon />;
    }

    const addToKnownListFunction = async (e, word) => {
        e.stopPropagation()
        if (userData) {
            let finded = userKnownList?.knownWordListWords?.find((wordObj) => wordObj.word.id == word.wordId)
            if (finded) {
                await deleteWordFromKnownWordList({ knownWordListId: userKnownList.id, wordId: word.wordId })
                refetch()
            } else {
                await postWordToKnownWordList({ knownWordListId: userKnownList.id, wordId: word.wordId })
                refetch()
            }
        } else {
            navigate('/login')
        }
    }

    const showSentence = async (word) => {
        setOpen(true)
        const response = await generateSentences(word)
        setStateData(response.data)
    }

    const speakingText = async (e, text) => {
        e.stopPropagation()
        const response = await generateSpeech(text)
        playBase64Audio(response.data.audioBase64)
    }

    return (
        <div className="bg-[var(--bg-color)]">
            <div className="flex items-center justify-center">
                <FormControl required sx={{ m: 1, width: "100%", }}>
                    <InputLabel id="demo-simple-select-required-label" sx={{ color: darkMode == true ? 'white' : 'black' }} >Sezon seçin</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={season}
                        label="Sezon seçin *"
                        onChange={handleChangeSeason}
                        sx={{
                            width: '100%',
                            color: darkMode == true ? 'white' : 'black',
                            backgroundColor: '',
                            border: '1px solid white',
                        }}
                        className="text-[var(--text-color)]"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            data?.seasons.map((sezon, index) => (
                                <MenuItem key={sezon.id} value={sezon.id}>Sezon {index + 1}: {sezon.title}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            {
                season ? (
                    <div className="flex items-center justify-center">
                        <FormControl required sx={{ m: 1, width: "100%", }}>
                            <InputLabel id="demo-simple-select-required-label" sx={{ color: darkMode == true ? 'white' : 'black' }} >Bölüm seçin</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={episode}
                                label="Bölüm seçin *"
                                onChange={handleChangeEpisode}
                                sx={{
                                    width: '100%',
                                    color: darkMode == true ? 'white' : 'black',
                                    backgroundColor: '',
                                    border: '1px solid white',
                                }}
                                className="text-[var(--text-color)]"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    seasonData?.episodes.map((episode, index) => (
                                        <MenuItem key={episode.id} value={episode.id}>Bölüm {index + 1}: {episode.title}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                ) : (<></>)
            }
            {
                episode ? (
                    <>
                        <div div className="max-w-[1000px] mx-auto my-5 text-[var(--text-color)] bg-[var(--movies-bg)] rounded-4 py-3 flex flex-col">
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
                            <div className="text-xl">{!checkboxStates.find((bool) => bool == true) ? '0' : wordList?.length} söz</div>
                            <div className="text-3xl font-['Kanit']">Sözlər</div>
                            <div className="my-3 relative flex justify-end">
                                <span className="text-3xl cursor-pointer" onClick={() => sortedWordsFunction()}><FaBarsStaggered /></span>
                                <ul
                                    className='absolute w-[100px] -top-4 rounded bg-white text-black opacity-90 transition-all duration-200 ease-in right-10 handleBars'
                                    ref={sortWords}>
                                    <li data-value="1" onClick={() => handleSortWords('a-z')}
                                        className='hover:bg-[#91d1dec0] rounded ml-[-32px] p-1 cursor-pointer'>A-Z</li>
                                    <li data-value="2" onClick={() => handleSortWords('z-a')}
                                        className='hover:bg-[#91d1dec0] rounded ml-[-32px] p-1 cursor-pointer'>Z-A</li>
                                </ul>
                            </div>
                        </div>
                        {/* table */}
                        <div className="rounded  max-[750px]:overflow-x-scroll py-3">
                            <table className="w-full rounded-5  whitespace-nowrap">
                                <tbody className="rounded-5">
                                    {
                                        checkboxStates.find((bool) => bool == true) && wordList?.length != 0 ? (
                                            wordList?.map((value) => (
                                                <tr onClick={() => showSentence(value.word.wordText)} className="bg-[var(--movies-bg)] text-xl rounded-5 text-[var(--text-color)] border-y" key={value.id}>
                                                    <td className="p-3 text-3xl cursor-pointer relative hover:text-blue-600 transition-all ease-in duration-200 hover-title flex">
                                                        <div className="p-2 bg-blue-600 absolute top-[-35%] z-index-2 text-sm text-white rounded-4">Səsləndirin</div>
                                                        <span onClick={(e) => speakingText(e, value.word.wordText)} className="cursor-pointer p-1"><HiSpeakerWave /></span>
                                                    </td>
                                                    <td className="p-3" style={{ textDecoration: value.isKnown ? "line-through" : "none" }}>{value.word.wordText}</td>
                                                    <td className="p-3" style={{ textDecoration: value.isKnown ? "line-through" : "none" }}>{value.word.meaning}</td>
                                                    <td className="p-3 text-3xl text-lime-400 hover-title relative">
                                                        {
                                                            (userKnownList?.knownWordListWords?.find((wordObj) => wordObj.word.id == value.wordId)) ? (
                                                                <>
                                                                    <div className="p-2 bg-lime-400 absolute top-[-52%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısındadır</div>
                                                                    <FaRegCircleCheck />
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )
                                                        }
                                                    </td>
                                                    <td className="p-3 text-3xl relative hover-title flex">
                                                        <div className="p-2 bg-pink-400 absolute top-[-50%] z-index-2 text-sm text-white rounded-4">
                                                            {(userKnownList?.knownWordListWords?.find((wordObj) => wordObj.word.id == value.wordId)) ?
                                                                <span dangerouslySetInnerHTML={{ __html: 'Bilinənlər siyahısından <br /> silin' }} /> :
                                                                <span dangerouslySetInnerHTML={{ __html: 'Bilinənlər siyahısına <br /> əlavə edin' }} />
                                                            }
                                                        </div>
                                                        <span onClick={(e) => addToKnownListFunction(e, value)} className="cursor-pointer p-1">
                                                            {(userKnownList?.knownWordListWords?.find((wordObj) => wordObj.word.id == value.wordId)) ? <FaRegEyeSlash /> : <FaRegEye />}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : checkboxStates.find((bool) => bool == true) && wordList?.length == 0 ? (
                                            <h3>Filmdə bu leveldə söz yoxdur</h3>
                                        ) : (
                                            <h3>Level seçərək başlayın</h3>
                                        )
                                    }
                                </tbody>
                                <div className={`${open ? 'flex' : 'hidden'} items-center justify-center rounded bg-gray-600 fixed bottom-[8%] sm:bottom-[3%] left-1/2 lg:left-1/3 -translate-x-1/2 p-3 max-w-[500px] min-h-[150px] w-full mr-5`}>
                                    <span onClick={() => setOpen(false)} className="cursor-pointer  text-white absolute top-2 right-2 text-4xl hover:text-red-500"><IoCloseSharp /></span>
                                    {
                                        isLoading ? (
                                            <UserLoader />
                                        ) : (
                                            <div className="font-semibold font-['Kanit'] text-2xl w-full pt-[25px]">
                                                <div className="break-words whitespace-pre-wrap">{stateData?.english}</div>
                                                <div>{stateData?.azerbaijani}</div>
                                                <span onClick={(e) => speakingText(e, stateData?.english)} className="hover:text-blue-600 text-white cursor-pointer absolute top-3 left-3 text-3xl"><HiSpeakerWave /></span>
                                            </div>
                                        )
                                    }
                                </div>
                            </table>
                        </div>
                        <QuizIcon checkboxStates={checkboxStates} wordList={wordList} />
                    </>
                ) : (<></>)
            }
        </div>
    )
}