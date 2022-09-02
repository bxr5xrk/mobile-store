import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectFilter } from "../../store/slices/filterSlice";
import { selectProducts } from "../../store/slices/productsSlice";
import { getMinPrice } from "../../utils/getMinPrice";
import { sortItems } from "../../utils/sortItems";
import Product from "../ProductGridView/ProductGridView";
import ProductListView from "../ProductListView/ProductListView";
import st from "./ProductsList.module.scss";

interface ProductsListProps {
    viewType: number;
}

const ProductsList: FC<ProductsListProps> = ({ viewType }) => {
    const { devices } = useSelector(selectProducts);
    const { sortingType, price } = useSelector(selectFilter);

    return (
        <section className={st.root}>
            {viewType === 1 ? (
                <div className={st.gridView}>
                    {devices &&
                        sortItems({ devices, sortingType, price }).map((device) => (
                            <Product
                                key={device.id}
                                deviceName={device.deviceName}
                                images={device.images}
                                colors={device.deviceColor}
                                price={String(
                                    getMinPrice(device.storages, "str")
                                )}
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
                                price={String(
                                    getMinPrice(device.storages, "str")
                                )}
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
