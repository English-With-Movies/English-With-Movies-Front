import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { HiSpeakerWave } from "react-icons/hi2";
import { useContext, useEffect, useRef, useState } from "react";
import { ImBin } from "react-icons/im";
import { FaBarsStaggered, FaRegCircleCheck } from "react-icons/fa6";
import { FaRegEye } from 'react-icons/fa';
import { useNavigate, useParams } from "react-router";
import { useGetByIdMovieQuery } from "../../../redux/rtk query/Slices/moviesSlice";
import LoaderIcon from "../../../components/Loaders/Loader";
import { useGetAllLevelQuery } from "../../../redux/rtk query/Slices/levelSlice";
import premiumIcon from "../../../assets/premium-icon.png"
import { useGetAllGenreQuery } from "../../../redux/rtk query/Slices/genreSlice";
import { userInfoContext } from "../../../context/UserInfo";
import { useAddToFavoritesUserMutation, useDeleteFromFavoritesUserMutation, useGetByIdUserQuery, useGetFavoriteMoviesUserQuery } from "../../../redux/rtk query/Slices/userSlice";
import { useGetByIdSeasonQuery } from "../../../redux/rtk query/Slices/seasonSlice";
import { useGetByIdEpisodeQuery } from "../../../redux/rtk query/Slices/episodeSlice";
import { usePostWordFromKnownWordListMutation } from "../../../redux/rtk query/Slices/knownWordListSlice";
import { IoRocketSharp } from "react-icons/io5";
import MovieTable from "../../../components/Client/Movies Detail Table";
import QuizIcon from "../../../components/Client/Quiz Icon";
import { quizDataContext } from "../../../context/QuizDataContext";

export default function MoviesDetail() {
    // scrool 
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    let { id } = useParams()
    let navigate = useNavigate()

    // user info data
    let { userInfo } = useContext(userInfoContext)
    let { data: userAllData } = useGetByIdUserQuery(userInfo.userId)

    // favorites 
    let [addToFavoritesUser] = useAddToFavoritesUserMutation()
    let [deleteFromFavoritesUser] = useDeleteFromFavoritesUserMutation()
    let { data: userFavoritesArray, isLoading: userFavIsLoading, refetch: userFavRefech } = useGetFavoriteMoviesUserQuery(userInfo.userId)

    // add to and delete from knownList
    let [postWordFromKnownWordList] = usePostWordFromKnownWordListMutation()

    // detail data
    let { data, isLoading, isError, error } = useGetByIdMovieQuery(id)
    useEffect(() => {
        if (isError) {
            console.log(error);
        }
    }, [isError, error])

    // movie genre
    let [movieGenresName, setMovieGenresName] = useState()
    let { data: allGenre, isLoading: genreLoading } = useGetAllGenreQuery()

    // words in table
    let { data: seasonData } = useGetByIdSeasonQuery(data?.seasons[0].id)
    let { data: episodesData, isLoading: episodeIsLoading } = useGetByIdEpisodeQuery(seasonData?.episodes[0].id)
    let [wordList, setWordList] = useState([])
    useEffect(() => {
        if (!episodeIsLoading && episodesData) {
            setWordList(episodesData?.episodeWords)
        }
    }, [episodesData])

    // movie level
    let { data: levelData, isLoading: levelIsLoading } = useGetAllLevelQuery()
    let [movieLevel, setMovieLevel] = useState()
    useEffect(() => {
        if (!isLoading && !levelIsLoading) {
            setMovieLevel(levelData?.find((level) => level.id == data.levelId))
        }
    }, [isLoading, levelIsLoading])

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
        const filteredWords = selectedLevels?.length ? episodesData?.episodeWords.filter((value) => selectedLevels.includes(value.word.levelId)) : wordList;
        setWordList(filteredWords);
    }, [selectedLevels, checkboxStates])

    // add to and delete from fav
    const handleFavorites = async (e, data) => {
        e.stopPropagation();
        if (userInfo.userId) {
            let finded = userFavoritesArray?.find((fav) => fav.id === data.id)
            if (finded) {
                await deleteFromFavoritesUser({ userId: userInfo.userId, movieId: data.id });
                userFavRefech()
            } else {
                await addToFavoritesUser({ userId: userInfo.userId, movieId: data.id });
                userFavRefech()
            }
        } else {
            navigate("/login")
        }
    }

    // movie genre filter
    function getGenreNamesByMovieGenres(movieGenres, allGenres) {
        return movieGenres
            .map(movieGenre => {
                const genre = allGenres?.find(genre => genre.id === movieGenre.genreId);
                return genre ? genre.name : null;
            })
            .filter(name => name !== null);
    }

    // movies genres name
    useEffect(() => {
        if (!genreLoading && !isLoading) {
            const genreNames = getGenreNamesByMovieGenres(data.movieGenres, allGenre);
            setMovieGenresName(genreNames);
        }
    }, [genreLoading, isLoading, data, allGenre]);

    // add to and delete from known word list
    const underlineWord = async (word) => {
        // console.log(word.wordId);
        // add list

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
                                            movieGenresName?.length ? (
                                                movieGenresName?.map((genre, index) => (
                                                    <span key={index} className="mx-1 font-['Kanit'] px-2 bg-gray-600 rounded text-white">
                                                        {genre}
                                                    </span>
                                                ))
                                            ) : ('')
                                        }
                                    </div>
                                    <div className="my-1 flex items-center">
                                        <div className="text-xl font-['Kanit'] mr-3"><span className="bg-yellow-300 text-black font-bold text-lg px-2 ">IMBd</span> {data.imdb}</div>
                                        <div
                                            onClick={(e) => handleFavorites(e, data)}
                                            className='text-2xl cursor-pointer text-red-500'>
                                            {
                                                userFavoritesArray?.find((fav) => fav.id == data.id) ? <FaHeart /> : <FaRegHeart />
                                            }
                                        </div>
                                    </div>
                                    <p>{data.description} </p>
                                </div>
                            </div>
                        </div>
                        <Container>
                            {
                                userInfo ? (
                                    userAllData?.subscriptionId == 1 ? (
                                        !data?.isPremiumFilm ? (
                                            <div className="items-center flex flex-col justify-center pb-5">
                                                <h4>Premium istifadəçilər üçündür</h4>
                                                <h4
                                                    onClick={() => navigate('/premium')}
                                                    className='cursor-pointer p-3 rounded-4 transition-all duration-200 ease-in flex items-center justify-center hover:shadow-[0_0px_20px_0px_yellow] cursor-pointer my-2 bg-[var(--movies-bg)]'>PREMİUM OL!</h4>
                                            </div>
                                        ) : (
                                            <MovieTable checkboxStates={checkboxStates} wordList={wordList} setWordList={setWordList} setCheckboxStates={setCheckboxStates} setSelectedLevels={setSelectedLevels} />
                                        )
                                    ) : (
                                        <MovieTable checkboxStates={checkboxStates} wordList={wordList} setWordList={setWordList} setCheckboxStates={setCheckboxStates} setSelectedLevels={setSelectedLevels} />
                                    )
                                ) : (
                                    !data?.isPremiumFilm ? (
                                        <div className="items-center flex flex-col justify-center pb-5">
                                            <h4>Premium istifadəçilər üçündür</h4>
                                            <h4
                                                onClick={() => navigate('/premium')}
                                                className='cursor-pointer p-3 rounded-4 transition-all duration-200 ease-in flex items-center justify-center hover:shadow-[0_0px_20px_0px_yellow] cursor-pointer my-2 bg-[var(--movies-bg)]'>PREMİUM OL!</h4>
                                        </div>
                                    ) : (
                                        <MovieTable checkboxStates={checkboxStates} wordList={wordList} setWordList={setWordList} setCheckboxStates={setCheckboxStates} setSelectedLevels={setSelectedLevels} />
                                    )
                                )
                            }
                        </Container>



                        {
                            userInfo ? (
                                userAllData?.subscriptionId == 1 ? (
                                    !data?.isPremiumFilm ? (
                                        <></>
                                    ) : (
                                        <QuizIcon wordList={wordList} />
                                    )
                                ) : (
                                    <QuizIcon wordList={wordList} />
                                )
                            ) : (
                                !data?.isPremiumFilm ? (
                                    <></>
                                ) : (
                                    <QuizIcon wordList={wordList} />
                                )
                            )
                        }
                    </div>
                )
            }
        </>
    )
}