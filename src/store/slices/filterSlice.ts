import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortingTypes } from "../../.config";
import { RootState } from "../store";

interface IPrice {
    min: number;
    max: number;
}

interface IFilter {
    sortingType: string;
    price: IPrice;
}

const initialState: IFilter = {
    sortingType: sortingTypes[0].value,
    price: { min: 0, max: 100_000 },
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSortingType(state, action: PayloadAction<string>) {
            state.sortingType = action.payload;
        },
        setPrice(state, action: PayloadAction<IPrice>) {
            state.price = action.payload;
        },
    },
});

export const { setSortingType, setPrice } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
