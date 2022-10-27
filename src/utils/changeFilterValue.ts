import { IFilterType } from "../types";

export const changeFilterValue = (
    activeFilters: IFilterType,
    id: number,
    value: string
) => {
    const item =
        id === 1
            ? activeFilters.brands
            : id === 2
            ? activeFilters.ram
            : id === 3
            ? activeFilters.rom
            : activeFilters.colors;

    if (item === null) {
        return { ...activeFilters };
    }

    const findItem = item.find((i) => i === value);
    const values = findItem
        ? [...item.filter((i) => i !== value)]
        : [...item, value];

    return id === 1
        ? {
              ...activeFilters,
              brands: values,
          }
        : id === 2
        ? {
              ...activeFilters,
              ram: values,
          }
        : id === 3
        ? {
              ...activeFilters,
              rom: values,
          }
        : {
              ...activeFilters,
              colors: values,
          };
};
