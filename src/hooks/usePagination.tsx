import { limitItems } from "../.config";
import { IDevice } from "../types";

export const usePagination = (data: IDevice[], page: number) => {
    const itemsLimit = limitItems;

    const firstIndex = page === 1 ? 0 : itemsLimit * page - itemsLimit;
    const secondIndex = itemsLimit * page;

    return { data: data.slice(firstIndex, secondIndex) };
};
