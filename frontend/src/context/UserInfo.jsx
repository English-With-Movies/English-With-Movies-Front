import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
export const userInfoContext = createContext()

export default function UserInfo({ children }) {
    const [userInfo, setUserInfo] = useState({});
    const [isRefreshing, setIsRefreshing] = useState(false);
    // vpp6Sb3H8Yf2Jp8M8zGykKxaicYQHpO0w9t2eYTaRdg=
    const updateUserInfo = async () => {
        const userToken = localStorage.getItem("accessToken");
        const userRefreshToken = localStorage.getItem("refreshToken");
        if (userToken) {
            try {
                const decoded = jwtDecode(userToken);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp < currentTime) {
                    if (userRefreshToken && !isRefreshing) {
                        setIsRefreshing(true);
                        try {
                            const encodedRefreshToken = encodeURIComponent(userRefreshToken);
                            const response = await axios.post(
                                `https://ravanguliyeff-001-site1.ntempurl.com/api/user/refreshtoken?refreshToken=${encodedRefreshToken}`
                            );
                            localStorage.setItem("accessToken", response.data.accessToken);
                            localStorage.setItem("refreshToken", response.data.refreshToken);
                            updateUserInfo();
                        } catch (error) {
                            console.error("Error refreshing token:", error);
                            localStorage.removeItem("accessToken");
                            localStorage.removeItem("refreshToken");
                            setUserInfo({});
                        } finally {
                            setIsRefreshing(false);
                        }
                    } else if (!userRefreshToken) {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        setUserInfo({});
                    }
                } else {
                    setUserInfo({
                        userName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
                        userId: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                        exp: decoded.exp
                    });
                }
            } catch (error) {
                console.error("Failed to decode token:", error);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                setUserInfo({});
            }
        }
    }

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