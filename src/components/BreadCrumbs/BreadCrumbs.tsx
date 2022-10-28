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

    return (
        <div className={st.root}>
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
            {brandsParams.length ? (
                <>
                    <span>{" / "}</span>
                    <div>
                        <p>Phones {brandsParams.join(", ")}</p>
                    </div>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default BreadCrumbs;
