import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { themes } from "../../.config";
import { Service } from "../../api/AlloService";
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import Search from "../../components/Search/Search";
import { selectProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
import { themeType } from "../../types";
import st from "./Header.module.scss";

const headerItems = [
    {
        id: 1,
        item: (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512.18 512.18"
                width="60px"
                height="60px"
            >
                <path
                    d="M512.825,170.884c-0.14-1.786-0.298-3.155-0.44-4.095C505.22,85.648,445.691,21.423,368.434,21.423
c-43.806,0-84.286,25.204-111.378,63.119c-27.017-37.956-67.294-63.119-111.086-63.119c-76.994,0-136.385,63.79-144.033,145.827
c-0.147,0.956-0.295,2.12-0.43,3.489c-1.307,13.254-0.22,30.816,4.831,52.214c10.732,45.463,35.828,86.871,71.224,118.958
l165.487,143.624c8.015,6.956,19.925,6.963,27.948,0.015l165.483-143.296c39.184-40.771,62.443-77.41,71.666-119.627
C512.771,201.424,513.848,183.977,512.825,170.884z M466.46,213.526c-7.254,33.204-26.552,63.603-59.352,97.843L257.052,441.195
l-151.18-131.201C77.095,283.9,56.57,250.033,47.863,213.151c-3.953-16.747-4.747-29.585-3.895-38.225
c0.075-0.764,0.393-3.072,0.393-3.072C49.849,110.077,92.478,64.09,145.97,64.09c37.132,0,73.538,29.964,91.407,72.297
c7.338,17.382,31.97,17.382,39.308,0c17.82-42.214,54.532-72.297,91.749-72.297c53.494,0,96.121,45.99,101.609,107.786
c0.147,1.242,0.187,1.586,0.245,2.333C470.993,183.234,470.174,196.504,466.46,213.526z"
                />
            </svg>
        ),
        link: "/watchlist",
    },
    {
        id: 2,
        item: (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 176.26 176.26"
                width="40px"
                height="40px"
            >
                <path
                    d="M67.346,136.988c-10.826,0-19.635,8.808-19.635,19.633c0,10.829,8.809,19.639,19.635,19.639s19.635-8.81,19.635-19.639
		C86.98,145.796,78.172,136.988,67.346,136.988z M67.346,164.26c-4.21,0-7.635-3.427-7.635-7.639c0-4.209,3.425-7.633,7.635-7.633
		s7.635,3.424,7.635,7.633C74.98,160.833,71.556,164.26,67.346,164.26z"
                />
                <path
                    d="M134.533,136.988c-10.826,0-19.635,8.808-19.635,19.633c0,10.829,8.809,19.639,19.635,19.639
		c10.828,0,19.637-8.81,19.637-19.639C154.17,145.796,145.361,136.988,134.533,136.988z M134.533,164.26
		c-4.21,0-7.635-3.427-7.635-7.639c0-4.209,3.425-7.633,7.635-7.633c4.211,0,7.637,3.424,7.637,7.633
		C142.17,160.833,138.744,164.26,134.533,164.26z"
                />
                <path
                    d="M152.81,134.525l23.257-89.434H38.215l-6.712-25.813H0.193v12h22.03l26.848,103.246H152.81z M114.898,82.902v13.813H86.98
		V82.902H114.898z M86.98,70.902v-13.81h27.918v13.81H86.98z M126.898,82.902h26.936l-3.592,13.813h-23.344V82.902z
		 M114.898,108.715v13.811H86.98v-13.811H114.898z M74.98,96.715H51.639l-3.592-13.813H74.98V96.715z M54.76,108.715H74.98v13.811
		h-16.63L54.76,108.715z M126.898,122.525v-13.811h20.224l-3.592,13.811H126.898z M156.955,70.902h-30.057v-13.81h33.648
		L156.955,70.902z M74.98,57.092v13.81H44.926l-3.591-13.81H74.98z"
                />
            </svg>
        ),
        link: "/cart",
    },
];

export const Header = () => {
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();
    const [showBurger, setShowBurger] = useState(false);
    const { devices } = useSelector(selectProducts);
    const navigate = useNavigate();
    const LSTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState<themeType>(LSTheme as themeType);

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

    // fetch all devices
    useEffect(() => {
        if (!devices) {
            dispatch(Service.fetchProducts({ locale: i18n.language }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const changeCookie = () => {
        i18n.changeLanguage(i18n.language === "en" ? "uk" : "en");
        document.cookie = "";
        document.cookie = `lang=${i18n.language}; path=/`;
    };

    return (
        <>
            <header>
                <button
                    onClick={() => setShowBurger(!showBurger)}
                    className={`${st.burger} ${
                        showBurger ? `${st.burgerActive}` : ""
                    }`}
                >
                    <div className={st.bar}></div>
                </button>

                <p className={st.logo} onClick={() => navigate("/products")}>
                    Mobile Store
                </p>

                <Search />

                <menu>
                    <div className={st.item} onClick={changeCookie}>
                        <p>{i18n.language === "uk" ? "УКР" : "EN"}</p>
                    </div>

                    <div
                        className={st.item}
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                    >
                        {theme === "light" ? (
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                width="30px"
                                height="30px"
                            >
                                <g>
                                    <g>
                                        <path d="m275.4,500.7c-135,0-244.7-109.8-244.7-244.7 1.06581e-14-134.9 109.8-244.7 244.7-244.7 8.2,0 16.4,0.4 24.6,1.2 7.2,0.7 13.5,5.2 16.5,11.7s2.4,14.2-1.6,20.2c-23,33.8-35.2,73.3-35.2,114.2 0,105 78.7,192.2 183.2,202.6 7.2,0.7 13.5,5.2 16.5,11.7 3.1,6.5 2.4,14.2-1.6,20.2-45.8,67.4-121.4,107.6-202.4,107.6zm-12.5-448c-106.5,6.5-191.2,95.2-191.2,203.3 1.42109e-14,112.3 91.4,203.7 203.7,203.7 56.4,0 109.6-23.4 147.8-63.7-46.2-11.7-88.1-36.8-120.8-72.6-41.1-45.2-63.8-103.6-63.8-164.6 0.1-37.1 8.4-73.2 24.3-106.1z" />
                                    </g>
                                </g>
                            </svg>
                        ) : (
                            <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                width="30px"
                                height="30px"
                            >
                                <path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z" />
                                <path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z" />
                                <path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z" />
                                <path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z" />
                                <path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z" />
                                <path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z" />
                                <path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z" />
                                <path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z" />
                                <path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z" />
                            </svg>
                        )}
                    </div>
                    {headerItems.map((i) => (
                        <div
                            onClick={() => navigate(i.link)}
                            className={st.item}
                            key={i.id}
                        >
                            {i.item}
                        </div>
                    ))}
                </menu>
            </header>

            <MobileMenu
                showBurger={showBurger}
                setShowBurger={setShowBurger}
                theme={theme}
                setTheme={setTheme}
            />
        </>
    );
};
