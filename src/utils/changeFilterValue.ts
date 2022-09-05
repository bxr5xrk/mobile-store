import { IFilterType } from "../store/slices/filterSlice";

export const changeFilterValue = (
    activeFilters: IFilterType,
    title: string,
    value: string
) => {
    if (title === "Brands") {
        const findItem = activeFilters.brands.find((i) => i === value);
        if (findItem) {
            return {
                ...activeFilters,
                brands: [...activeFilters.brands.filter((i) => i !== value)],
            };
        } else {
            return {
                ...activeFilters,
                brands: [...activeFilters.brands, value],
            };
        }
    } else if (title === "Processors") {
        const findItem = activeFilters.processors.find((i) => i === value);
        if (findItem) {
            return {
                ...activeFilters,
                processors: [
                    ...activeFilters.processors.filter((i) => i !== value),
                ],
            };
        } else {
            return {
                ...activeFilters,
                processors: [...activeFilters.processors, value],
            };
        }
    } else {
        return { ...activeFilters };
    }
};
