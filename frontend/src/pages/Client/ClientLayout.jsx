import { Outlet } from 'react-router'
import UserNavbar from "../../components/Client/Client Navbar"
import UserFooter from "../../components/Client/Client Footer"

export default function ClientLayout() {
    return (
        <>
            <UserNavbar />
            <Outlet />
            <UserFooter />
        </>
    )
}