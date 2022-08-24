export const Cookie = (value: string) => {
    const result = document.cookie.match(new RegExp(value + "=[^;]+", "g"));

    return result ? result.join("").split(/=(.+)$/)[1] : "";
};
