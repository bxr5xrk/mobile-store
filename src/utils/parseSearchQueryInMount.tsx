import { useEffect, useState } from "react";
import { setActiveFilters } from "../store/slices/filterSlice";
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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const brandsParams = SQ.getParams();
        if (brandsParams) {
            dispatch(setActiveFilters({ ...activeFilters, ...brandsParams }));
            setIsMounted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isMounted) {
            // setFilterTypes(activeFilters);
            dispatch(setActiveFilters(activeFilters))
            setIsMounted(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);
};
