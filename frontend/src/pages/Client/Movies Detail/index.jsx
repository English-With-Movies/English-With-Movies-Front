import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { useRef, useState } from "react";
import { ImBin } from "react-icons/im";
import { FaBarsStaggered, FaRegCircleCheck } from "react-icons/fa6";
import { FaRegEye } from 'react-icons/fa';


export default function MoviesDetail() {
    // favorites add function
    const [checkboxStates, setCheckboxStates] = useState(
        Array.from({ length: 5 }).fill(false)
    );

    const tableArray = [
        {
            id: 1,
            engword: "word",
            azeword: "söz",
            isKnown: false
        },
        {
            id: 2,
            engword: "movies",
            azeword: "filmlər",
            isKnown: false
        },
        {
            id: 3,
            engword: "series",
            azeword: "seriallar",
            isKnown: true
        },
        {
            id: 4,
            engword: "color",
            azeword: "rəng",
            isKnown: false
        }
    ]

    let sortWords = useRef()
    let lineThrough = useRef()

    const sortedWordsFunction = () => {
        sortWords.current.classList.toggle("handleBars")
    }

    const handleCheckboxChange = (index) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);
    };

    const underlineWord = (value) => {
        tableArray.map((element) => element.id == value.id ? { ...value, crossed: !value.isKnown } : value.isKnown)
    }

    return (
        <>
            <Helmet>
                <title>`{`film.name`}`</title>
            </Helmet>

            <div className="py-3 bg-[var(--bg-color)] text-white">
                <Container>
                    <div className="text-[var(--text-color)]">
                        {/* banner */}
                        <div className='bg-[var(--movies-bg)] relative my-0 mx-[auto] max-w-[1320px] height-[500px] w-full'>
                            <img src="https://dummyimage.com/1320x500/eb99eb/343982" className="object-cover object-center w-full" />
                            {/* overlay effect */}
                            <div className="overlay"></div>
                        </div>
                        {/* movie about */}
                        <div className="my-0 mx-[auto] max-w-[1200px] flex gap-10 flex-col sm:flex-row">
                            {/* <div className="max-w-[200px] w-full -mt-7 ml-7 relative z-index-2">
                                <img src="https://dummyimage.com/300x450/343982/eb99eb" className="w-full" />
                            </div> */}
                            <div className="text-[var(--text-color)] w-full">
                                <div className="flex items-center">
                                    <h3 className="mr-3">Interstellar</h3>
                                    <span className="px-2 bg-lime-600">KOLAY</span>
                                </div>
                                <div className="my-1 flex items-center">
                                    <div className="text-xl font-semibold mr-3">IMDB: 9.9</div>
                                    <div
                                        onClick={() => handleFavorites()}
                                        className='text-red-500 text-2xl cursor-pointer'>
                                        {/* {favorites.find((fav) => fav.id === item.id) ? <FaHeart/> : <FaRegHeart />} */}
                                        <FaRegHeart />
                                    </div>
                                </div>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur, impedit facilis fuga nisi odio ullam erit impedit molestiae inventore in?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore consectetur, impedit facilis fuga nisi odio ullam dolorum eveniet excepturi asperiores fugiat repellat tempora sit sunt ea similique eaque? Unde dolore vitae recusandae quam nam </p>
                            </div>
                        </div>
                    </div>
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
                    <div className="rounded  max-[750px]:overflow-x-scroll">
                        <table className="w-full rounded-5  whitespace-nowrap">
                            <tbody className="rounded-5">
                                {
                                    tableArray.map((value) => (
                                        <tr className="bg-[var(--movies-bg)] text-xl rounded-5 text-[var(--text-color)] border-y" key={value.id}>
                                            <td className="p-3 text-3xl relative hover:text-blue-600 transition-all ease-in duration-200 hover-title flex">
                                                <div className="p-2 bg-blue-600 absolute top-[-35%] z-index-2 text-sm text-white rounded-4">Səsləndirin</div>
                                                <span className="cursor-pointer p-1"><HiSpeakerWave /></span>
                                            </td>
                                            <td className="p-3" style={{textDecoration: value.isKnown ? "line-through" : "none"}}>{value.engword}</td>
                                            <td className="p-3" style={{textDecoration: value.isKnown ? "line-through" : "none"}}>{value.azeword}</td>
                                            <td className="p-3 text-3xl text-lime-400 hover-title relative">
                                                {/* js kodu eger bilinenlerdedirse div ve span olmasa hecne */}
                                                {/* <div className="p-2 bg-lime-400 absolute top-[-70%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısındadır</div>
                                                <FaRegCircleCheck /> */}
                                            </td>
                                            {/* bilinenler siyahisindadisa icon gorunsun */}
                                            <td className="p-3 text-3xl relative hover-title flex">
                                                {/* <div className="p-2 bg-red-600 absolute top-[-70%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısından silin</div> */}
                                                <span onClick={() => underlineWord(value)} className="cursor-pointer p-1"><FaRegEye /></span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Container>
            </div>
        </>

    )
}