import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectProducts } from "../../store/slices/productsSlice";
import { getPrice } from "../../utils/getMinPrice";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import st from "./Sidebar.module.scss";

// const sortingData = [
//     {
//         id: 1,
//         title: "Brand",
//         items: ["від дешевих до дорогих", "від дорогих до дешевих"],
//     },
//     { id: 1, title: "Brand", items: [] },
// ];

const Sidebar = () => {
    const { t } = useTranslation();
    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(10000);
    const { devices } = useSelector(selectProducts);

    console.log(minVal, maxVal);

    return (
        <aside className={st.root}>
            <h3>{t("sidebarTitle")}</h3>

            {devices && (
                <div className={st.filterTypes}>
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
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
