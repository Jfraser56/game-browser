import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderBy: "popularity",
  platforms: "",
  releaseDate: "",
};

const searchFiltersSlice = createSlice({
  name: "searchFilters",
  initialState,
  reducers: {
    updateOrderBy: (state, { payload }) => {
      state.orderBy = payload;
    },
    updatePlatforms: (state, { payload }) => {
      state.platforms = payload;
    },
    updateReleaseDate: (state, { payload }) => {
      state.releaseDate = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  orderBy,
  platforms,
  releaseDate,
} = (state) => state.searchFilters;

export const { updateOrderBy, updatePlatforms, updateReleaseDate } =
  searchFiltersSlice.actions;

export default searchFiltersSlice.reducer;
