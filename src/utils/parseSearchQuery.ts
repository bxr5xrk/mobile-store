export default class SQ {
    static parseToObj = (query: string) => {
        const re = /([\w=|]*)/g;
        const parsedData: { value: string; key: string[] }[] = [];

        const params = query.match(re);
        if (params) {
            params.filter((i) => i);

            params.forEach((i) => {
                const item = i.split("=");
                const keys = item[1].split("|");
                parsedData.push({ value: item[0], key: keys });
            });
            return parsedData;
        }
    };

    static getParams = (query: string) => {
        const queryRe = /^\?(\w*=([\w|]*&))*(\w*=([\w|]*))$/g;

        if (query.match(queryRe)) {
            return this.parseToObj(query);
        } else {
            throw new Error("Incorrect search query format");
        }
    };
    static putParams = (
        query: string,
        type: "set" | "remove",
        newParams: { value: string; key: string }
    ) => {
        const parsedData = this.parseToObj(query);

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
