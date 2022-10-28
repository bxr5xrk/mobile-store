import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { tmpFilterValues } from "../../.config";
import { Service } from "../../api/AlloService";
import {
    selectFilter,
    setActiveFilters,
    setPrice,
} from "../../store/slices/filterSlice";
import { useAppDispatch } from "../../store/store";
import { getPrice } from "../../utils/getPrice";
import { ParseSearchQueryInMount } from "../../utils/parseSearchQueryInMount";
import AccordionSelect from "../AccordionSelect/AccordionSelect";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import st from "./Sidebar.module.scss";

const Sidebar = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { data: devices, loading } = Service.fetchAllDevices();
    const { activeFilters } = useSelector(selectFilter);
    const [priceValues, setPriceValues] = useState({ min: 0, max: 0 });
    const [localFilterValues, setLocalFilterValues] = useState(tmpFilterValues);

    const changeFilters = (parentId: number, childId: number) => {
        const copy = [...localFilterValues];
        const parent = copy.find((i) => i.id === parentId);
        if (parent) {
            const parentIndex = copy.indexOf(parent);
            const child = parent.filterValues.find((i) => i.id === childId);
            if (child) {
                child.active = !child.active;

                copy.splice(parentIndex, 1, parent);

                setLocalFilterValues(copy);
            }
        }
    };

    // parse search query at the beginning
    ParseSearchQueryInMount({
        activeFilters,
    });

    if (loading) {
        return (
            <aside className={st.root}>
                <div className={st.top}>
                    <p>Loading...</p>
                </div>
            </aside>
        );
    }

    // for calculating min and max price
    const priceArr = devices ? devices.map((i) => i.price) : [];

    const resetAll = () => {
        dispatch(
            setActiveFilters({
                brands: [],
                rom: [],
                ram: [],
                colors: [],
            })
        );
        dispatch(
            setPrice({
                min: Number(getPrice(priceArr, "min")),
                max: Number(getPrice(priceArr, "max")),
            })
        );
    };

    const applyActiveFilters = () => {
        dispatch(setPrice(priceValues));

        const getValues = (id: number) =>
            localFilterValues
                .find((i) => i.id === id)
                ?.filterValues.filter((i) => i.active)
                .map((i) => i.value) || [];

        const brands = getValues(1);
        const ram = getValues(2);
        const rom = getValues(4);
        const colors = getValues(4);

        dispatch(setActiveFilters({ brands, ram, rom, colors }));
    };

    return (
        <aside className={st.root}>
            <div className={st.top}>
                <h3>{t("sidebarTitle")}</h3>
                <svg
                    onClick={resetAll}
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 459.313 459.314"
                >
                    <path
                        d="M459.313,229.648c0,22.201-17.992,40.199-40.205,40.199H40.181c-11.094,0-21.14-4.498-28.416-11.774
		C4.495,250.808,0,240.76,0,229.66c-0.006-22.204,17.992-40.199,40.202-40.193h378.936
		C441.333,189.472,459.308,207.456,459.313,229.648z"
                    />
                </svg>
            </div>

            {devices && devices.length ? (
                <div className={st.filterTypes}>
                    <MultiRangeSlider
                        min={getPrice(priceArr, "min")}
                        max={getPrice(priceArr, "max")}
                        onChange={({ min, max }) =>
                            setPriceValues({ min, max })
                        }
                    />
                    {localFilterValues.map((i) => (
                        <AccordionSelect
                            key={i.id}
                            title={i.title}
                            items={i.filterValues.map((i) => i)}
                            parentId={i.id}
                            onChange={changeFilters}
                        />
                    ))}
                </div>
            ) : null}
            <button onClick={applyActiveFilters}>Apply filters</button>
        </aside>
    );
};

export default Sidebar;
