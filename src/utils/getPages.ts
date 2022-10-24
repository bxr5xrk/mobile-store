export const getPages = (totalItems: number) => {
    const divideToLimit = totalItems / 3;
    if (+divideToLimit === divideToLimit && divideToLimit % 1 !== 0) {
        return Math.floor(divideToLimit) + 1;
    } else {
        return divideToLimit;
    }
};
