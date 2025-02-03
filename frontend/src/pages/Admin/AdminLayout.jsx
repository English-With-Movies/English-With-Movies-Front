import { Outlet } from 'react-router'
import AdminNavbar from "../../components/Admin/Admin Navbar"
import AdminFooter from "../../components/Admin/Admin Footer"

export default function AdminLayout() {
    return (
        <>
            <AdminNavbar />
            <Outlet />
            <AdminFooter />
        </>
    )
}