import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Table, Settings, Menu, Sun, Moon } from 'lucide-react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [adminTheme, setAdminTheme] = useState(() => {
        const savedTheme = JSON.parse(localStorage.getItem("adminTheme"));
        return savedTheme !== null ? savedTheme : isDarkMode;
    })
    useEffect(() => {
        localStorage.setItem("adminTheme", JSON.stringify(adminTheme));
    }, [adminTheme]);
    useEffect(() => {
        document.documentElement.style.setProperty(
            "--admin-bg-color",
            adminTheme ? "#1f2937" : "#fff"
        );
        document.documentElement.style.setProperty(
            "--admin-text-color",
            adminTheme ? "#fff" : "#000"
        );
        document.documentElement.style.setProperty(
            "--admin-page-bg-color",
            adminTheme ? "#445264" : "#e4e5e7"
        );
    }, [adminTheme]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <>
            <div style={{ height: 'calc(100vh - 2rem)' }} className={`m-[1rem] bg-blue-900 text-white flex flex-col p-4 fixed top-0 left-0  rounded-5 transition-all duration-300 ease-in w-[200px] lg:w-[20%] z-10
                    ${sidebarOpen ? '' : 'handleBars'}`}>
                <h1 className="text-2xl items-center flex justify-between font-bold mb-6">
                    <div>Admin Panel</div>
                    <div onClick={() => setSidebarOpen(false)} className='text-4xl cursor-pointer'><IoClose /></div>
                </h1>
                <nav className="flex flex-col space-y-4">
                    <NavLink to="/manage/dashboard" className={({ isActive }) => `flex items-center text-white no-underline space-x-2 p-2 rounded-lg ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </NavLink>
                    <div className={`flex items-center text-white no-underline space-x-2 p-2 rounded-lg hover:bg-blue-700`} onClick={toggleDropdown}>
                        <Table />
                        <span>Tables</span>
                        {isDropdownOpen ? (
                            <FaChevronUp className="ml-2" />
                        ) : (
                            <FaChevronDown className="ml-2" />
                        )}
                    </div>
                    {isDropdownOpen && (
                        <ul className="pl-6 space-y-4 mt-2 max-h-[60vh] overflow-y-scroll">
                            <li>
                                <NavLink to={'tables/avatar-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Avatar Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/blog-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Blog Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/feedback-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Feedback Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/frame-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Frame Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/genre-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Genre Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/level-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Level Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/movie-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Movie Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/settings-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Settings Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/subscription-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Subscription Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/user-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Users Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/user-report-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    User Report Table
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={'tables/word-table'} className={({ isActive }) => `whitespace-nowrap text-white text-lg px-2 py-1 rounded-md no-underline ${isActive ? 'bg-blue-600' : 'hover:bg-blue-700'}`}>
                                    Word Table
                                </NavLink>
                            </li>
                        </ul>
                    )}
                    <div className={`grid grid-cols-2 items-center text-white no-underline space-x-2`}>
                        <div className='bg-white text-black flex gap-2 p-2 rounded-lg cursor-pointer'
                            onClick={() => setAdminTheme(false)}>
                            <Sun />
                            Light
                        </div>
                        <div className='bg-gray-800 flex gap-2 p-2 rounded-lg cursor-pointer'
                            onClick={() => setAdminTheme(true)}>
                            <Moon />
                            Dark
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}