import { IFilterType } from "../types";

export const changeFilterValue = (
    activeFilters: IFilterType,
    id: string,
    value: string
) => {
    const item =
        id === "cl7onewcbakui0duq4nwe25wo"
            ? activeFilters.brands
            : id === "cl7owgcuunfk40atecqpji7au"
            ? activeFilters.ram
            : id === "cl7owj2ikwyjj0atcizfjeqpp"
            ? activeFilters.rom
            : activeFilters.colors;

    if (item === null) {
        return { ...activeFilters };
    }

    const findItem = item.find((i) => i === value);
    const values = findItem
        ? [...item.filter((i) => i !== value)]
        : [...item, value];

    return id === "cl7onewcbakui0duq4nwe25wo"
        ? {
              ...activeFilters,
              brands: values,
          }
        : id === "cl7owgcuunfk40atecqpji7au"
        ? {
              ...activeFilters,
              ram: values,
          }
        : id === "cl7owj2ikwyjj0atcizfjeqpp"
        ? {
              ...activeFilters,
              rom: values,
          }
        : {
              ...activeFilters,
              colors: values,
          };
};
