import { IFilterType } from "./../types/index";
export default class SQ {
    static parseToObj = () => {
        const re = /(\w+=([\w,]+))/g;
        const parsedData: { value: string; key: string[] }[] = [];
        const params = window.location.search.match(re);
        if (params) {
            params.forEach((i) => {
                const item = i.split("=");
                const keys = item[1].split(",");
                parsedData.push({ value: item[0], key: keys });
            });
            return parsedData;
        }
    };

    static setParams = (items: IFilterType) => {
        const newObj = [];
        items.brands.length &&
            newObj.push({ value: "brands", key: items.brands });
        items.ram.length && newObj.push({ value: "ram", key: items.ram });
        items.rom.length && newObj.push({ value: "rom", key: items.rom });
        items.colors.length &&
            newObj.push({
                value: "colors",
                key: items.colors.map((i) => i.slice(1)),
            });

        let result = "?";
        newObj.forEach((i) => {
            result +=
                i.value +
                "=" +
                `${i.key.length === 1 ? `${i.key}&` : `${i.key.join(",")}&`}`;
        });
        return result.slice(0, -1);
    };

    static getParams = () => {
        const re = /(\w+=([\w,]+))/g;
        const parsedData: {
            brands: string[];
            rom: string[];
            ram: string[];
            colors: string[];
        } = {
            brands: [],
            rom: [],
            ram: [],
            colors: [],
        };
        const params = window.location.search.match(re);
        if (params) {
            params.forEach((i) => {
                const item = i.split("=");
                const keys = item[1].split(",");
                if (item[0] === "brands") {
                    parsedData.brands = keys;
                } else if (item[0] === "ram") {
                    parsedData.ram = keys;
                } else if (item[0] === "rom") {
                    parsedData.rom = keys;
                } else if (item[0] === "colors") {
                    parsedData.colors = keys.map((i) => "#" + i);
                } else {
                    return null;
                }
            });
            return parsedData;
        } else {
            return null;
        }
    };
}
