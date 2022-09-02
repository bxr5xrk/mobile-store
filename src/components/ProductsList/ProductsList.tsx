import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../../store/slices/productsSlice";
import { getMinPrice } from "../../utils/getMinPrice";
import { sortedItems } from "../../utils/sortedItems";
import Product from "../ProductGridView/ProductGridView";
import ProductListView from "../ProductListView/ProductListView";
import st from "./ProductsList.module.scss";

interface ProductsListProps {
    viewType: number;
    sortingType: string;
}

const ProductsList: FC<ProductsListProps> = ({ viewType, sortingType }) => {
    const { devices } = useSelector(selectProducts);
    console.log(devices?.map((i) => i.addingDate + i.deviceName));

    return (
        <section className={st.root}>
            {viewType === 1 ? (
                <div className={st.gridView}>
                    {devices &&
                        sortedItems({ devices, sortingType }).map((device) => (
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
