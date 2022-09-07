import React, { FC } from "react";
import { useTranslation } from "react-i18next";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { selectFilter } from "../../store/slices/filterSlice";
import SQ from "../../utils/parseSearchQuery";
import st from "./BreadCrumbs.module.scss";

const BreadCrumbs: FC = () => {
    // const { activeFilters } = useSelector(selectFilter);
    const { i18n } = useTranslation();

    // const brands = activeFilters.brands;
    const brandsParams = SQ.getItem("brands");

    // const links = [
    //     {
    //         id: 1,
    //         link: "/products",
    //         title: {
    //             en: "Mobile Phones",
    //             uk: "Мобільні телефони",
    //         },
    //     },
    //     {
    //         id: 2,
    //         link: "/products",
    //         title: {
    //             en: '',
    //             uk: "Мобільні телефони",
    //         },
    //     },
    // ];

    return (
        <div className={st.root}>
            <div>
                <Link to="/products">
                    {i18n.language === "uk"
                        ? "Мобільні телефони"
                        : "Mobile Phones"}
                </Link>
            </div>
            {brandsParams ? (
                <>
                    <span>{" / "}</span>
                    <div>
                        <p>Phones {brandsParams.join(", ")}</p>
                        <span></span>
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default BreadCrumbs;
