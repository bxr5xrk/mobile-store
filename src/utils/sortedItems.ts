import { getMinPrice } from "./getMinPrice";
import { IDevice } from "./../types/index";

interface sortedItemsProps {
    devices: IDevice[];
    sortingType: string;
}

export const sortedItems = ({ devices, sortingType }: sortedItemsProps) => {
    const sortedArr = [...devices];

    if (sortingType === "popularity") {
        return sortedArr.sort((a, b) =>
            a.deviceName.localeCompare(b.deviceName)
        );
    } else if (sortingType === "priceDesc") {
        return sortedArr.sort(
            (a, b) =>
                Number(getMinPrice(b.storages, "num")) -
                Number(getMinPrice(a.storages, "num"))
        );
    } else if (sortingType === "priceAsc") {
        return sortedArr.sort(
            (a, b) =>
                Number(getMinPrice(a.storages, "num")) -
                Number(getMinPrice(b.storages, "num"))
        );
    } else if (sortingType === "time") {
        return sortedArr.sort((a, b) =>
            b.addingDate.localeCompare(a.addingDate)
        );
    } else {
        return sortedArr;
    }
};
