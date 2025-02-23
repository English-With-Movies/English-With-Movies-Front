import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const adminNavRef = useRef(null);

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

    return (
        <div className='py-[1rem]'>
            <nav
                className={`mx-[1rem] bg-gray-800 text-white flex justify-between items-center p-3 rounded-5 ${isScrolled ? 'fixed top-0 opacity-90' : ''}`}
                ref={adminNavRef}
                style={{width: isScrolled ? 'calc(100% - 2rem)' : ''}}
            >
                <div></div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
                        <FaBars />
                    </button>
                    <button className="text-2xl">
                        <FaUserCircle />
                    </button>
                    <button className="text-2xl">
                        <FaSignOutAlt />
                    </button>
                </div>
            </nav>
        </div>
    )
}