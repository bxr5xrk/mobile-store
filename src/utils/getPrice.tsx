export const getPrice = (arr: number[], type: "min" | "max") => {
    if (type === "min") {
        return Math.min(...arr);
    } else if (type === "max") {
        return Math.max(...arr);
    } else {
        return 0;
    }
};
