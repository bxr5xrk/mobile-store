import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../store/slices/productsSlice";
import { IDeviceStorage } from "../../types";
import Product from "../ProductGridView/ProductGridView";
import ProductListView from "../ProductListView/ProductListView";
import st from "./ProductsList.module.scss";

interface ProductsListProps {
    viewType: number;
}

const ProductsList: FC<ProductsListProps> = ({ viewType }) => {
    const { devices } = useSelector(selectProducts);

    const minPrice = (arr: IDeviceStorage[]) =>
        arr.reduce((prev, curr) => {
            return prev.price < curr.price ? prev : curr;
        });

    return (
        <section className={st.root}>
            {viewType === 1 ? (
                <div className={st.listView}>
                    {devices &&
                        devices.map((device) => (
                            <Product
                                key={device.id}
                                deviceName={device.deviceName}
                                images={device.images}
                                colors={device.deviceColor}
                                price={minPrice(device.storages).price}
                                slug={device.slug}
                            />
                        ))}
                </div>
            ) : (
                <div className={st.gridView}>
                    {devices &&
                        devices.map((device) => (
                            <ProductListView
                                key={device.id}
                                deviceName={device.deviceName}
                                images={device.images}
                                colors={device.deviceColor}
                                price={minPrice(device.storages).price}
                                slug={device.slug}
                            />
                        ))}
                </div>
            )}
        </section>
    );
};

export default ProductsList;
