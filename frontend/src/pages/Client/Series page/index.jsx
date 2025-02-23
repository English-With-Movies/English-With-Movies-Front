import { useContext, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { TiArrowUnsorted } from "react-icons/ti";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import { useGetAllMoviesQuery } from '../../../redux/rtk query/Slices/moviesSlice';
import { useGetAllLevelQuery } from '../../../redux/rtk query/Slices/levelSlice';
import premiumIcon from "../../../assets/premium-icon.png"
import LoaderIcon from '../../../components/Loaders/Loader';
import { useNavigate } from 'react-router';
import { useAddToFavoritesUserMutation, useDeleteFromFavoritesUserMutation, useGetFavoriteMoviesUserQuery } from '../../../redux/rtk query/Slices/userSlice';
import { userInfoContext } from '../../../context/UserInfo';
import { useGetAllGenreQuery } from '../../../redux/rtk query/Slices/genreSlice';
import { useGetSettingsByKeyQuery } from '../../../redux/rtk query/Slices/settingsSlice';


export default function SeriesPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    let { data: seriesText } = useGetSettingsByKeyQuery('SeriesText')

    let navigate = useNavigate()
    let { userInfo } = useContext(userInfoContext)
    let [addToFavoritesUser] = useAddToFavoritesUserMutation()
    let [deleteFromFavoritesUser] = useDeleteFromFavoritesUserMutation()
    let { data: userFavoritesArray, refetch: userFavRefech } = useGetFavoriteMoviesUserQuery(userInfo.userId)
    let { data: allGenre, isLoading: genreLoading } = useGetAllGenreQuery()
    let sortRef = useRef()
    let genreRef = useRef()
    let { data: allData, isLoading } = useGetAllMoviesQuery()
    let [allSeriesData, setAllSeriesData] = useState([])
    useEffect(() => {
        if (!isLoading && allData) {
            setAllSeriesData(allData.filter(item => item.isFilm === false))
        }
    }, [allData, isLoading])

    let { data: levelData } = useGetAllLevelQuery()

    // add to favorites
    const handleFavorites = async (e, movie) => {
        e.stopPropagation();
        if (userInfo.userId) {
            let finded = userFavoritesArray?.find((fav) => fav.id === movie.id)
            if (finded) {
                await deleteFromFavoritesUser({ userId: userInfo.userId, movieId: movie.id });
                userFavRefech()
            } else {
                await addToFavoritesUser({ userId: userInfo.userId, movieId: movie.id });
                userFavRefech()
            }
        } else {
            navigate("/login")
        }
    }

    const genreVisible = () => {
        genreRef.current.classList.toggle("genreListVisible")
    }
    // search function
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase().trim()
        if (searchValue == "") {
            setAllSeriesData(allData.filter(item => item.isFilm === false))
        } else {
            let mySearchData = allData.filter(item => item.isFilm === false)
            let filtered = mySearchData.filter((element) => element.name.toLowerCase().startsWith(searchValue))
            setAllSeriesData(filtered)
        }
    }
    // sort functions
    const handleSort = (value) => {
        if (value == 'default') {
            setAllSeriesData(allData.filter(item => item.isFilm === false))
        } else if (value == 'a-z') {
            let sortedAZ = allSeriesData.toSorted((a, b) => a.name.localeCompare(b.name))
            setAllSeriesData(sortedAZ)
        } else if (value == 'z-a') {
            let sortedZA = allSeriesData.toSorted((a, b) => b.name.localeCompare(a.name))
            setAllSeriesData(sortedZA)
        } else if (value == 'fromMoreToLessImdb') {
            let sortedFromMoreToLessImdb = allSeriesData.toSorted((a, b) => a.imdb - b.imdb)
            setAllSeriesData(sortedFromMoreToLessImdb)
        } else if (value == 'fromLessToMoreImdb') {
            let sortedFromLessToMoreImdb = allSeriesData.toSorted((a, b) => b.imdb - a.imdb)
            setAllSeriesData(sortedFromLessToMoreImdb)
        }
    }
    const getMoviesByGenre = (genreId) => {
        const filteredMovieId = allGenre
            .flatMap(genre => genre.movieGenres)
            .filter(item => item.genreId === genreId)
            .map(item => item.movieId);

        let myGenreData = allData.filter(item => item.isFilm === false)
        const filtered = myGenreData.filter(movie =>
            filteredMovieId.includes(movie.id)
        );
        setAllSeriesData(filtered);
    }

    return (
        <>
            <Helmet>
                <title>Seriallar</title>
            </Helmet>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className="series-page py-3 bg-[var(--bg-color)] text-white mt-[103px]">
                        <Container>
                            <div className="text-[var(--text-color)]">
                                <h1>İngiliscə Seriallarda İstifadə Olunan Sözlər və Mənaları</h1>
                                <div className='bg-[var(--movies-bg)] p-3 series-about-wrapper mt-4'>
                                    <p className='text-lg'>{seriesText?.value}</p>
                                    <div className='flex gap-4 items-center'>
                                        <input
                                            onChange={(e) => handleSearch(e)}
                                            title='search'
                                            placeholder='Serial axtarın'
                                            type="text"
                                            className={`w-full border-2 border-[#fff] py-1 px-3 placeholder:text-[var(--text-color)] placeholder:opacity-70 focus:outline-none focus:shadow-[0_0px_5px_0px_#fff]
                                            `} />

                                        <div className='relative'>
                                            <button onClick={() => sortRef.current.classList.toggle("handleBars")} title='Sort' className='flex items-center justify-center text-xl px-3 py-1 rounded-5 hover:shadow-[0_0px_5px_0px_#fff]'>Sıralama: <TiArrowUnsorted /></button>
                                            <ul
                                                className='absolute top-[100%] rounded-4 bg-white text-black opacity-90 w-full transition-all duration-200 ease-in handleBars z-10'
                                                ref={sortRef}>
                                                <li data-value="1" onClick={() => handleSort('default')}
                                                    className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 cursor-pointer'>Default</li>
                                                <li data-value="1" onClick={() => handleSort('a-z')}
                                                    className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 cursor-pointer'>A-Z</li>
                                                <li data-value="2" onClick={() => handleSort('z-a')}
                                                    className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 cursor-pointer'>Z-A</li>
                                                <li data-value="3" onClick={() => handleSort('fromMoreToLessImdb')}
                                                    className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 flex items-center cursor-pointer'>
                                                    IMDB <MdOutlineArrowUpward />
                                                </li>
                                                <li data-value="3" onClick={() => handleSort('fromLessToMoreImdb')}
                                                    className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 flex items-center cursor-pointer'>
                                                    IMDB <MdOutlineArrowDownward />
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                genreLoading ? (
                                    <p>...genre loading</p>
                                ) : (
                                    allGenre.length ? (
                                        <div className='mt-3'>
                                            <div onClick={() => genreVisible()}
                                                className='flex gap-2 items-center text-2xl text-[var(--text-color)] cursor-pointer my-1 max-w-[260px]'><FaBarsStaggered /> <h4> Janrına görə seriallar</h4></div>
                                            <div ref={genreRef} className='flex flex-wrap genreListHidden'>
                                                <div onClick={() => setAllSeriesData(allData.filter(item => item.isFilm === false))}
                                                    className='bg-[var(--movies-bg)] text-[var(--text-color)] px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>
                                                    Hamısı
                                                </div>
                                                {
                                                    allGenre.map((genre) => (
                                                        <div key={genre.id} onClick={() => getMoviesByGenre(genre.id)}
                                                            className='bg-[var(--movies-bg)] text-[var(--text-color)] px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>
                                                            {genre.name}
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ) : ("")
                                )
                            }

                            <div>
                                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center'>
                                    {
                                        allData.filter(item => item.isFilm === false) ? (
                                            allSeriesData?.map((film, index) => (
                                                <div key={film.id} onClick={() => navigate(`${film.id}`)}
                                                    className={`card-hover max-w-[200px] xs:h-[300px] rounded-[15px] h-[170px] 
                                                    ${!film.isReady ? 'opacity-50 pointer-events-none' : ''}`}  >
                                                    <div className="card">
                                                        <div className="front-img">
                                                            <div className='h-full w-full relative'>
                                                                <img src={"https://englishwithmovies.blob.core.windows.net/movieposter/" + film.posterImgName} />
                                                                <div className='absolute top-0 right-0 text-2xl w-[40px] h-[40px]'>{film.isPremiumFilm ? (
                                                                    <img className='w-full h-full' src={premiumIcon} alt="" />
                                                                ) : ("")}</div>
                                                            </div>
                                                        </div>
                                                        <div className="back-card">
                                                            <img src={"https://englishwithmovies.blob.core.windows.net/movieposter/" + film.posterImgName} />
                                                            <div className="text">
                                                                <span className='flex items-center justify-center mx-auto my-0 text-center font-semibold'>{film.name}</span>
                                                            </div>
                                                            <div className=' w-full p-2 absolute bottom-0 left-0 '>
                                                                <div className='mb-1 px-2 bg-[#f3ce13] inline-block rounded'>
                                                                    <span className=' text-black text-sm font-bold font-["Kanit"]'>IMDb:</span>
                                                                    <span className='ml-1 text-white font-bold'>{film.imdb}</span>
                                                                </div>
                                                                <div className='flex items-center justify-between'>
                                                                    <span
                                                                        className={`px-2 font-['Kanit'] font-semibold text-white rounded
                                                                        ${film?.levelId == 1 ? "bg-[#167323]" : film?.levelId == 2 ? "bg-[#25487a]" : film?.levelId == 3 ? "bg-[#b07212]" : film?.levelId == 4 ? "bg-[#480f7a]" : film?.levelId == 5 ? "bg-[#8a1111]" : "bg-gray-600"}`}>
                                                                        {levelData?.find((data) => data.id == film.levelId).name}
                                                                    </span>
                                                                    <div
                                                                        onClick={(e) => handleFavorites(e, film)}
                                                                        className='text-2xl cursor-pointer text-red-500'>
                                                                        {
                                                                            userFavoritesArray?.find((fav) => fav.id == film.id) ? <FaHeart /> : <FaRegHeart />
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <h1 className='font-["Kanit"]'>Serial yoxdur</h1>
                                        )
                                    }
                                </div>
                            </div>
                        </Container>
                    </div>
                )
            }

        </>

    )
}