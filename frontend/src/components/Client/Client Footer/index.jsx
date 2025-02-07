import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FaArrowUp, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function UserFooter() {
    return (
        <div className="py-[70px] px-[30px] bg-no-repeat bg-cover bg-[var(--movies-bg)] text-[var(--text-color)] footer-bg">
            <div className='max-w-[900px] mx-auto my-0'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4>BLOG:</h4>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}>
                            <span>Dizi İzleyerek İngilizce Öğrenmek Ayrıntılı Rehber</span>
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}>
                            <span>Dizi İzleyerek İngilizce Öğrenmek Ayrıntılı Rehber</span>
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}>
                            <span>Dizi İzleyerek İngilizce Öğrenmek Ayrıntılı Rehber</span>
                        </NavLink>
                    </div>
                    <div>
                        <h4>ƏLAQƏ:</h4>
                        <h5>SOSİAL HESABLAR</h5>
                        <div className='text-2xl flex gap-3'>
                            <span className='cursor-pointer hover:text-[#06b6d4]' onClick={() => window.open('https://www.facebook.com', '_blank')}>
                                <FaFacebook />
                            </span>
                            <span className='cursor-pointer hover:text-[#06b6d4]' onClick={() => window.open('https://www.instagram.com', '_blank')}><FaInstagram /></span>
                            <span className='cursor-pointer hover:text-[#06b6d4]' onClick={() => window.open('https://www.linkedin.com', '_blank')}><FaLinkedinIn /></span>
                            <span className='cursor-pointer hover:text-[#06b6d4]' onClick={() => window.open('https://www.x.com', '_blank')}><FaXTwitter /></span>

                        </div>
                    </div>
                </div>
                <div className='h-[0.1px] w-full bg-white my-4'></div>
                <div>
                    <h4>HAQQIMIZDA:</h4>
                    <p>Diziyle Öğren İngilizce öğrenmek için dizi ve film izleyenlere yönelik olarak 2019'da kurulmuş olan bir platformdur. Ziyaretçilerimiz istedikleri bir dizi veya filmde kullanılan tüm kelimeleri sitemizden veya mobil uygulamamızdan öğrenebilir. Detaylı bilgi</p>
                </div>
            </div>
            {/* fixed arrow */}
            <div className='z-index-10 bg-blue-400 fixed right-[5%] bottom-[5%] w-12 h-12 rounded-full items-center justify-center flex text-xl text-white cursor-pointer'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <FaArrowUp />
            </div>
        </div>
    )
}