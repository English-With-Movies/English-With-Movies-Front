import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { FaArrowUp, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { HiArrowLongUp } from "react-icons/hi2";
import { BsArrowUp } from "react-icons/bs";
import { useEffect, useRef } from 'react';
import { useGetSettingsByKeyQuery } from '../../../redux/rtk query/Slices/settingsSlice';

export default function UserFooter() {
    let { data: footer } = useGetSettingsByKeyQuery('aboutUs')
    let { data: facebook } = useGetSettingsByKeyQuery('facebook')
    let { data: instagram } = useGetSettingsByKeyQuery('instagram')
    let { data: linkedIn } = useGetSettingsByKeyQuery('linkedIn')
    let { data: twitter } = useGetSettingsByKeyQuery('twitter')

    let upArrowRef = useRef()
    useEffect(() => {
        const handleScroll = () => {
            if (!upArrowRef.current) return;
            if (window.scrollY < 530) {
                upArrowRef.current.classList.add("hidden");
            } else {
                upArrowRef.current.classList.remove("hidden");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="p-[30px] bg-no-repeat bg-cover bg-[var(--movies-bg)] text-[var(--text-color)] footer-bg">
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
                            <span>Bütün bloglardan xəbərdar olun</span>
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}>
                            <span>Digər istifadəçilərin bloglarını oxuyun</span>
                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline font-['PT_Serif'] block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}>
                            <span>Öz blogunuzu yaradın</span>
                        </NavLink>
                    </div>
                    <div>
                        <h4>ƏLAQƏ:</h4>
                        <h5>SOSİAL HESABLAR</h5>
                        <div className='text-2xl flex gap-3'>
                            <span className='cursor-pointer hover:text-[#06b6d4]' onClick={() => window.open(`${facebook?.value}`, '_blank')}>
                                <FaFacebook />
                            </span>
                            <span className='cursor-pointer hover:text-[#06b6d4]' onClick={() => window.open(`${instagram?.value}`, '_blank')}><FaInstagram /></span>
                            <span className='cursor-pointer hover:text-[#06b6d4]' onClick={() => window.open(`${linkedIn?.value}`, '_blank')}><FaLinkedinIn /></span>
                            <span className='cursor-pointer hover:text-[#06b6d4]' onClick={() => window.open(`${twitter?.value}`, '_blank')}><FaXTwitter /></span>

                        </div>
                    </div>
                </div>
                <div className='h-[0.1px] w-full bg-white my-4'></div>
                <div>
                    <h4>HAQQIMIZDA:</h4>
                    <p>{footer?.value}</p>
                </div>
            </div>
            {/* fixed arrow */}
            <div ref={upArrowRef}
                className='z-index-10 border-2 border-solid border-blue-500 p-[25px] sm:p-[40px] fixed right-[5%] bottom-[3%] w-12 h-12 rounded-full items-center justify-center flex flex-col text-white cursor-pointer transition-all duration-250 ease-in hover:bg-blue-500/[.3] fixed-arrow hidden'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <span className='text-3xl text-[var(--text-color)]'><BsArrowUp /></span>
            </div>
        </div>
    )
}