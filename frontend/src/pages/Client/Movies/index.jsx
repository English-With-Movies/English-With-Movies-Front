import { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { TiArrowUnsorted } from "react-icons/ti";
import { MdOutlineArrowDownward, MdOutlineArrowUpward } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Helmet } from 'react-helmet';

export default function MoviesPage() {
    let sortRef = useRef()

    const handleFavorites = () => {
        // let findFavorites = favorites.find((fav) => fav.id == item.id)
    }

    return (
        <>
            <Helmet>
                <title>Filmlər</title>
            </Helmet>

            <div className="movies-page py-5 bg-[var(--bg-color)] text-white">
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
                            transition-all duration-200 ease-in shadow-[0_0px_10px_0px_#fff] handleBars'
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

                    <div className='flex gap-2 flex-col md:grid md:grid-cols-[1fr_2fr] py-5'>
                        <div>
                            <div className='flex gap-2 items-center text-2xl text-[var(--text-color)]'><FaBarsStaggered /><h4> Janrına görə filmlər</h4></div>
                            <div className='flex flex-wrap'>
                                <div
                                    className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Qorxulu</div>
                                <div
                                    className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Qorxulu</div>
                                <div
                                    className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Qorxulu</div>
                                <div
                                    className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Qorxulu</div>
                                <div
                                    className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Qorxulu</div>
                                <div
                                    className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Qorxulu</div>
                                <div
                                    className='bg-[var(--movies-bg)] text-[var(--text-color)] 
                                            px-2 py-1 text-lg font-semibold m-1 rounded-3 cursor-pointer'>Qorxulu</div>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 min-[450px]:grid-cols-3 lg:grid-cols-4 gap-4 '>
                            <div className='relative film-hover'>
                                <img src="https://diziyleogren.com/img/12-angry-men.b952a9ef.jpg" className='w-full h-full' />
                                <div className='absolute top-0 w-full h-full '>
                                    <div className='w-full flex items-center justify-center hover-about'>
                                        <h4 className='text-center'>12 Angry Man</h4>
                                        <div className='m-2 absolute top-0 left-0'>KOLAY</div>
                                        <div className='m-2 w-full absolute bottom-0 flex items-center justify-between'>
                                            <div>IMDB: 9.9</div>
                                            <div
                                                onClick={() => handleFavorites()}
                                                className='text-red-500 text-2xl cursor-pointer'>
                                                {/* {favorites.find((fav) => fav.id === item.id) ? <FaHeart/> : <FaRegHeart />} */}
                                                <FaRegHeart />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>

    )
}