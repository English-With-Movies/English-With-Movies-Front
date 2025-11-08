import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userInfoContext } from "../context/UserInfo";

const ProtectedAdminRoute = () => {
    let { userInfo, isRefreshing } = useContext(userInfoContext)
    let navigate = useNavigate()

    if (!userInfo || Object.keys(userInfo).length === 0 || isRefreshing) {
        navigate('/')
        return null;
    }

    return Object.keys(userInfo).length === 0 || userInfo?.role == 'Member' ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedAdminRoute;