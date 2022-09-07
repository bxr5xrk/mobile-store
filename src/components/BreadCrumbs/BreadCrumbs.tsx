import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFilter, setActiveFilters } from "../../store/slices/filterSlice";
import { useAppDispatch } from "../../store/store";
import st from "./BreadCrumbs.module.scss";

const BreadCrumbs: FC = () => {
    const { activeFilters } = useSelector(selectFilter);
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation();

    const brandsParams = activeFilters.brands;

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
                <Link
                    to="/products"
                    onClick={() =>
                        dispatch(
                            setActiveFilters({
                                brands: [],
                                rom: [],
                                ram: [],
                                colors: [],
                            })
                        )
                    }
                >
                    {i18n.language === "uk"
                        ? "Мобільні телефони"
                        : "Mobile Phones"}
                </Link>
            </div>
            {brandsParams.length ? (
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
