import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { ImBin } from "react-icons/im";
import { FaBarsStaggered, FaRegCircleCheck } from "react-icons/fa6";
import { FaRegEye } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router";
import { useGetByIdMovieQuery } from "../../../redux/rtk query/Slices/moviesSlice";
import LoaderIcon from "../../../components/Loaders/Loader";
import { useGetAllLevelQuery } from "../../../redux/rtk query/Slices/levelSlice";
import premiumIcon from "../../../assets/premium-icon.png"

export default function MoviesDetail() {
    // seviyye levelbyid elemek olar onun id ile getirib seviyye name yazmaq olar 
    let { id } = useParams()
    let navigate = useNavigate()
    let { data, isLoading, isError, error } = useGetByIdMovieQuery(id)
    console.log(data);

    let { data: levelData, isLoading: levelIsLoading } = useGetAllLevelQuery()
    let [movieLevel, setMovieLevel] = useState()
    useEffect(() => {
        if (!isLoading && !levelIsLoading) {
            setMovieLevel(levelData.find((level) => level.id == data.levelId))
        }
    }, [isLoading, levelIsLoading])



    // favorites add function
    const [checkboxStates, setCheckboxStates] = useState(
        Array.from({ length: 5 }).fill(false)
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

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
    // let lineThrough = useRef()

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
                <title>{data?.name}</title>
            </Helmet>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className="bg-[var(--bg-color)] text-white pt-[103px]">
                        <div className="text-[var(--text-color)]">
                            {/* banner */}
                            <div className="w-full lg:h-[500px] relative">
                                <img
                                    src={`https://englishwithmovies.blob.core.windows.net/moviebanner/${data.bannerImgName}`}
                                    alt="Banner"
                                    className="w-full h-full object-cover"
                                />
                                <div className="overlay"></div>
                            </div>
                            {/* movie about */}
                            <div className="my-3 mx-[auto] max-w-[1200px] flex gap-10 flex-col sm:flex-row px-3">
                                <div className="text-[var(--text-color)] w-full">
                                    <div className="flex items-center">
                                        <h1 className="mr-3 font-['Kanit']">{data.name}</h1>
                                        <span
                                            className={`px-2 font-['Kanit'] font-semibold text-white
                                            ${data.levelId == 1 ? "bg-lime-600" : data.levelId == 2 ? "bg-blue-600" : data.levelId == 3 ? "bg-orange-600" : data.levelId == 4 ? "bg-purple-600" : data.levelId == 5 ? "bg-red-600" : "bg-gray-600"}`}>
                                            {movieLevel?.name}
                                        </span>
                                        <div className='ml-3 text-2xl w-[30px] h-[30px]'>{data.isPremiumFilm ? (
                                            <img className='w-full h-full' src={premiumIcon} alt="" />
                                        ) : ("")}</div>
                                    </div>
                                    <div>
                                        {
                                            data.movieGenres.length ? (
                                                data.movieGenres.map((genre) => {
                                                    <span className="mx-1 font-['Kanit'] px-1 bg-gray-500 rounded">{genre}</span>
                                                })
                                            ) : (
                                                <>
                                                    {/* <span className="mx-1 font-['Kanit'] px-1 bg-gray-500 rounded text-white">genre</span>
                                                    <span className="mx-1 font-['Kanit'] px-1 bg-gray-500 rounded text-white">genre</span>
                                                    <span className="mx-1 font-['Kanit'] px-1 bg-gray-500 rounded text-white">genre</span>
                                                    <span className="mx-1 font-['Kanit'] px-1 bg-gray-500 rounded text-white">genre</span> */}
                                                </>
                                            )
                                        }

                                    </div>
                                    <div className="my-1 flex items-center">
                                        <div className="text-xl font-['Kanit'] mr-3"><span className="bg-yellow-300 text-black font-bold text-lg px-2 ">IMBd</span> {data.imdb}</div>
                                        <div
                                            onClick={() => handleFavorites()}
                                            className='text-red-500 text-2xl cursor-pointer'>
                                            {/* {favorites.find((fav) => fav.id === item.id) ? <FaHeart/> : <FaRegHeart />} */}
                                            <FaRegHeart />
                                        </div>
                                    </div>
                                    <p>{data.description} </p>
                                </div>
                            </div>
                        </div>
                        <Container>
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
                            <div className="flex items-center justify-between mt-3">
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
                            <div className="rounded  max-[750px]:overflow-x-scroll py-3">
                                <table className="w-full rounded-5  whitespace-nowrap">
                                    <tbody className="rounded-5">
                                        {
                                            tableArray.map((value) => (
                                                <tr className="bg-[var(--movies-bg)] text-xl rounded-5 text-[var(--text-color)] border-y" key={value.id}>
                                                    <td className="p-3 text-3xl relative hover:text-blue-600 transition-all ease-in duration-200 hover-title flex">
                                                        <div className="p-2 bg-blue-600 absolute top-[-35%] z-index-2 text-sm text-white rounded-4">Səsləndirin</div>
                                                        <span className="cursor-pointer p-1"><HiSpeakerWave /></span>
                                                    </td>
                                                    <td className="p-3" style={{ textDecoration: value.isKnown ? "line-through" : "none" }}>{value.engword}</td>
                                                    <td className="p-3" style={{ textDecoration: value.isKnown ? "line-through" : "none" }}>{value.azeword}</td>
                                                    <td className="p-3 text-3xl text-lime-400 hover-title relative">
                                                        {/* js kodu eger bilinenlerdedirse div ve span olmasa hecne */}
                                                        {/* <div className="p-2 bg-lime-400 absolute top-[-70%] z-index-2 text-sm text-white rounded-4">Bilinənlər <br /> siyahısındadır</div>
                                                <FaRegCircleCheck /> */}
                                                    </td>
                                                    {/* bilinenler siyahisindadisa icon gorunsun */}
                                                    <td className="p-3 text-3xl relative hover-title flex">
                                                        <div className="p-2 bg-pink-400 absolute top-[-50%] z-index-2 text-sm text-white rounded-4">Bilinənlər siyahısına <br /> əlavə edin</div>
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
                )
            }

        </>

    )
}