import { IDevice } from "../types";

export const useFilter = (
    value: string,
    data?: Pick<IDevice, "title" | "fullTitle" | "id" | "brand" | "slug">[]
) => {
    const newValue = value.trim()
    if (newValue.length < 3) {
        return { filteredValues: null };
    }

    const filteredValues =
        data &&
        data.filter(i => `${i.brand} ${i.title}`.toLowerCase().includes(newValue.toLowerCase()))

    return { filteredValues: filteredValues?.length ? filteredValues : null };
};
