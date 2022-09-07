import { useEffect, useState } from "react";
import { setActiveFilters } from "../store/slices/filterSlice";
import { useAppDispatch } from "../store/store";
import { IFilterType } from "../types";
import SQ from "./parseSearchQuery";

interface props {
    activeFilters: IFilterType;
    setFilterTypes: (i: IFilterType) => void;
}

export const ParseSearchQueryInMount = ({
    activeFilters,
    setFilterTypes,
}: props) => {
    const dispatch = useAppDispatch();
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
        const brandsParams = SQ.getItems();
        if (brandsParams) {
            dispatch(
                setActiveFilters({ ...activeFilters, ...brandsParams })
            );
            setisMounted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isMounted) {
            setFilterTypes(activeFilters);
            setisMounted(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);
};
