import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const userInfoContext = createContext()

export default function UserInfo({ children }) {
    const [userInfo, setUserInfo] = useState({});

    const updateUserInfo = () => {
        const userToken = localStorage.getItem("token");
        const userExpiration = localStorage.getItem("expiration");
        if (userToken) {
            try {
                const decoded = jwtDecode(userToken);
                setUserInfo({
                    userName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    userId: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
                });
            } catch (error) {
                console.error("Token-i decode etmək mümkün olmadı:", error);
            }
        }
        if (userToken && userExpiration && new Date(userExpiration) < new Date()) {
            localStorage.removeItem("token");
            localStorage.removeItem("expiration");
            setUserInfo({});
        }
    };

    useEffect(() => {
        updateUserInfo();
    }, []);

    useEffect(() => {
        const observer = new MutationObserver(updateUserInfo);
        observer.observe(document.body, { subtree: true, childList: true });
        return () => observer.disconnect();
    }, []);

    return <userInfoContext.Provider value={{ userInfo, setUserInfo }}>{children}</userInfoContext.Provider>
}