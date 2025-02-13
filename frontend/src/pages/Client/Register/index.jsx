import React, { useEffect, useState } from 'react';
import EmailAndPassword from '../../../components/Client/Register page components/EmailAndPassword';
import AboutUser from '../../../components/Client/Register page components/AboutUser';
import { Helmet } from 'react-helmet';

export default function RegisterPage() {
    let [page, setPage] = useState("email-and-password")
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    return (
        <>
            <Helmet>
                <title>Register</title>
            </Helmet>
            {page === "email-and-password" && <EmailAndPassword setPage={setPage} />}
            {page === "about-user" && <AboutUser />}
        </>
    );
}