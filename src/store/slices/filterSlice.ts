import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortingTypes } from "../../.config";
import { RootState } from "../store";

interface IFilter {
    sortingType: string;
}

const initialState: IFilter = {
    sortingType: sortingTypes[0].value,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSortingType(state, action: PayloadAction<string>) {
            state.sortingType = action.payload;
        },
    },
});

export const { setSortingType } = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
