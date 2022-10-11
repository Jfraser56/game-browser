import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";
import fetchedDataReducer from "../features/fetchedData/fetchedDataSlice";
import appBackgroundReducer from "../features/appBackground/appBackgroundSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    fetchedData: fetchedDataReducer,
    appBackground: appBackgroundReducer,
  },
});
