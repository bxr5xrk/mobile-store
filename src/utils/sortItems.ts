import { IDevice } from "../types/index";

interface sortedItemsProps {
    devices: IDevice[];
    sortingType: string;
    priceValues: { min: number; max: number };
    brands: string[];
    ram: string[];
    rom: string[];
}

export const sortItems = ({
    devices,
    sortingType,
    priceValues,
    brands,
    ram,
    rom,
}: sortedItemsProps) => {
    const sortedArr = [...devices]
        .filter((i) => i.price >= priceValues.min && i.price <= priceValues.max)
        .filter((i) => (brands.length ? brands.includes(i.brand) : i))
        .filter((i) => (ram.length ? ram.includes(i.storage.split("-")[0]) : i))
        .filter((i) =>
            rom.length ? rom.includes(i.storage.split("-")[1]) : i
        );

    if (sortingType === "popularity") {
        return sortedArr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingType === "priceDesc") {
        return sortedArr.sort((a, b) => b.price - a.price);
    } else if (sortingType === "priceAsc") {
        return sortedArr.sort((a, b) => a.price - b.price);
    } else if (sortingType === "time") {
        return sortedArr.sort((a, b) =>
            b.additionDate.localeCompare(a.additionDate)
        );
    } else {
        return sortedArr;
    }
};
