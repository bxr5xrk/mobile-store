import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectProducts } from "../../store/slices/productsSlice";
import { IDeviceStorage } from "../../types";
import SQ from "../../utils/parseSearchQuery";
import Product from "../Product/Product";
import st from "./Products.module.scss";

const Products = () => {
    const { devices } = useSelector(selectProducts);
    const { t } = useTranslation();
    const { search } = useLocation();

    const minPrice = (arr: IDeviceStorage[]) =>
        arr.reduce((prev, curr) => {
            return prev.price < curr.price ? prev : curr;
        });

    const param = SQ.putParams(search, "set", {
        value: "brands",
        key: "xiaomi",
    });
    console.log(param);

    return (
        <section className={st.root}>
            <h1>{t("productsTitle")}</h1>

            <div className={st.listItems}>
                {devices &&
                    devices.map((device) => (
                        <Product
                            key={device.id}
                            deviceName={device.deviceName}
                            images={device.images}
                            colors={device.specs.deviceColor}
                            price={minPrice(device.specs.storage).price}
                            slug={device.slug}
                        />
                    ))}
            </div>
        </section>
    );
};

export default Products;
