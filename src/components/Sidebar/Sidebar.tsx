import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
    IFilterTypes,
    IValues,
    selectFilter,
    setFilters,
    setPrice,
} from "../../store/slices/filterSlice";
import { selectProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
import { getPrice } from "../../utils/getMinPrice";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import st from "./Sidebar.module.scss";

// ! prettify (works)
const changeObj = (
    filterTypes: IFilterTypes,
    type: string,
    value: string,
    changed: boolean
) => {
    if (filterTypes.brands.values && type === "brands") {
        const newObj: IValues[] = [];
        filterTypes.brands.values.map((i) =>
            newObj.push({
                title: i.title,
                isActive: i.title === value ? changed : i.isActive,
            })
        );
        return {
            ...filterTypes,
            brands: {
                ...filterTypes.brands,
                values: [...newObj],
            },
        };
    } else {
        return filterTypes;
    }
};

const Sidebar = () => {
    const { t, i18n } = useTranslation();
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const { devices } = useSelector(selectProducts);
    const { filterTypes } = useSelector(selectFilter);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // ! rewrite this shit
        if (devices) {
            const createValues = (value: "brand" | "proc") => {
                const unique =
                    value === "brand"
                        ? devices
                              .map((i) => i.brand)
                              .filter((v, i, a) => a.indexOf(v) === i)
                        : value === "proc" &&
                          devices
                              .map((i) => i.processor)
                              .filter((v, i, a) => a.indexOf(v) === i);

                const obj: { title: string; isActive: boolean }[] = [];
                unique &&
                    unique.forEach((i) => {
                        obj.push({ title: i, isActive: false });
                    });
                return obj;
            };

            dispatch(
                setFilters({
                    ...filterTypes,
                    brands: {
                        ...filterTypes.brands,
                        values: [...createValues("brand")],
                    },
                    processor: {
                        ...filterTypes.processor,
                        values: [...createValues("proc")],
                    },
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [devices]);

    const onClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setPrice({ min: minVal, max: maxVal }));
    };

    return (
        <aside className={st.root}>
            <h3>{t("sidebarTitle")}</h3>

            {devices && (
                <form
                    className={st.filterTypes}
                    onSubmit={(e) => onClickSubmit(e)}
                >
                    {devices.length > 1 && (
                        <MultiRangeSlider
                            min={getPrice(devices, "min") - 100}
                            max={getPrice(devices, "max") + 100}
                            setMinVal={setMinVal}
                            setMaxVal={setMaxVal}
                        />
                    )}

                    {/* // ! create component from this */}
                    <div>
                        <h4>
                            {i18n.language === "en"
                                ? filterTypes.brands.title.en
                                : filterTypes.brands.title.uk}
                        </h4>
                        {filterTypes.brands.values &&
                            filterTypes.brands.values.map((i) => (
                                <div
                                    key={i.title}
                                    onClick={() =>
                                        filterTypes.brands.values &&
                                        dispatch(
                                            setFilters(
                                                changeObj(
                                                    filterTypes,
                                                    "brands",
                                                    i.title,
                                                    !i.isActive
                                                )
                                            )
                                        )
                                    }
                                >
                                    <span>
                                        {i.isActive === false ? "-" : "+"}
                                    </span>
                                    <p>{i.title}</p>
                                </div>
                            ))}
                    </div>
                    <div>
                        <h4>
                            {i18n.language === "en"
                                ? filterTypes.processor.title.en
                                : filterTypes.processor.title.uk}
                        </h4>
                        {filterTypes.processor.values &&
                            filterTypes.processor.values.map((i) => (
                                <div key={i.title}>
                                    <span>
                                        {i.isActive === false ? "-" : "+"}
                                    </span>
                                    <p>{i.title}</p>
                                </div>
                            ))}
                    </div>
                    <button type="submit">Показати</button>
                </form>
            )}
        </aside>
    );
};

export default Sidebar;
