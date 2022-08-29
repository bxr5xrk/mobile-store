import { Service } from "./../../api/AlloService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDevice } from "../../types";
import { RootState } from "../store";

interface IDevices {
    devices: null | IDevice[];
    status: "loading" | "success" | "rejected";
}

const initialState: IDevices = {
    devices: null,
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
        });
        builder.addCase(
            Service.fetchProducts.fulfilled,
            (state, action: PayloadAction<IDevice[]>) => {
                state.status = "success";
                state.devices = action.payload;
            }
        );
        builder.addCase(Service.fetchProducts.rejected, (state) => {
            state.status = "rejected";
            state.devices = [];
        });
    },
});

export const { setDevices } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
