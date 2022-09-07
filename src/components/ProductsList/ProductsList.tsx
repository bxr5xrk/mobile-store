import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectFilter } from "../../store/slices/filterSlice";
import { selectProducts } from "../../store/slices/productsSlice";
import { selectProductsView } from "../../store/slices/productsViewSlice";
import { sortItems } from "../../utils/sortItems";
import Product from "../ProductGridView/ProductGridView";
import ProductListView from "../ProductListView/ProductListView";
import st from "./ProductsList.module.scss";

const ProductsList: FC = () => {
    const { devices } = useSelector(selectProducts);
    const { activeView } = useSelector(selectProductsView);
    const { sortingType, priceValues, activeFilters } =
        useSelector(selectFilter);

    return (
        <section className={st.root}>
            {activeView === 1 ? (
                <div className={st.gridView}>
                    {devices &&
                        sortItems({
                            devices,
                            sortingType,
                            priceValues,
                            brands: activeFilters.brands,
                            ram: activeFilters.ram,
                            rom: activeFilters.rom,
                            colors: activeFilters.colors,
                        }).map((device) => (
                            <Product
                                key={device.id}
                                fullTitle={device.fullTitle}
                                images={device.images}
                                colors={device.deviceColors}
                                price={String(device.price)}
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
                                title={device.title}
                                images={device.images}
                                colors={device.deviceColors}
                                price={String(device.price)}
                                slug={device.slug}
                                display={device.displaySize}
                                battery={device.battery}
                                proc={device.processor}
                                storage={device.storage}
                            />
                        ))}
                </div>
            )}
        </section>
    );
};

export default ProductsList;
