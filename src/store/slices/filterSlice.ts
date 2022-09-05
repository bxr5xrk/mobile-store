import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortingTypes } from "../../.config";
import { RootState } from "../store";

interface IPrice {
    min: number;
    max: number;
}

interface IFilterType {
    brands: string[];
    processors: string[];
}

interface IFilter {
    sortingType: string;
    priceValues: IPrice;
    filterTypes: IFilterType;
}

const initialState: IFilter = {
    sortingType: sortingTypes[0].value,
    priceValues: { min: 0, max: 100_000 },
    filterTypes: {
        brands: [],
        processors: [],
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
        setFilters(state, action: PayloadAction<IFilterType>) {
            state.filterTypes = action.payload;
        },
    },
});

export const { setSortingType, setPrice, setFilters } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
