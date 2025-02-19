import { useReducer, useRef, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { FaBarsStaggered, FaRegCircleCheck } from "react-icons/fa6";
import { HiSpeakerWave } from "react-icons/hi2";
import { ImBin } from "react-icons/im";
import { IoRocketSharp } from "react-icons/io5";
import { useGetKnownWordListByIdQuery, usePostWordToKnownWordListMutation } from "../../../redux/rtk query/Slices/knownWordListSlice";

export default function KnownWords() {
    const [checkboxStates, setCheckboxStates] = useState(
        Array.from({ length: 5 }).fill(false)
    );
    let sortWords = useRef()

    const handleCheckboxChange = (index) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);
    };
    const sortedWordsFunction = () => {
        sortWords.current.classList.toggle("handleBars")
    }

    let { data, refetch } = useGetKnownWordListByIdQuery(2)
    console.log(data);
    let [postWordToKnownWordList] = usePostWordToKnownWordListMutation()
    const addword = async () => {
        await postWordToKnownWordList({ knownWordListId: 2, wordId: 2 })
        refetch()
        console.log(data);
        
    }

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
                    {/* <p className="text-[var(--text-color)] mt-4">
                    Seçilən səviyyələr:{" "}
                    {checkboxStates
                        .map((isChecked, index) => (isChecked ? `LEVEL ${index + 1}` : null))
                        .filter(Boolean)
                        .join(", ") || "Heç biri"}
                    </p> */}

                    <div className="flex items-center justify-between my-3">
                        <div className="text-xl">1234 söz</div>
                        <div className="text-5xl font-['Kanit']">Sözlər</div>
                        <div className="my-3 relative flex justify-end">
                            <span className="text-3xl cursor-pointer" onClick={() => sortedWordsFunction()}><FaBarsStaggered /></span>
                            <ul
                                className='absolute w-[100px] -top-4 rounded bg-white text-black opacity-90 
                                transition-all duration-200 ease-in right-10 handleBars'
                                ref={sortWords}>
                                <li data-value="1"
                                    className='hover:bg-[#91d1dec0] rounded ml-[-32px] p-1 cursor-pointer'>A-Z</li>
                                <li data-value="2"
                                    className='hover:bg-[#91d1dec0] rounded ml-[-32px] p-1 cursor-pointer'>Z-A</li>

                            </ul>
                        </div>
                    </div>
                    {/* table */}
                    <div className="rounded max-[750px]:overflow-x-scroll">
                        <table className="rounded-5 w-full whitespace-nowrap">
                            <tbody className="rounded-5">
                                {
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <tr className="bg-[var(--movies-bg)] text-xl rounded-5 text-[var(--text-color)] border-y" key={index}>
                                            <td className="p-3 text-3xl cursor-pointer relative hover:text-blue-600 transition-all ease-in duration-200 hover-title">
                                                <div className="p-2 bg-blue-600 absolute top-[-35%] z-index-2 text-sm text-white rounded-4">Səsləndirin</div>
                                                <HiSpeakerWave />
                                            </td>
                                            <td className="p-3">kaçınmak, çekinmek</td>
                                            <td className="p-3">aaaaaaaaaaaaaa</td>
                                            <td className="p-3 text-3xl text-lime-400 hover-title relative">
                                                <div className="p-2 bg-lime-400 absolute top-[-70%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısındadır</div>
                                                <FaRegCircleCheck />
                                            </td>
                                            {/* bilinenler siyahisindadisa (ki onsuz eledi) icon gorunsun */}
                                            <td className="p-3 text-3xl cursor-pointer transition-all duration-200 ease-in hover:text-red-600 relative hover-title">
                                                <div className="p-2 bg-red-600 absolute top-[-70%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısından silin</div>
                                                <ImBin />
                                            </td>
                                            {/* filterleyim bilinenler siyahisindan silsin */}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </Container>
                <div className='z-index-10 border-2 border-solid border-red-500 p-5 fixed right-[12%] bottom-[3%] w-12 h-12 rounded-full items-center justify-center flex flex-col text-white cursor-pointer transition-all duration-250 ease-in hover:bg-blue-500/[.3] fixed-arrow'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <span className='text-3xl mb-1'><IoRocketSharp /></span>
                    <span className='text-sm '>Quiz</span>
                </div>
            </div>
        </>

    )
}