import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backgroundImage: "",
};

export const appBackgroundSlice = createSlice({
  name: "appBackground",
  initialState,
  reducers: {
    setAppBackgroundImage: (state, { payload }) => {
      state.backgroundImage = payload;
    },
  },
});

export const { backgroundImage } = (state) => state.appBackground;

export const { setAppBackgroundImage } = appBackgroundSlice.actions;

export default appBackgroundSlice.reducer;
