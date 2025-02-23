import Container from "react-bootstrap/esm/Container";
import { Helmet } from "react-helmet";
import { useDeleteFromFavoritesUserMutation, useGetAllUserQuery, useGetFavoriteBlogsUserQuery, useGetFavoriteMoviesUserQuery } from "../../../redux/rtk query/Slices/userSlice";
import { useContext, useEffect, useState } from "react";
import { userInfoContext } from "../../../context/UserInfo";
import premiumIcon from "../../../assets/premium-icon.png"
import { useGetAllLevelQuery } from "../../../redux/rtk query/Slices/levelSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import LoaderIcon from "../../../components/Loaders/Loader";
import { useNavigate } from "react-router";
import { useGetAllAvatarQuery } from "../../../redux/rtk query/Slices/avatarSlice";
import { useGetAllFrameQuery } from "../../../redux/rtk query/Slices/frameSlice";
import moment from 'moment';

export default function UserFavoritesPage() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    let navigate = useNavigate()
    let { data: allUsers } = useGetAllUserQuery()
    let { data: allAvatar } = useGetAllAvatarQuery()
    let { data: allFrame } = useGetAllFrameQuery();
    let { userInfo } = useContext(userInfoContext)
    let { data: levelData } = useGetAllLevelQuery()
    let { data: userFavoritesArray, isLoading: userFavIsLoading, refetch: userFavRefech } = useGetFavoriteMoviesUserQuery(userInfo?.userId)
    let { data: userFavoritesBlogs, isLoading: userFavBlogIsLoading, refetch: userFavBlogRefech } = useGetFavoriteBlogsUserQuery(userInfo?.userId)
    let [favorites, setFavorites] = useState([])
    let [deleteFromFavoritesUser] = useDeleteFromFavoritesUserMutation()

    useEffect(() => {
        if (!userFavIsLoading && userFavoritesArray) {
            setFavorites(userFavoritesArray.filter((movies) => movies.isFilm == true))
        }
    }, [userFavIsLoading, userFavoritesArray])
    // go to detail
    const handleNavigate = (id) => {
        const clicked = favorites.find((fav) => fav.id == id)
        navigate(clicked?.isFilm ? `/movies/${id}` : `/series/${id}`);
    }
    // delete fav
    const handleFavorites = async (e, movie) => {
        e.stopPropagation();
        if (userInfo?.userId) {
            let finded = userFavoritesArray?.find((fav) => fav.id === movie.id)
            if (finded) {
                await deleteFromFavoritesUser({ userId: userInfo.userId, movieId: movie.id });
                userFavRefech()
            }
        } else {
            navigate("/login")
        }
    }

    if (userFavIsLoading) return <LoaderIcon />;
    return (
        <>
            <Helmet>
                <title>Favoritlər</title>
            </Helmet>
            <div className="pt-[103px] bg-[var(--bg-color)] text-[var(--text-color)]">
                <div className="py-3">
                    <Container>
                        <div className="flex items-center gap-2">
                            <span onClick={() => setFavorites(userFavoritesArray.filter((movies) => movies.isFilm == true))} className="py-1 px-2 bg-gray-500 font-['Kanit'] rounded text-white cursor-pointer text-xl">Filmlər</span>
                            <span onClick={() => setFavorites(userFavoritesArray.filter((movies) => movies.isFilm == false))} className="py-1 px-2 bg-gray-500 font-['Kanit'] rounded text-white cursor-pointer text-xl">Seriallar</span>
                            <span onClick={() => setFavorites(userFavoritesBlogs)} className="py-1 px-2 bg-gray-500 font-['Kanit'] rounded text-white cursor-pointer text-xl">Bloglar</span>
                        </div>
                        <div className="pt-4">
                            {
                                favorites?.length > 0 ? (
                                    favorites[0]?.posterImgName ? (
                                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center'>
                                            {
                                                favorites.map((fav) => (
                                                    <div onClick={() => handleNavigate(fav.id)} key={fav.id}
                                                        className={`card-hover max-w-[200px] xs:h-[300px] rounded-[15px] h-[240px] `}  >
                                                        <div className="card">
                                                            <div className="front-img">
                                                                <div className='h-full w-full relative'>
                                                                    <img src={"https://englishwithmovies.blob.core.windows.net/movieposter/" + fav.posterImgName} />
                                                                    <div className='absolute top-0 right-0 text-2xl w-[40px] h-[40px]'>{fav.isPremiumFilm ? (
                                                                        <img className='w-full h-full' src={premiumIcon} alt="" />
                                                                    ) : ("")}</div>
                                                                </div>
                                                            </div>
                                                            <div className="back-card">
                                                                <img src={"https://englishwithmovies.blob.core.windows.net/movieposter/" + fav.posterImgName} />
                                                                <div className="text">
                                                                    <span className='flex items-center justify-center mx-auto my-0 text-center font-semibold'>{fav.name}</span>
                                                                </div>
                                                                <div className=' w-full p-2 absolute bottom-0 left-0 '>
                                                                    <div className='mb-1 px-2 bg-yellow-400 inline-block rounded'>
                                                                        <span className=' text-black text-sm font-bold font-["Kanit"]'>IMDb:</span>
                                                                        <span className='ml-1 text-white font-bold'>{fav.imdb}</span>
                                                                    </div>
                                                                    <div className='flex items-center justify-between'>
                                                                        <span
                                                                            className={`px-2 font-['Kanit'] font-semibold text-white rounded
                                                                                    ${fav?.levelId == 1 ? "bg-lime-600" : fav?.levelId == 2 ? "bg-blue-600" : fav?.levelId == 3 ? "bg-orange-600" : fav?.levelId == 4 ? "bg-purple-600" : fav?.levelId == 5 ? "bg-red-600" : "bg-gray-600"}`}>
                                                                            {levelData?.find((data) => data.id == fav.levelId).name}
                                                                        </span>
                                                                        <div
                                                                            onClick={(e) => handleFavorites(e, fav)}
                                                                            className='text-2xl cursor-pointer text-red-500'>
                                                                            {
                                                                                userFavoritesArray?.find((value) => value.id == fav.id) ? <FaHeart /> : <FaRegHeart />
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
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center py-[45px]">
                                            {userFavoritesBlogs?.map((blog) => {
                                                let user = allUsers?.find(user => user.id === blog?.authorId);
                                                let userPhoto = allAvatar?.find(avatar => avatar.id === user?.avatarId);
                                                let time = moment.utc(blog?.createdAt.split('.')[0]).local().fromNow();
                                                return (
                                                    <div key={blog.id}
                                                        onClick={() => { navigate(`/blog/${blog.id}`) }}
                                                        className="cursor-pointer p-3 rounded-4 bg-[var(--movies-bg)] transition-all duration-250 ease-in hover:shadow-gray-500 hover:shadow-lg">

                                                        <h3 className="font-['Kanit'] text-sm md:text-xl">{blog.title}</h3>

                                                        <div className="flex gap-2 justify-end">
                                                            <div className="flex flex-col items-end justify-center">
                                                                <span className="font-['PT_Serif'] text-sm md:text-md">{user?.userName}</span>
                                                                <span className="font-['PT_Serif'] text-sm md:text-md">{time}</span>
                                                            </div>

                                                            <div className='relative flex items-center justify-center w-[65px] h-[65px]'>
                                                                <img className='w-[75%] h-[75%] rounded-full object-cover z-0 object-center'
                                                                    src={`https://englishwithmovies.blob.core.windows.net/avatar/${userPhoto?.imgName}`}
                                                                    alt="profile" />

                                                                {user?.userFrames?.map((frame) => {
                                                                    if (frame.isCurrent) {
                                                                        let userFrame = allFrame?.find((value) => value.id === frame.frameId);
                                                                        return (
                                                                            <div key={frame.frameId}
                                                                                className="absolute w-full h-full bg-cover bg-center z-10"
                                                                                style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${userFrame?.imgName}')` }}>
                                                                            </div>
                                                                        );
                                                                    }
                                                                    return null;
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )
                                ) : (
                                    <div className="flex items-center justify-center w-full h-[40vh]">
                                        <h1 className="font-['Kanit']">Sizin favoriniz yoxdur</h1>
                                    </div>
                                )
                            }
                        </div>
                    </Container>
                </div>
            </div>
        </>
    )
}