import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { TiArrowUnsorted } from "react-icons/ti";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Helmet } from 'react-helmet';
import { useGetAllMoviesQuery } from '../../../redux/rtk query/Slices/moviesSlice';
import premiumIcon from "../../../assets/premium-icon.png"
import { useGetAllLevelQuery } from '../../../redux/rtk query/Slices/levelSlice';


export default function MoviesPage() {
    let sortRef = useRef()
    let genreRef = useRef()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const handleFavorites = () => {
        // let findFavorites = favorites.find((fav) => fav.id == item.id)
    }
    const genreVisible = () => {
        genreRef.current.classList.toggle("genreListVisible")
    }

    let { data: allData, isLoading, isError, error } = useGetAllMoviesQuery()
    console.log(allData);
    let { data: levelData, isLoading: levelIsLoading } = useGetAllLevelQuery()
    let [movieLevel, setMovieLevel] = useState()
    useEffect(() => {
        if (!isLoading && !levelIsLoading) {
            setMovieLevel(levelData.find((level) => level.id == allData.levelId))
        }
    }, [isLoading, levelIsLoading])
    console.log(movieLevel);


    return (
        <>
            <Helmet>
                <title>Filmlər</title>
            </Helmet>

            <div className="movies-page py-3 bg-[var(--bg-color)] text-white mt-[103px]">
                <Container>
                    <div className="text-[var(--text-color)]">
                        <h1>İngiliscə Filmlərdə İstifadə Olunan Sözlər və Mənaları</h1>
                        <div className='bg-[var(--movies-bg)] p-3 series-about-wrapper mt-4'>
                            <p className='text-lg'>
                                Artık filmleri altyazısız izleyebileceksin. Nasıl mı? Öncelikle ingilizce düzeyine göre aşağıdaki filmlerden birini seç. Yeni başlayanlar için biz Çok Kolay seviyesindeki filmleri öneriyoruz. Ardından o filmde kullanılan tüm kelimeler ve anlamları karşına gelecek. Burada istersen seçtiğin filmde kullanılan tüm kelimelere çalışabilirsin veya zorluk barını kullanarak istediğin seviyedeki kelimelere çalışabilirsin. Diyelim sadece zor kelimelere çalışmak istiyorsun. Bar çubuğunu kaydırarak Zor seviyesine getir ve Quiz'i başlat. 1000 kelime var tek seferde nasıl bitireyim? Diyorsan üye olup quiz de daha sonra kaldığın yerden devam edebilirsin. Ayrıca kendi kelime listelerini oluşturup arkadaşlarınla paylaşabilirsin. İyi Çalışmalar :)
                            </p>
                            <div className='flex gap-4 items-center'>
                                <input
                                    title='search'
                                    placeholder='Serial axtarın'
                                    type="text"
                                    className='w-full border-2 border-[#fff] py-1 px-3 placeholder:text-[var(--text-color)] placeholder:opacity-70
                        focus:outline-none focus:shadow-[0_0px_5px_0px_#fff]' />

                                <div className='relative'>
                                    <button onClick={() => sortRef.current.classList.toggle("handleBars")} title='Sort' className='flex items-center justify-center text-xl px-3 py-1 rounded-5 hover:shadow-[0_0px_5px_0px_#fff]'>Sıralama: <TiArrowUnsorted /></button>
                                    <ul
                                        className='absolute top-[100%] rounded-4 bg-white text-black opacity-90 w-full 
                            transition-all duration-200 ease-in handleBars'
                                        ref={sortRef}>
                                        <li data-value="1"
                                            className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 cursor-pointer'>Default</li>
                                        <li data-value="1"
                                            className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 cursor-pointer'>A-Z</li>
                                        <li data-value="2"
                                            className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 cursor-pointer'>Z-A</li>
                                        <li data-value="3"
                                            className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 flex items-center cursor-pointer'>
                                            IMDB <MdOutlineArrowUpward />
                                        </li>
                                        <li data-value="3"
                                            className='hover:bg-[#91d1dec0] rounded-4 ml-[-32px] p-1 flex items-center cursor-pointer'>
                                            IMDB <MdOutlineArrowDownward />
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div onClick={() => genreVisible()}
                            className='flex gap-2 items-center text-2xl text-[var(--text-color)] cursor-pointer my-1 max-w-[260px]'><FaBarsStaggered /> <h4> Janrına görə filmlər</h4></div>
                        <div ref={genreRef}
                            className='flex flex-wrap genreListHidden'>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Drama</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Komediya</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Romantik</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Aksiyon</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Macəra</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Elmi-fantastika</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Qorxu</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Triller</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Fantaziya</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Cinayət</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Bioqrafiya</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Sənədli</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Musiqili</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Müharibə</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Ailə</div>
                            <div
                                className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Animasiya</div>
                        </div>
                    </div>

                    <div>
                        <div className='grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center'>
                            {
                                allData?.map((film, index) => (
                                    film.isFilm ? (
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
                                                                onClick={() => handleFavorites()}
                                                                className='text-red-500 text-2xl cursor-pointer'>
                                                                {/* {favorites.find((fav) => fav.id === item.id) ? <FaHeart /> : <FaRegHeart />} */}
                                                                <FaRegHeart />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                ))
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </>

    )
}