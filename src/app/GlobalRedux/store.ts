import {configureStore} from "@reduxjs/toolkit";
import countrySlice from "./Features/countrySlice";
import userSlice from "./Features/userSlice";

export const store = configureStore({
  reducer: {
    country: countrySlice,
    user: userSlice
  },

}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
