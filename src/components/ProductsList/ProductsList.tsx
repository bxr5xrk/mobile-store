import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Service } from "../../api/AlloService";
import { selectFilter } from "../../store/slices/filterSlice";
import { selectProductsView } from "../../store/slices/productsViewSlice";
import SQ from "../../utils/parseSearchQuery";
import { sortItems } from "../../utils/sortItems";
import Pagination from "../Pagination";
import ProductGridView from "../ProductGridView/ProductGridView";
import ProductListView from "../ProductListView/ProductListView";
import st from "./ProductsList.module.scss";

const ProductsList: FC = () => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const { data, totalPages } = Service.fetchAllDevices({ page: currentPage });

    const { activeView } = useSelector(selectProductsView);
    const { sortingType, priceValues, activeFilters } =
        useSelector(selectFilter);

    useEffect(() => {
        const query = SQ.setParams(activeFilters);
        navigate(`.${query}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilters]);

    return (
        <section className={st.root}>
            {activeView === 1 ? (
                <div className={st.gridView}>
                    {data &&
                        sortItems({
                            data,
                            sortingType,
                            priceValues,
                            brands: activeFilters.brands,
                            ram: activeFilters.ram,
                            rom: activeFilters.rom,
                            colors: activeFilters.colors,
                        }).map((device) => (
                            <ProductGridView
                                key={device.id}
                                fullTitle={device.fullTitle}
                                images={device.images}
                                colors={device.deviceColors}
                                price={String(device.price)}
                                slug={device.slug}
                                id={device.id}
                            />
                        ))}
                </div>
            ) : (
                <div className={st.listView}>
                    {data &&
                        data.map((device) => (
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
            {totalPages && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </section>
    );
};

export default ProductsList;
