import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortingTypes } from "../../.config";
import { RootState } from "../store";

interface IPrice {
    min: number;
    max: number;
}

export interface IValues {
    title: string;
    isActive: boolean;
}

interface IFilterType {
    id: number;
    title: { en: string; uk: string };
    values: IValues[] | null;
}

export interface IFilterTypes {
    brands: IFilterType;
    processor: IFilterType;
}

interface IFilter {
    sortingType: string;
    priceValues: IPrice;
    filterTypes: IFilterTypes;
}

const initialState: IFilter = {
    sortingType: sortingTypes[0].value,
    priceValues: { min: 0, max: 100_000 },
    filterTypes: {
        brands: {
            id: 1,
            title: { en: "Brands", uk: "Виробники" },
            values: null,
        },
        processor: {
            id: 2,
            title: { en: "Processor", uk: "Процесор" },
            values: null,
        },
    },
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSortingType(state, action: PayloadAction<string>) {
            state.sortingType = action.payload;
        },
        setPrice(state, action: PayloadAction<IPrice>) {
            state.priceValues = action.payload;
        },
        setFilters(state, action: PayloadAction<IFilterTypes>) {
            state.filterTypes = action.payload;
        },
    },
});

export const { setSortingType, setPrice, setFilters } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
