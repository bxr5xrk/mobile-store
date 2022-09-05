import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
    setPrice,
} from "../../store/slices/filterSlice";
import { selectProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
// import { setFilterData } from "../../utils/changeFilterData";
import { getPrice } from "../../utils/getMinPrice";
import AccordionSelect from "../AccordionSelect/AccordionSelect";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import st from "./Sidebar.module.scss";

const Sidebar = () => {
    const { t } = useTranslation();
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const { devices, filterTypes } = useSelector(selectProducts);
    // const { filterTypes } = useSelector(selectFilter);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (devices) {
            // dispatch(setFilters(setFilterData(devices, filterTypes)));
            console.log(devices);
        }
        if (filterTypes && filterTypes[0]) {
            console.log([...filterTypes[0].filterValues.map((i) => i.value)]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [devices]);

    const onClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setPrice({ min: minVal, max: maxVal }));
    };

    if (!devices || !filterTypes) {
        return <>error</>;
    }
    // console.log([...filterTypes[0].filterValues.map(i => i.value)]);

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

                    {filterTypes.map((i) => (
                        <AccordionSelect
                            key={i.id}
                            title={i.title}
                            items={[...i.filterValues.map((i) => i.value)]}
                        />
                    ))}

                    <button type="submit">Показати</button>
                </form>
            )}
        </aside>
    );
};

export default Sidebar;
