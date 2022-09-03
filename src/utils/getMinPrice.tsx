import { IDevice } from "../types";

export const getPrice = (arr: IDevice[], type: "min" | "max") => {
    if (type === "min") {
        return Math.min(...arr.map((i) => i.price));
    } else if (type === "max") {
        return Math.max(...arr.map((o) => o.price));
    } else {
        return 0;
    }
};
