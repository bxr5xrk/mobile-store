import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortingTypes } from "../../.config";
import { IFilterType } from "../../types";
import { RootState } from "../store";

interface IPrice {
    min: number;
    max: number;
}

interface IFilter {
    sortingType: string;
    priceValues: IPrice;
    activeFilters: IFilterType;
}

const initialState: IFilter = {
    sortingType: sortingTypes[0].value,
    priceValues: { min: 0, max: 100_000 },
    activeFilters: {
        brands: [],
        rom: [],
        ram: [],
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
        setActiveFilters(state, action: PayloadAction<IFilterType>) {
            state.activeFilters = action.payload;
        },
    },
});

export const { setSortingType, setPrice, setActiveFilters } =
    filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
