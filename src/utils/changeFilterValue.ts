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
            : null;

    if (item === null) {
        return { ...activeFilters };
    }

    const findItem = item.find((i) => i === value);
    if (findItem) {
        return id === "cl7onewcbakui0duq4nwe25wo"
            ? {
                  ...activeFilters,
                  brands: [...item.filter((i) => i !== value)],
              }
            : id === "cl7owgcuunfk40atecqpji7au"
            ? {
                  ...activeFilters,
                  ram: [...item.filter((i) => i !== value)],
              }
            : {
                  ...activeFilters,
                  rom: [...item.filter((i) => i !== value)],
              };
    } else {
        return id === "cl7onewcbakui0duq4nwe25wo"
            ? {
                  ...activeFilters,
                  brands: [...item, value],
              }
            : id === "cl7owgcuunfk40atecqpji7au"
            ? {
                  ...activeFilters,
                  ram: [...item, value],
              }
            : {
                  ...activeFilters,
                  rom: [...item, value],
              };
    }
};
