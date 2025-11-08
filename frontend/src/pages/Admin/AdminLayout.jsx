import { Outlet } from 'react-router'
import AdminNavbar from "../../components/Admin/Admin Navbar"
import AdminSidebar from '../../components/Admin/Admin Sidebar'
import { useState } from 'react'

export default function AdminLayout() {
    let [ sidebarOpen, setSidebarOpen ] = useState(false)
    return (
        <div className='bg-[var(--admin-page-bg-color)]'>
            <AdminNavbar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
            <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className='p-[1rem] shadow-custom'>
                <Outlet />
            </div>
        </div>
    )
}