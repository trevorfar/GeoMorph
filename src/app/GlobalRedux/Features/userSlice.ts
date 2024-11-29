import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  username: string;
  highscore: number;
};

const initialUserState: UserState = {
  username: typeof window !== "undefined" ? localStorage.getItem("username") || "" : "",  // Default is an empty string
  highscore: typeof window !== "undefined" ? Number(localStorage.getItem("highscore")) || 0 : 0,  // Default top score
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      typeof window !== "undefined" ? localStorage.setItem("username", action.payload) : undefined;
    },
    setHighscore: (state, action: PayloadAction<number>) => {
      //if (action.payload > state.highscore) {
        state.highscore = action.payload; 
        typeof window !== "undefined" ? localStorage.setItem("highscore", action.payload.toString()) : undefined;
      //}
    },
  },
});

export const { setUsername, setHighscore } = userSlice.actions;

export default userSlice.reducer;
