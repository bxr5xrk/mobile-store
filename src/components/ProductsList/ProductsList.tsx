import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Service } from "../../api/AlloService";
import { usePagination } from "../../hooks/usePagination";
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

    const { data: tmpData } = Service.fetchAllDevices();

    const { activeView } = useSelector(selectProductsView);
    const { sortingType, priceValues, activeFilters } =
        useSelector(selectFilter);

    useEffect(() => {
        const query = SQ.setParams(activeFilters);
        navigate(`.${query}`);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilters]);

    const { data: devices, totalPages } = usePagination(
        sortItems(
            {
                data: tmpData ? tmpData : [],
                sortingType,
                priceValues,
                brands: activeFilters.brands,
                ram: activeFilters.ram,
                rom: activeFilters.rom,
                colors: activeFilters.colors,
            } || []
        ),
        currentPage
    );

    return (
        <section className={st.root}>
            {activeView === 1 ? (
                <div className={st.gridView}>
                    {devices &&
                        devices.map((device) => (
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
