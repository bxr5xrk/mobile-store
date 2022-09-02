import React from "react";
import { useTranslation } from "react-i18next";
import st from "./Sidebar.module.scss";

const sortingData = [
    { id: 1, sortBy: "Brand", items: ['від дешевих до дорогих', 'від дорогих до дешевих'] },
    { id: 1, sortBy: "Brand", items: [] },
];

const Sidebar = () => {
    const { t } = useTranslation();

    return (
        <aside className={st.root}>
            <h3>{t("sidebarTitle")}</h3>
            <div>
                <p>csdcsdcsdcsdc</p>
                <p>csdcsdcsdcsdc</p>
                <p>csdcsdcsdcsdc</p>
                <p>csdcsdcsdcsdc</p>
                <p>csdcsdcsdcsdc</p>
                <p>csdcsdcsdcsdc</p>
            </div>
        </aside>
    );
};

export default Sidebar;
