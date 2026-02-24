import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  isMenuOpen: boolean;
}

const initialState: AppState = {
  isMenuOpen: true,
};

const appSclice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = appSclice.actions;
export default appSclice.reducer;
