import { IAllData, IFilter } from "./../../types/index";
import { Service } from "./../../api/AlloService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDevice } from "../../types";
import { RootState } from "../store";

interface IData {
    devices: null |IDevice[];
    filters: null | IFilter[];
    status: "loading" | "success" | "rejected";
}

const initialState: IData = {
    devices: null,
    filters: null,
    status: "loading",
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setDevices(state, action) {
            state.devices = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(Service.fetchProducts.pending, (state) => {
            state.status = "loading";
            state.devices = [];
            state.filters = [];
        });
        builder.addCase(
            Service.fetchProducts.fulfilled,
            (state, action: PayloadAction<IAllData>) => {
                state.status = "success";
                state.devices = action.payload.devices;
                state.filters = action.payload.filterTypes;
            }
        );
        builder.addCase(Service.fetchProducts.rejected, (state) => {
            state.status = "rejected";
            state.devices = [];
            state.filters = [];
        });
    },
});

export const { setDevices } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
