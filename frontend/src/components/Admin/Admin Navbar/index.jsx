import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaBars, FaUserCircle, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useGetByIdUserQuery } from '../../../redux/rtk query/Slices/userSlice';
import { userInfoContext } from '../../../context/UserInfo';
import { useGetByIdAvatarQuery } from '../../../redux/rtk query/Slices/avatarSlice';
import { useGetByIdFrameQuery } from '../../../redux/rtk query/Slices/frameSlice';
import { NavLink, useNavigate } from 'react-router';
export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
    let navigate = useNavigate()
    const [isScrolled, setIsScrolled] = useState(false);
    const adminNavRef = useRef(null);
    let hiddenRef = useRef()
    const handleDisplay = (e) => {
        e.stopPropagation()
        hiddenRef.current.classList.toggle("handleBars")
    }
    let { userInfo, setUserInfo } = useContext(userInfoContext)
    let { data } = useGetByIdUserQuery(userInfo?.userId)
    let { data: avatarData } = useGetByIdAvatarQuery(data?.avatarId)
    let frameId = null;
    if (data?.userFrames?.length) {
        const currentFrame = data.userFrames.find((value) => value.isCurrent);
        frameId = currentFrame ? currentFrame.frameId : null;
    }
    let { data: frame } = useGetByIdFrameQuery(frameId);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const logOut = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setUserInfo({})
        navigate("/")
    }

    return (
        <div className='py-[1rem]'>
            <nav
                className={`mx-[1rem] bg-gray-800 text-white flex justify-between items-center p-3 rounded-5 ${isScrolled ? 'fixed top-0 opacity-90' : ''}`}
                ref={adminNavRef}
                style={{ width: isScrolled ? 'calc(100% - 2rem)' : '' }}
            >
                <div></div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
                        <FaBars />
                    </button>
                    <div className="user-logo text-cyan-500 text-3xl relative">
                        <div onClick={(e) => handleDisplay(e)} className='user-logo text-cyan-500 text-3xl cursor-pointer relative flex items-center justify-center w-[40px] h-[40px]'>
                            <img className='w-[75%] h-[75%] rounded-full object-cover z-0' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatarData?.imgName}`} alt="profile" />
                            <div
                                key={frame?.id}
                                className="absolute w-full h-full bg-cover bg-center z-10"
                                style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${frame?.imgName}')` }}
                            ></div>
                        </div>
                        <div ref={hiddenRef} className='py-2 absolute top-[100%] -left-[100px] shadow-[0_8px_24px_rgba(149,157,165,0.1)] bg-[var(--bg-color)] z-10 w-[150px] rounded-4 transition-all ease-in duration-200 handleBars'>
                            <>
                                <NavLink
                                    to="/my-profile"
                                    className="no-underline font-['PT_Serif']"
                                    style={({ isActive }) => {
                                        return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                    }}
                                >
                                    <span className='text-lg px-3'>Profilim </span>
                                </NavLink>
                                <NavLink
                                    to="/manage"
                                    className="no-underline font-['PT_Serif']"
                                    style={({ isActive }) => {
                                        return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                    }}
                                >
                                    <span className='text-lg px-3'>Admin</span>
                                </NavLink>
                                <div className='h-[2px] w-full bg-black'></div>
                                <span onClick={() => logOut()} className='cursor-pointer text-lg px-3 text-[var(--text-color)] font-["PT_Serif"]'>Çıxış et </span>
                            </>
                        </div>
                    </div>
                    <button onClick={() => navigate('/')} className="text-2xl">
                        <FaHome />
                    </button>
                </div>
            </nav>
        </div>
    )
}