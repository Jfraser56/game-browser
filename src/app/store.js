import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import searchFilterReducer from "../features/searchFilters/searchFiltersSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    searchFilters: searchFilterReducer,
  },
});
