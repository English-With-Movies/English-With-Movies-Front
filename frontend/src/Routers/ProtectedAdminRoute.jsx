import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetByIdUserQuery } from "../redux/rtk query/Slices/userSlice";
import { useContext } from "react";
import { userInfoContext } from "../context/UserInfo";

const ProtectedAdminRoute = () => {
    let { userInfo } = useContext(userInfoContext)
    let { data: user } = useGetByIdUserQuery(userInfo?.userId)

    return !user || user?.role == 'Member' ? <Navigate to="/" replace /> : <Outlet />;
};

export default ProtectedAdminRoute;