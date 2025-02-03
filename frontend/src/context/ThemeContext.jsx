import { createContext, useEffect, useState } from "react";
export const themeContext = createContext()

export default function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = JSON.parse(localStorage.getItem("darkTheme"));
        return savedTheme !== null ? savedTheme : false;
    });

    useEffect(() => {
        localStorage.setItem("darkTheme", JSON.stringify(darkMode))
    }, [darkMode])

    let value = {
        darkMode,
        setDarkMode
    }

    return <themeContext.Provider value={value}>{children}</themeContext.Provider>
}