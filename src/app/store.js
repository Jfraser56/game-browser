import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import fetchedDataReducer from "../features/fetchedData/fetchedDataSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    fetchedData: fetchedDataReducer,
  },
});
