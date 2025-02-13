import React, { useEffect, useState } from 'react';
import LoginFirstPart from '../../../components/Client/Login page components/LoginPage';
import ForgotPassword from '../../../components/Client/Login page components/ForgotPassword';
import ConfirmPassword from '../../../components/Client/Login page components/ConfirmPassword';
import NewPassword from '../../../components/Client/Login page components/NewPassword';

export default function LoginPage() {
    let [page, setPage] = useState("login-page")
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    return (
        <>
            {page === "login-page" && <LoginFirstPart setPage={setPage} />}
            {page === "forgot-password" && <ForgotPassword setPage={setPage} />}
            {page === "confirm-password" && <ConfirmPassword setPage={setPage} />}
            {page === "new-password" && <NewPassword setPage={setPage} />}
        </>
    );

}