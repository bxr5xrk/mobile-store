import { IDevice } from "../types/index";

interface sortedItemsProps {
    devices: IDevice[];
    sortingType: string;
    priceValues: { min: number; max: number };
    brands: string[];
    ram: string[];
    rom: string[];
    colors: string[];
}

export const sortItems = ({
    devices,
    sortingType,
    priceValues,
    brands,
    ram,
    rom,
    colors,
}: sortedItemsProps) => {
    const sortedArr = [...devices]
        .filter((i) => i.price >= priceValues.min && i.price <= priceValues.max)
        .filter((i) => (brands.length ? brands.includes(i.brand) : i))
        .filter((i) => (ram.length ? ram.includes(i.storage.split("-")[0]) : i))
        .filter((i) =>
            rom.length ? rom.includes(i.storage.split("-")[1]) : i
        );

    const col = () => {
        const withColorsArr: IDevice[] = [];
        sortedArr.filter((i) =>
            colors.length
                ? i.deviceColors.map(
                      (j) =>
                          colors.includes(j.color.hex) && withColorsArr.push(i)
                  )
                : withColorsArr.push(i)
        );

        return withColorsArr.reduce((acc: IDevice[], current) => {
            if (!acc.find((i) => i.id === current.id)) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
    };

    const withColorsArr = col();

    if (sortingType === "popularity") {
        return withColorsArr.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortingType === "priceDesc") {
        return withColorsArr.sort((a, b) => b.price - a.price);
    } else if (sortingType === "priceAsc") {
        return withColorsArr.sort((a, b) => a.price - b.price);
    } else if (sortingType === "time") {
        return withColorsArr.sort((a, b) =>
            b.additionDate.localeCompare(a.additionDate)
        );
    } else {
        return withColorsArr;
    }
};
