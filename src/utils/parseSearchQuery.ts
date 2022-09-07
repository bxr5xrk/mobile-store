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

    static get = () => {
        // const queryRe = /(\w+=([\w,]+))/g;

        // if (window.location.search.match(queryRe)) {
        return this.parseToObj();
        // } else {
        // throw new Error("Incorrect search query format");
        // }
    };

    static getItem = (value: string) => {
        const query = window.location.search;
        const re = new RegExp(`${value}=([\\w,]+)`);
        const match = query.match(re);

        return match ? match[1].split(",") : null;
    };

    static putItems = (items: IFilterType) => {
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

    static getItems = () => {
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
                }
            });
            return parsedData;
        } else {
            return null;
        }
    };

    static putItem = (param: string, paramValues: string[]) => {
        const parsedData = this.parseToObj();

        if (parsedData) {
            const findItem = parsedData.find((i) => i.value === param);
            if (findItem) {
                const index = parsedData.indexOf(findItem);
                parsedData.splice(index, 1);

                findItem.key = [...paramValues];

                parsedData.splice(index, 0, findItem);
            } else {
                parsedData.push({
                    value: param,
                    key: [...paramValues],
                });
            }

            let result = "";
            // "?" + window.location.search + window.location.search
            //     ? "&"
            //     : "";
            parsedData.forEach((i) => {
                result +=
                    i.value +
                    "=" +
                    `${
                        i.key.length === 1 ? `${i.key}&` : `${i.key.join(",")}&`
                    }`;
            });
            return result.slice(0, -1);
        } else {
            return `?${param}=${paramValues.join(",")}`;
        }
    };

    static put = (
        query: string,
        type: "set" | "remove",
        newParams: { value: string; key: string }
    ) => {
        const parsedData = this.parseToObj();

        if (parsedData) {
            const findItem = parsedData.find(
                (i) => i.value === newParams.value
            );

            if (type === "set") {
                if (findItem) {
                    const index = parsedData.indexOf(findItem);
                    parsedData.splice(index, 1);

                    findItem.key = [...findItem.key, newParams.key];

                    parsedData.splice(index, 0, findItem);
                } else {
                    parsedData.push({
                        value: newParams.value,
                        key: [newParams.key],
                    });
                }
            } else if (type === "remove" && findItem) {
                const index = parsedData.indexOf(findItem);
                parsedData.splice(index, 1);

                if (newParams.key === "") {
                    parsedData.splice(index, 1);
                } else {
                    findItem.key = [
                        ...findItem.key.filter((i) => i !== newParams.key),
                    ];

                    parsedData.splice(index, 0, findItem);
                }
            }

            let result = "?";
            parsedData.forEach((i) => {
                result +=
                    i.value +
                    "=" +
                    `${
                        i.key.length === 1 ? `${i.key}&` : `${i.key.join("|")}&`
                    }`;
            });
            return result.slice(0, -1);
        }
    };
}
