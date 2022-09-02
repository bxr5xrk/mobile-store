import { IDeviceStorage } from "../types";

export const getMinPrice = (arr: IDeviceStorage[], type: "num" | "str") => {
    if (type === "num") {
        return arr.reduce((prev, curr) => {
            return prev.price < curr.price ? prev : curr;
        }).price;
    } else {
        const num = String(
            arr.reduce((prev, curr) => {
                return prev.price < curr.price ? prev : curr;
            }).price
        );
        if (num.length === 4) {
            return [num.slice(0, 1), " ", num.slice(1)].join("");
        } else if (num.length === 5) {
            return [num.slice(0, 2), " ", num.slice(2)].join("");
        } else {
            return num;
        }
    }
};
