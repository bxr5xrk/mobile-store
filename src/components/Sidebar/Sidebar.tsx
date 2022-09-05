import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { IFilterType, setActiveFilters, setPrice } from "../../store/slices/filterSlice";
import { selectProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
import { getPrice } from "../../utils/getMinPrice";
import AccordionSelect from "../AccordionSelect/AccordionSelect";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import st from "./Sidebar.module.scss";

const Sidebar = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const { devices, filters } = useSelector(selectProducts);
    const [filterTypes, setFilterTypes] = useState<IFilterType>({
        brands: [],
        processors: [],
    });

    const onClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setPrice({ min: minVal, max: maxVal }));
        dispatch(setActiveFilters(filterTypes))
    };

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
                            key={i.id}
                            title={i.title}
                            items={[...i.filterValues.map((i) => i.value)]}
                            setFilterTypes={setFilterTypes}
                            filterTypes={filterTypes}
                        />
                    ))}

                    <button type="submit">Показати</button>
                </form>
            )}
        </aside>
    );
};

export default Sidebar;
