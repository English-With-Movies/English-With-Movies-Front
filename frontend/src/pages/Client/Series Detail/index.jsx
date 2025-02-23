import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useGetByIdMovieQuery } from "../../../redux/rtk query/Slices/moviesSlice";
import { useGetAllLevelQuery } from "../../../redux/rtk query/Slices/levelSlice";
import LoaderIcon from "../../../components/Loaders/Loader";
import premiumIcon from "../../../assets/premium-icon.png"
import { userInfoContext } from "../../../context/UserInfo";
import { useAddToFavoritesUserMutation, useDeleteFromFavoritesUserMutation, useGetByIdUserQuery, useGetFavoriteMoviesUserQuery } from "../../../redux/rtk query/Slices/userSlice";
import { useGetAllGenreQuery } from "../../../redux/rtk query/Slices/genreSlice";
import { useGetByIdSeasonQuery } from "../../../redux/rtk query/Slices/seasonSlice";
import { useGetByIdEpisodeQuery } from "../../../redux/rtk query/Slices/episodeSlice";
import * as React from 'react';
import SerieTable from "../../../components/Client/Series Detail Table";

export default function SeriesDetail() {
    const [season, setSeason] = React.useState('');
    const handleChangeSeason = (event) => {
        setSeason(event.target.value);
    };
    const [episode, setEpisode] = React.useState('');
    const handleChangeEpisode = (event) => {
        setEpisode(event.target.value);
    };

    // scrool
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    let { id } = useParams()
    let navigate = useNavigate()
    // detail data
    let { data, isLoading } = useGetByIdMovieQuery(id)

    // user info data
    let { userInfo } = useContext(userInfoContext)
    let { data: userAllData } = useGetByIdUserQuery(userInfo.userId)

    // favorites
    let [addToFavoritesUser] = useAddToFavoritesUserMutation()
    let [deleteFromFavoritesUser] = useDeleteFromFavoritesUserMutation()
    let { data: userFavoritesArray, isLoading: userFavIsLoading, refetch: userFavRefech } = useGetFavoriteMoviesUserQuery(userInfo.userId)

    // movie genre
    let [movieGenresName, setMovieGenresName] = useState()
    let { data: allGenre, isLoading: genreLoading } = useGetAllGenreQuery()

    // words in table
    let { data: seasonData } = useGetByIdSeasonQuery(season, { skip: !season });
    let { data: episodesData } = useGetByIdEpisodeQuery(episode, { skip: !episode })
    let [wordList, setWordList] = useState([])
    useEffect(() => {
        setWordList(episodesData?.episodeWords)
    }, [episodesData])


    // movie level
    let { data: levelData, isLoading: levelIsLoading } = useGetAllLevelQuery()
    let [movieLevel, setMovieLevel] = useState()
    useEffect(() => {
        if (!isLoading && !levelIsLoading) {
            setMovieLevel(levelData.find((level) => level.id == data.levelId))
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
        const filteredWords = selectedLevels.length ? episodesData?.episodeWords?.filter((value) => selectedLevels.includes(value.word.levelId)) : wordList;
        setWordList(filteredWords);
    }, [selectedLevels])

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
                                            ${data.levelId == 1 ? "bg-[#167323]" : data.levelId == 2 ? "bg-[#25487a]" : data.levelId == 3 ? "bg-[#b07212]" : data.levelId == 4 ? "bg-[#480f7a]" : data.levelId == 5 ? "bg-[#8a1111]" : "bg-gray-600"}`}>
                                            {movieLevel?.name}
                                        </span>
                                        <div className='ml-1 text-2xl w-[30px] h-[30px]'>{data.isPremiumFilm ? (
                                            <img className='w-full h-full' src={premiumIcon} alt="" />
                                        ) : ("")}</div>
                                    </div>
                                    <div className="mb-3">
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
                                        <div className="text-xl font-['Kanit'] mr-3">
                                            <span className="bg-[#f3ce13] text-black font-bold text-lg px-2 ">IMDb</span> {data.imdb}</div>
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
                                        data?.isPremiumFilm ? (
                                            <div className="items-center flex flex-col justify-center pb-5">
                                                <h4 className="text-[var(--text-color)]">Premium istifadəçilər üçündür</h4>
                                                <h4
                                                    onClick={() => navigate('/premium')}
                                                    className='cursor-pointer p-3 rounded-4 transition-all duration-200 ease-in flex items-center justify-center hover:shadow-[0_0px_20px_0px_yellow] cursor-pointer my-2 bg-[var(--movies-bg)] text-[var(--text-color)]'>PREMİUM OL!</h4>
                                            </div>
                                        ) : (
                                            <SerieTable season={season} handleChangeSeason={handleChangeSeason} data={data} episode={episode} handleChangeEpisode={handleChangeEpisode} seasonData={seasonData} wordList={wordList} setWordList={setWordList} checkboxStates={checkboxStates} setCheckboxStates={setCheckboxStates} />
                                        )
                                    ) : (
                                        <SerieTable season={season} handleChangeSeason={handleChangeSeason} data={data} episode={episode} handleChangeEpisode={handleChangeEpisode} seasonData={seasonData} wordList={wordList} setWordList={setWordList} checkboxStates={checkboxStates} setCheckboxStates={setCheckboxStates} />
                                    )
                                ) : (
                                    data?.isPremiumFilm ? (
                                        <div className="items-center flex flex-col justify-center pb-5">
                                            <h4>Premium istifadəçilər üçündür</h4>
                                            <h4
                                                onClick={() => navigate('/premium')}
                                                className='cursor-pointer p-3 rounded-4 transition-all duration-200 ease-in flex items-center justify-center hover:shadow-[0_0px_20px_0px_yellow] cursor-pointer my-2 bg-[var(--movies-bg)] text-[var(--text-color)]'>PREMİUM OL!</h4>
                                        </div>
                                    ) : (
                                        <SerieTable season={season} handleChangeSeason={handleChangeSeason} data={data} episode={episode} handleChangeEpisode={handleChangeEpisode} seasonData={seasonData} wordList={wordList} setWordList={setWordList} checkboxStates={checkboxStates} setCheckboxStates={setCheckboxStates} />
                                    )
                                )
                            }
                        </Container >
                    </div >
                )
            }

        </>

    )
}