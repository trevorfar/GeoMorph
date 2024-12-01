import {configureStore} from "@reduxjs/toolkit";
import wordSlice from "./Features/wordSlice";
import userSlice from "./Features/userSlice";

export const store = configureStore({
  reducer: {
    word: wordSlice,
    user: userSlice
  },

}); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
