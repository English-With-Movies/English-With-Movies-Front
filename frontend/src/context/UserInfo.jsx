import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const userInfoContext = createContext()

export default function UserInfo({ children }) {
    let [userInfo, setUserInfo] = useState(() => {
        const userToken = localStorage.getItem("token");
        if (userToken) {
            try {
                const decoded = jwtDecode(userToken);
                return {
                    userName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                    userId: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
                };
            } catch (error) {
                console.error("Token-i decode etmək mümkün olmadı:", error);
            }
        }
        return {};
    });

    const userToken = localStorage.getItem("token");
    const userExpiration = localStorage.getItem("expiration");

    useEffect(() => {
        if (userToken && userExpiration) {
            const currentTime = new Date().toISOString();
            if (new Date(userExpiration) < new Date(currentTime)) {
                localStorage.removeItem("token");
                localStorage.removeItem("expiration");
                setUserInfo({});
                window.location.href = "/login";
                return;
            }
        }
    }, [userToken, userExpiration]);

    return <userInfoContext.Provider value={{ userInfo, setUserInfo }}>{children}</userInfoContext.Provider>
}