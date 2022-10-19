import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const getWatchlistItems = (): string[] | null => {
    const data = localStorage.getItem("watchlist");
    return data ? JSON.parse(data) : null;
};

interface IWatchlist {
    watchlist: string[] | null;
}

const initialState: IWatchlist = {
    watchlist: getWatchlistItems(),
};

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        setWatchlistItem(state, action: PayloadAction<string>) {
            if (state.watchlist) {
                const findItem = state.watchlist.find(
                    (i) => i === action.payload
                );
                if (findItem) {
                    state.watchlist = state.watchlist.filter(
                        (i) => i !== action.payload
                    );
                } else {
                    state.watchlist = [...state.watchlist, action.payload];
                }
            } else {
                state.watchlist = [action.payload];
            }
            localStorage.setItem(
                "watchlist",
                JSON.stringify([...state.watchlist])
            );
        },
    },
});

export const { setWatchlistItem } = watchlistSlice.actions;

export const selectWatchlist = (state: RootState) => state.watchlist;

export default watchlistSlice.reducer;
