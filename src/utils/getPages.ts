export const getPages = (totalItems: number, limit: number) => {
    const divideToLimit = totalItems / limit;
    if (+divideToLimit === divideToLimit && divideToLimit % 1 !== 0) {
        return Math.floor(divideToLimit) + 1;
    } else {
        return divideToLimit;
    }
};
