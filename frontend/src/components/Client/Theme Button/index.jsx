import { useContext, useEffect } from "react";
import { themeContext } from "../../../context/ThemeContext";
import { GoSun } from "react-icons/go";
import { BsMoonStars } from "react-icons/bs";

export default function ThemeButton() {
    let { darkMode, setDarkMode } = useContext(themeContext)

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--bg-color",
            darkMode ? "#0f1620" : "#fefff4"
        );
        document.documentElement.style.setProperty(
            "--text-color",
            darkMode ? "#e1e1e1" : "#1a1a1a"
        );
        document.documentElement.style.setProperty(
            "--movies-bg",
            darkMode ? "#1e2d3e" : '#d4dcf2'
        );
    }, [darkMode]);

    const changeTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <>
            <div className="theme-button flex items-center justify-center">
                <input
                    type="checkbox"
                    id="darkmode-toggle"
                    checked={darkMode}
                    onChange={changeTheme}
                />
                <label htmlFor="darkmode-toggle" className="theme-label">
                    <GoSun className="sun" />
                    <BsMoonStars className="moon" />
                </label>
                <div className="background"></div>
            </div>
        </>
    )
}