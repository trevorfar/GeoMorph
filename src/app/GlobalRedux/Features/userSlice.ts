import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  username: string;
  topScore: number;
};

const initialUserState: UserState = {
  username: typeof window !== "undefined" ? localStorage.getItem("username") || "" : "",  // Default is an empty string
  topScore: typeof window !== "undefined" ? Number(localStorage.getItem("topScore")) || 0 : 0,  // Default top score
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      typeof window !== "undefined" ? localStorage.setItem("username", action.payload) : undefined;
    },
    setTopScore: (state, action: PayloadAction<number>) => {
      if (action.payload > state.topScore) {
        state.topScore = action.payload; 
        typeof window !== "undefined" ? localStorage.setItem("topscore", action.payload.toString()) : undefined;
      }
    },
  },
});

export const { setUsername, setTopScore } = userSlice.actions;

export default userSlice.reducer;
