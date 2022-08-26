import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectProducts } from "../../store/slices/productsSlice";
import { IDeviceStorage } from "../../types";
import Product from "../Product/Product";
import st from "./Products.module.scss";

const Products = () => {
    const { devices } = useSelector(selectProducts);
    const { t } = useTranslation();

    const minPrice = (arr: IDeviceStorage[]) =>
        arr.reduce((prev, curr) => {
            return prev.price < curr.price ? prev : curr;
        });

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
