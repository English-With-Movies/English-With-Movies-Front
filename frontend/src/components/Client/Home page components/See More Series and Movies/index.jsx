import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';
import { NavLink } from "react-router-dom";
import { useGetForHomePageMoviesQuery } from '../../../../redux/rtk query/Slices/moviesSlice';
import LoaderIcon from '../../../Loaders/Loader';
import { FaRegHeart } from 'react-icons/fa6';
import premiumIcon from "../../../../assets/premium-icon.png"
import { useGetAllLevelQuery } from '../../../../redux/rtk query/Slices/levelSlice';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { userInfoContext } from '../../../../context/UserInfo';
import { useAddToFavoritesUserMutation, useDeleteFromFavoritesUserMutation, useGetByIdUserQuery, useGetFavoriteMoviesUserQuery } from '../../../../redux/rtk query/Slices/userSlice';
import { FaHeart } from 'react-icons/fa';

export default function SeeMore() {
    let navigate = useNavigate()
    let { userInfo } = useContext(userInfoContext)
    let [addToFavoritesUser] = useAddToFavoritesUserMutation()
    let [deleteFromFavoritesUser] = useDeleteFromFavoritesUserMutation()
    let { data: userFavoritesArray, isLoading: userFavIsLoading, refetch: userFavRefech } = useGetFavoriteMoviesUserQuery(userInfo.userId)

    const goToPage = (string) => {
        navigate(`/${string}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    let { data, isLoading, isError, error, refetch } = useGetForHomePageMoviesQuery()
    let { data: levelData, isLoading: levelIsLoading } = useGetAllLevelQuery()

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

    return (
        <>
            {
                isLoading ? (
                    <LoaderIcon />
                ) : (
                    <div className="home-page bg-[var(--bg-color)] text-[var(--text-color)] py-[80px]">
                        <Container>
                            {/* movies */}
                            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                <div className='flex flex-col items-center justify-center text-center'>
                                    <div
                                        className="text-gray-500 hidden sm:block sm:text-2xl flex-col flex font-['Kanit']">
                                        təqdim edilən filmlər
                                    </div>
                                    <div
                                        className="text-gray-500 sm:text-2xl flex-col flex font-['Kanit']">
                                        öyrənmək üçün tələs
                                    </div>
                                    <div className='text-3xl sm:text-6xl font-["Kanit"]'>filmlər</div>
                                    <div
                                        className="text-gray-500 sm:text-2xl font-['Kanit'] leading-7">
                                        sizin üçün seçilmiş
                                    </div>
                                    <div
                                        className="text-gray-500 hidden sm:block sm:text-2xl font-['Kanit'] leading-7">
                                        indi trenddədir
                                    </div>
                                    <button
                                        onClick={() => goToPage("movies")}
                                        className='px-1 sm:px-3 py-1 border-2 rounded-4 border-[#02C9A8] sm:my-3 
                                hover:shadow-[0_0px_20px_0px_#06b6d4] font-["Kanit"]
                                transition-all duration-150 ease-in'>daha çoxu &#62;&#62;</button>
                                </div>
                                {
                                    data.films.map((film, index) => (
                                        <div key={film.id} onClick={() => navigate(`/movies/${film.id}`)}
                                            className={`card-hover max-w-[200px] h-[300px] rounded-[15px] max-[450px]:h-[230px]
                                                ${index == 1 ? 'hidden md:block' : ''}
                                                ${index == 3 ? 'block lg:hidden xl:block' : ''}  
                                                ${index == 4 ? 'hidden md:block lg:hidden' : ''}`}  >
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
                                                        <div className='mb-1 px-2 bg-yellow-400 inline-block rounded'>
                                                            <span className=' text-black text-sm font-bold font-["Kanit"]'>IMDb:</span>
                                                            <span className='ml-1 text-white font-bold'>{film.imdb}</span>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span
                                                                className={`px-2 font-['Kanit'] font-semibold text-white rounded
                                                                ${film?.levelId == 1 ? "bg-lime-600" : film?.levelId == 2 ? "bg-blue-600" : film?.levelId == 3 ? "bg-orange-600" : film?.levelId == 4 ? "bg-purple-600" : film?.levelId == 5 ? "bg-red-600" : "bg-gray-600"}`}>
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
                                }
                            </div>

                            {/* line */}
                            <div className='h-[3px] w-full bg-[var(--movies-bg)] my-5'></div>

                            {/* series */}
                            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                                {
                                    data.series.map((serie, index) => (
                                        <div key={serie.id} onClick={() => navigate(`/series/${serie.id}`)}
                                            className={`card-hover max-w-[200px] h-[300px] rounded-[15px] max-[450px]:h-[230px]
                                                ${index == 1 ? 'hidden md:block' : ''}
                                                ${index == 3 ? 'block lg:hidden xl:block' : ''}  
                                                ${index == 4 ? 'hidden md:block lg:hidden' : ''}`}  >
                                            <div className="card">
                                                <div className="front-img">
                                                    <div className='h-full w-full relative'>
                                                        <img src={"https://englishwithmovies.blob.core.windows.net/movieposter/" + serie.posterImgName} />
                                                        <div className='absolute top-0 right-0 text-2xl w-[40px] h-[40px]'>{serie.isPremiumFilm ? (
                                                            <img className='w-full h-full' src={premiumIcon} alt="" />
                                                        ) : ("")}</div>
                                                    </div>
                                                </div>
                                                <div className="back-card">
                                                    <img src={"https://englishwithmovies.blob.core.windows.net/movieposter/" + serie.posterImgName} />
                                                    <div className="text">
                                                        <span className='flex items-center justify-center mx-auto my-0 text-center font-semibold'>{serie.name}</span>
                                                    </div>
                                                    <div className=' w-full p-2 absolute bottom-0 left-0 '>
                                                        <div className='mb-1 px-2 bg-yellow-400 inline-block rounded'>
                                                            <span className=' text-black text-sm font-bold font-["Kanit"]'>IMDb:</span>
                                                            <span className='ml-1 text-white font-bold'>{serie.imdb}</span>
                                                        </div>
                                                        <div className='flex items-center justify-between'>
                                                            <span
                                                                className={`px-2 font-['Kanit'] font-semibold text-white rounded
                                                                ${serie?.levelId == 1 ? "bg-lime-600" : serie?.levelId == 2 ? "bg-blue-600" : serie?.levelId == 3 ? "bg-orange-600" : serie?.levelId == 4 ? "bg-purple-600" : serie?.levelId == 5 ? "bg-red-600" : "bg-gray-600"}`}>
                                                                {levelData?.find((data) => data.id == serie.levelId).name}
                                                            </span>
                                                            <div
                                                                onClick={(e) => handleFavorites(e, serie)}
                                                                className='text-red-500 text-2xl cursor-pointer'>
                                                                {
                                                                    userFavoritesArray?.find((fav) => fav.id == serie.id) ? <FaHeart /> : <FaRegHeart />
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                }
                                <div className='flex flex-col items-center justify-center text-center'>
                                    <div
                                        className="text-gray-500 hidden sm:block sm:text-2xl flex-col flex font-['Kanit']">
                                        təqdim edilən filmlər
                                    </div>
                                    <div
                                        className="text-gray-500 sm:text-2xl flex-col flex font-['Kanit']">
                                        öyrənmək üçün tələs
                                    </div>
                                    <div className='text-3xl sm:text-6xl font-["Kanit"]'>seriallar</div>
                                    <div
                                        className="text-gray-500 sm:text-2xl font-['Kanit'] leading-7">
                                        sizin üçün seçilmiş
                                    </div>
                                    <div
                                        className="text-gray-500 hidden sm:block sm:text-2xl font-['Kanit'] leading-7">
                                        indi trenddədir
                                    </div>
                                    <button
                                        onClick={() => goToPage("series")}
                                        className='sm:px-3 py-1 border-2 rounded-4 border-[#02C9A8] sm:my-3 
                                hover:shadow-[0_0px_20px_0px_#06b6d4] font-["Kanit"]
                                transition-all duration-150 ease-in'>daha çoxu &#62;&#62;
                                    </button>
                                </div>
                            </div>
                        </Container>
                    </div>
                )
            }
        </>
    )
}