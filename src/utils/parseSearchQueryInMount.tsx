import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setActiveFilters } from "../store/slices/filterSlice";
import { selectProducts } from "../store/slices/productsSlice";
import { useAppDispatch } from "../store/store";
import { IFilterType } from "../types";
import SQ from "./parseSearchQuery";

interface props {
    activeFilters: IFilterType;
}

export const ParseSearchQueryInMount = ({
    activeFilters,
}: props) => {
    const dispatch = useAppDispatch();
    const { filters } = useSelector(selectProducts);
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
        const brandsParams = SQ.getParams();
        if (brandsParams) {
            console.log(brandsParams, filters);
            dispatch(setActiveFilters({ ...activeFilters, ...brandsParams }));
            setisMounted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isMounted) {
            // setFilterTypes(activeFilters);
            dispatch(setActiveFilters(activeFilters))
            setisMounted(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);
};
