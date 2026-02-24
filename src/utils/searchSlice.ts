import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
    [key: string]: string[];
}

const initialState: SearchState = {};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        cacheResults: (state: SearchState, action) => {
            return { ...state, ...action.payload }
        }
    }
})

export const { cacheResults } = searchSlice.actions;

export default searchSlice.reducer;