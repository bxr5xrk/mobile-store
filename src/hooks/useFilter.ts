import { IDevice } from "../types";

export const useFilter = (value: string, data?: IDevice[]) => {
    const newValue = value.trim();
    if (newValue.length < 3) {
        return { filteredValues: null };
    }

    const filteredValues =
        data &&
        data.filter(
            (i) =>
                i.title.toLowerCase().includes(value.toLowerCase()) ||
                i.brand.toLowerCase().includes(value.toLowerCase())
        );
    return { filteredValues: filteredValues?.length ? filteredValues : null };
};
