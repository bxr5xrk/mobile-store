import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../store/slices/productsSlice";
import { getMinPrice } from "../../utils/getMinPrice";
import Product from "../ProductGridView/ProductGridView";
import ProductListView from "../ProductListView/ProductListView";
import st from "./ProductsList.module.scss";

interface ProductsListProps {
    viewType: number;
}

const ProductsList: FC<ProductsListProps> = ({ viewType }) => {
    const { devices } = useSelector(selectProducts);

    return (
        <section className={st.root}>
            {viewType === 1 ? (
                <div className={st.gridView}>
                    {devices &&
                        devices.map((device) => (
                            <Product
                                key={device.id}
                                deviceName={device.deviceName}
                                images={device.images}
                                colors={device.deviceColor}
                                price={getMinPrice(device.storages)}
                                slug={device.slug}
                            />
                        ))}
                </div>
            ) : (
                <div className={st.listView}>
                    {devices &&
                        devices.map((device) => (
                            <ProductListView
                                key={device.id}
                                deviceName={device.deviceName}
                                images={device.images}
                                colors={device.deviceColor}
                                price={getMinPrice(device.storages)}
                                slug={device.slug}
                                display={device.displaySize}
                                battery={device.battery}
                                proc={device.processor}
                                storages={device.storages}
                            />
                        ))}
                </div>
            )}
        </section>
    );
};

export default ProductsList;
