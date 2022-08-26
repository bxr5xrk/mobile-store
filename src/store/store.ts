import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsSlice from "./slices/productsSlice";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
    reducer: { theme: themeSlice, products: productsSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
