import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { themes } from "../../.config";
import i18n from "../../localize/i18n";
import { selectTheme, setTheme } from "../../store/slices/themeSlice";
import { useAppDispatch } from "../../store/store";

export const Header = () => {
    const { theme } = useSelector(selectTheme);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (theme === "dark") {
            themes.dark.map((i) =>
                document.documentElement.style.setProperty(i.variable, i.value)
            );
        } else {
            themes.light.map((i) =>
                document.documentElement.style.setProperty(i.variable, i.value)
            );
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <header>
            <h1>Header</h1>
            <button
                onClick={() =>
                    i18n.changeLanguage(i18n.language === "en" ? "uk" : "en")
                }
            >
                change
            </button>
            <button
                onClick={() =>
                    dispatch(setTheme(theme === "dark" ? "light" : "dark"))
                }
            >
                {theme}
            </button>
        </header>
    );
};
