import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import ThemeButton from '../Theme Button';
import { useContext, useEffect, useRef } from 'react';
import { FaBars } from "react-icons/fa6";
import { userInfoContext } from '../../../context/UserInfo';
import { useGetByIdUserQuery } from '../../../redux/rtk query/Slices/userSlice';
import { useGetByIdAvatarQuery } from '../../../redux/rtk query/Slices/avatarSlice';
import { useGetSettingsByKeyQuery } from '../../../redux/rtk query/Slices/settingsSlice';
import { useGetByIdFrameQuery } from '../../../redux/rtk query/Slices/frameSlice';

export default function UserNavbar() {
    let { data: mainLogo } = useGetSettingsByKeyQuery('MainLogo')
    let hiddenRef = useRef()
    let barsRef = useRef()
    let navigate = useNavigate()
    const handleDisplay = (e) => {
        e.stopPropagation()
        hiddenRef.current.classList.toggle("handleBars")
    }
    const handleBars = (e) => {
        e.stopPropagation()
        barsRef.current.classList.toggle("handleBars")
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

    const logOut = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        setUserInfo({})
        navigate("/")
    }

    useEffect(() => {
        const handleClick = () => {
            if (!hiddenRef.current.classList.contains("handleBars")) {
                hiddenRef.current.classList.add("handleBars");
            }
            if (!barsRef.current.classList.contains("handleBars")) {
                barsRef.current.classList.add("handleBars");
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div className="user-navbar bg-[var(--bg-color)] py-3 border-b-2 border-[var(--movies-bg)] fixed w-full top-0 left-0 z-20">
            <Container>
                <div className="navbar-wrapper flex items-center justify-between">
                    <div className="links flex items-center relative">
                        <NavLink
                            to="/">
                            <img src={mainLogo?.value} alt="." width={"70px"} height={"70px"} />
                        </NavLink>
                        <NavLink
                            to="/"
                            className="no-underline font-['PT_Serif'] font-semibold hidden md:block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}
                        >
                            <span className='text-xl'>Ana səhifə</span>
                        </NavLink>
                        <NavLink
                            to="/series"
                            className="no-underline mx-3 font-['PT_Serif'] font-semibold hidden md:block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}
                        >
                            <span className='text-xl'>Seriallar</span>
                        </NavLink>
                        <NavLink
                            to="/movies"
                            className="no-underline mr-3 font-['PT_Serif'] font-semibold hidden md:block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}
                        >
                            <span className='text-xl'>Filmlər</span>

                        </NavLink>
                        <NavLink
                            to="/blog"
                            className="no-underline mr-3 font-['PT_Serif'] font-semibold hidden md:block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}
                        >
                            <span className='text-xl'>Bloqlar</span>

                        </NavLink>
                        <NavLink
                            to="/frame-store"
                            className="no-underline font-['PT_Serif'] font-semibold hidden md:block"
                            style={({ isActive }) => {
                                return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                            }}
                        >
                            <span className='text-xl'>Market</span>

                        </NavLink>
                        <div className='text-3xl mx-2 text-[var(--text-color)] block md:hidden'>
                            <span onClick={(e) => handleBars(e)} className='cursor-pointer'><FaBars /></span>
                            <div ref={barsRef}
                                className='flex flex-col absolute top-[110%] left-2 w-full rounded-4 p-2 
                            shadow-[0_8px_24px_rgba(149,157,165,0.1)] bg-[var(--bg-color)] z-10 
                            transition-all ease-in duration-200 handleBars'>
                                <NavLink
                                    to="/"
                                    className="no-underline font-['PT_Serif']"
                                    style={({ isActive }) => {
                                        return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                    }}
                                >
                                    <span className='text-lg'>Ana səhifə</span>
                                </NavLink>
                                <NavLink
                                    to="/series"
                                    className="no-underline font-['PT_Serif']"
                                    style={({ isActive }) => {
                                        return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                    }}
                                >
                                    <span className='text-lg'>Seriallar</span>
                                </NavLink>
                                <NavLink
                                    to="/movies"
                                    className="no-underline font-['PT_Serif']"
                                    style={({ isActive }) => {
                                        return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                    }}
                                >
                                    <span className='text-lg'>Filmlər</span>

                                </NavLink>
                                <NavLink
                                    to="/blog"
                                    className="no-underline font-['PT_Serif']"
                                    style={({ isActive }) => {
                                        return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                    }}
                                >
                                    <span className='text-lg'>Bloqlar</span>

                                </NavLink>
                                <NavLink
                                    to="/frame-store"
                                    className="no-underline font-['PT_Serif']"
                                    style={({ isActive }) => {
                                        return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                    }}
                                >
                                    <span className='text-lg'>Market</span>

                                </NavLink>
                            </div>
                        </div>

                    </div>
                    <div className="user-side flex items-center justify-center gap-3">
                        <div className="user-logo text-cyan-500 text-3xl relative">
                            {
                                Object.keys(userInfo).length ? (
                                    <div onClick={(e) => handleDisplay(e)} className='user-logo text-cyan-500 text-3xl cursor-pointer relative flex items-center justify-center w-[50px] h-[50px]'>
                                        <img className='w-[75%] h-[75%] rounded-full object-cover z-0' src={`https://englishwithmovies.blob.core.windows.net/avatar/${avatarData?.imgName}`} alt="profile" />
                                        <div
                                            key={frame?.id}
                                            className="absolute w-full h-full bg-cover bg-center z-10"
                                            style={{ backgroundImage: `url('https://englishwithmovies.blob.core.windows.net/frame/${frame?.imgName}')` }}
                                        ></div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={(e) => handleDisplay(e)}
                                        className='user-logo text-cyan-500 text-3xl cursor-pointer'><FaCircleUser />
                                    </div>
                                )
                            }
                            <div ref={hiddenRef} className='py-2 absolute top-[120%] shadow-[0_8px_24px_rgba(149,157,165,0.1)] bg-[var(--bg-color)] z-10 w-[150px] rounded-4 transition-all ease-in duration-200 handleBars'>
                                {
                                    Object.keys(userInfo).length ? (
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
                                                to="/favorites"
                                                className="no-underline font-['PT_Serif']"
                                                style={({ isActive }) => {
                                                    return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                                }}
                                            >
                                                <span className='text-lg px-3'>Favoritlərim </span>
                                            </NavLink>
                                            {
                                                userInfo?.role != 'Member' ? (
                                                    <NavLink
                                                        to="/manage"
                                                        className="no-underline font-['PT_Serif']"
                                                        style={({ isActive }) => {
                                                            return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                                        }}
                                                    >
                                                        <span className='text-lg px-3'>Admin</span>
                                                    </NavLink>
                                                ) : (<></>)
                                            }
                                            <div className='h-[2px] w-full bg-black'></div>
                                            <span onClick={() => logOut()} className='cursor-pointer text-lg px-3 text-[var(--text-color)] font-["PT_Serif"]'>Çıxış et </span>
                                        </>
                                    ) : (
                                        <>
                                            <NavLink
                                                to="/login"
                                                className="no-underline font-['PT_Serif']"
                                                style={({ isActive }) => {
                                                    return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                                }}
                                            >
                                                <span className='text-lg px-3'>Login </span>
                                            </NavLink>
                                            <div className='h-[2px] w-full bg-black'></div>
                                            <NavLink
                                                to="/register"
                                                className="no-underline font-['PT_Serif']"
                                                style={({ isActive }) => {
                                                    return isActive ? { color: "#06b6d4" } : { color: "var(--text-color)" };
                                                }}
                                            >
                                                <span className='text-lg px-3'>Register </span>
                                            </NavLink>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div className="theme-button">
                            <ThemeButton />
                        </div>
                    </div>
                </div >
            </Container >
        </div >
    )
}