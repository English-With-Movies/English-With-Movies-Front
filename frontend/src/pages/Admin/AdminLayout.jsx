import { Outlet } from 'react-router'
import AdminNavbar from "../../components/Admin/Admin Navbar"
import AdminSidebar from '../../components/Admin/Admin Sidebar'

export default function AdminLayout() {
    return (
        <>
            <AdminNavbar />
            <AdminSidebar />
            <Outlet />
        </>
    )
}