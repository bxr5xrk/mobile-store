import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { setPrice } from "../../store/slices/filterSlice";
import { selectProducts } from "../../store/slices/productsSlice";
import { useAppDispatch } from "../../store/store";
import { getPrice } from "../../utils/getMinPrice";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import st from "./Sidebar.module.scss";

const Sidebar = () => {
    const { t } = useTranslation();
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(0);
    const { devices } = useSelector(selectProducts);
    const dispatch = useAppDispatch();

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
                    <MultiRangeSlider
                        min={getPrice(devices, "min")}
                        max={getPrice(devices, "max")}
                        setMinVal={setMinVal}
                        setMaxVal={setMaxVal}
                    />
                    <p>csdcsdcsdcsdc</p>
                    <p>csdcsdcsdcsdc</p>
                    <p>csdcsdcsdcsdc</p>
                    <p>csdcsdcsdcsdc</p>
                    <p>csdcsdcsdcsdc</p>
                    <p>csdcsdcsdcsdc</p>
                    <button type="submit">Показати</button>
                </form>
            )}
        </aside>
    );
};

export default Sidebar;
