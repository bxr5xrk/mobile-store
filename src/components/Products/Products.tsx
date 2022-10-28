import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { getActiveView } from "../../utils";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import ProductsList from "../ProductsList/ProductsList";
import SortingTypes from "../SortingTypes/SortingTypes";
import SwitchView from "../SwitchView/SwitchView";
import st from "./Products.module.scss";

const Products: FC = () => {
    const { t } = useTranslation();
    const [activeView, setActiveView] = useState(getActiveView());

    return (
        <div className={st.root}>
            <BreadCrumbs />

            <h1>{t("productsTitle")}</h1>

            <div className={st.sort}>
                <SortingTypes />
                <SwitchView
                    activeView={activeView}
                    setActiveView={setActiveView}
                />
            </div>

            <ProductsList activeView={activeView} />
        </div>
    );
};

export default Products;
