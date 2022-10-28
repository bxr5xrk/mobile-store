import React from "react";
import { useTranslation } from "react-i18next";
import { Service } from "../../api/AlloService";
import st from "../../layout/Header/Header.module.scss";

const ToggleLanguage = () => {
    const { i18n } = useTranslation();
    const { refetch } = Service.fetchAllDevices();

    const changeCookie = () => {
        i18n.changeLanguage(i18n.language === "en" ? "uk" : "en");
        refetch({ locale: [i18n.language] });
        document.cookie = "";
        document.cookie = `lang=${i18n.language}; path=/`;
    };

    return (
        <div className={st.item} onClick={changeCookie}>
            <p>{i18n.language === "uk" ? "УКР" : "EN"}</p>
        </div>
    );
};

export default ToggleLanguage;
