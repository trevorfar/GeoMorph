import {configureStore} from "@reduxjs/toolkit";
import countrySlice from "./Features/countrySlice";

export const store = configureStore({
  reducer: {
    country: countrySlice
  },
}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
