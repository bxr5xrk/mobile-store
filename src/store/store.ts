import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import filterSlice from "./slices/filterSlice";
import watchlistSlice from "./slices/watchlistSlice";

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        watchlist: watchlistSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
