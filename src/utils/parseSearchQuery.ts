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

    static get = (query: string) => {
        const queryRe = /^\?(\w*=([\w|]*&))*(\w*=([\w|]*))$/g;

        if (query.match(queryRe)) {
            return this.parseToObj();
        } else {
            throw new Error("Incorrect search query format");
        }
    };

    static getItem = (value: string) => {
        const query = window.location.search;
        const re = new RegExp(`${value}=([\\w,]+)`);
        const match = query.match(re);

        return match ? match[1].split(",") : null;
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

            let result = "?";
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
