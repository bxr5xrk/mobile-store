import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
    selectFilter,
    setActiveFilters,
    setPrice,
} from "../../store/slices/filterSlice";
import { selectProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
import { IFilterType } from "../../types";
import { getPrice } from "../../utils/getMinPrice";
import { ParseSearchQueryInMount } from "../../utils/parseSearchQueryInMount";
import AccordionSelect from "../AccordionSelect/AccordionSelect";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import st from "./Sidebar.module.scss";

const Sidebar = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const { devices, filters } = useSelector(selectProducts);
    const { activeFilters } = useSelector(selectFilter);
    const [filterTypes, setFilterTypes] = useState<IFilterType>({
        brands: [],
        rom: [],
        ram: [],
        colors: [],
    });

    const onClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setPrice({ min: minVal, max: maxVal }));
        dispatch(setActiveFilters(filterTypes));
    };

    // parse search query at the begining
    ParseSearchQueryInMount({ activeFilters, setFilterTypes });

    if (!devices || !filters) {
        return <>error</>;
    }

    return (
        <aside className={st.root}>
            <h3>{t("sidebarTitle")}</h3>

            {devices.length > 1 && (
                <form
                    className={st.filterTypes}
                    onSubmit={(e) => onClickSubmit(e)}
                >
                    <MultiRangeSlider
                        min={getPrice(devices, "min") - 100}
                        max={getPrice(devices, "max") + 100}
                        setMinVal={setMinVal}
                        setMaxVal={setMaxVal}
                    />
                    {filters.map((i) => (
                        <AccordionSelect
                            key={i.id + i.title}
                            title={i.title}
                            items={[...i.filterValues.map((i) => i.value)]}
                            setFilterTypes={setFilterTypes}
                            filterTypes={filterTypes}
                            id={i.id}
                        />
                    ))}
                    <button type="submit">Застосувати</button>{" "}
                    <p
                        className={st.reset}
                        onClick={() =>
                            setFilterTypes({
                                brands: [],
                                rom: [],
                                ram: [],
                                colors: [],
                            })
                        }
                    >
                        reset All
                    </p>
                </form>
            )}
        </aside>
    );
};

export default Sidebar;
