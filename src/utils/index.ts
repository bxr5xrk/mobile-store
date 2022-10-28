import { viewTypes } from "../.config";

export const cl = (styles: string[]) => styles.join(" ");

export const getActiveView = () =>
    Number(localStorage.getItem("viewType")) || viewTypes[0].id;
