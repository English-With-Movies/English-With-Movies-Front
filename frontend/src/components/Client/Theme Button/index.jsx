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
            darkMode ? "#1a222c" : '#e6f0fa'
            // "#e3e3ff"'#cfddff'
        );
        document.documentElement.style.setProperty(
            "--footer-bg",
            darkMode ? 'url("https://t4.ftcdn.net/jpg/05/00/76/75/240_F_500767502_AdezwSUsyb04l79RpV6zubKulRnIHpd0.jpg")' : "url('https://img.freepik.com/free-vector/v915_53876-174949.jpg?t=st=1738614544~exp=1738618144~hmac=0742484dc742956972d4c6778d980ebb080fa55a13f08560c665a7204651b908&w=1380')"
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