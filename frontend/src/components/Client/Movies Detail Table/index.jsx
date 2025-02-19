import { useContext, useRef } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { userInfoContext } from "../../../context/UserInfo";

export default function MovieTable({ checkboxStates, wordList, setWordList, setCheckboxStates, setSelectedLevels }) {
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
    let { userInfo } = useContext(userInfoContext)
    us


    return (
        <>
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
            <div className="rounded overflow-x-scroll py-3">
                <table className="w-full rounded-5 whitespace-nowrap">
                    <tbody className="rounded-5">
                        {
                            checkboxStates.find((bool) => bool == true) && wordList?.length != 0 ? (
                                wordList?.map((value) => (
                                    <tr className="bg-[var(--movies-bg)] text-lg rounded-5 text-[var(--text-color)] border-y" key={value.id}>
                                        <td className="p-3 text-3xl relative hover:text-blue-600 transition-all ease-in duration-200 hover-title flex">
                                            <div className="p-2 bg-blue-600 absolute top-[-35%] z-index-2 text-sm text-white rounded-4">Səsləndirin</div>
                                            <span className="cursor-pointer p-1"><HiSpeakerWave /></span>
                                        </td>
                                        <td className="p-3" style={{ textDecoration: value.isKnown ? "line-through" : "none" }}>{value.word.wordText}</td>
                                        <td className="p-3" style={{ textDecoration: value.isKnown ? "line-through" : "none" }}>{value.word.meaning}</td>
                                        <td className="p-3 text-3xl text-lime-400 hover-title relative">
                                            {/* js kodu eger bilinenlerdedirse div ve span olmasa hecne */}
                                            {/* <div className="p-2 bg-lime-400 absolute top-[-70%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısındadır</div>
                                            <FaRegCircleCheck /> */}
                                        </td>
                                        {/* bilinenler siyahisindadisa icon gorunsun */}
                                        <td className="p-3 text-3xl relative hover-title flex">
                                            <div className="p-2 bg-pink-400 absolute top-[-50%] z-index-2 text-sm text-white rounded-4">Bilinənlər siyahısına <br /> əlavə edin</div>
                                            <span className="cursor-pointer p-1"><FaRegEye /></span>
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
                </table>
            </div>
        </>
    )
}