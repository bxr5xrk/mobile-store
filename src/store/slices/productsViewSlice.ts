import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { viewTypes } from "../../.config";

const initialState = {
    activeView: Number(localStorage.getItem("viewType")) || viewTypes[0].id,
};

const productsViewSlice = createSlice({
    name: "productsView",
    initialState,
    reducers: {
        setActiveView(state, action: PayloadAction<number>) {
            state.activeView = action.payload;
        },
    },
});

export const { setActiveView } = productsViewSlice.actions;

export const selectProductsView = (state: RootState) => state.productsView;

export default productsViewSlice.reducer;
