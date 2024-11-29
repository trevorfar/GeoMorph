import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  username: string;
  topScore: number;
};

const initialUserState: UserState = {
  username: localStorage.getItem("username") || "",  // Default is an empty string
  topScore: Number(localStorage.getItem("topScore")) || 0,  // Default top score
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem("username", action.payload);
    },
    setTopScore: (state, action: PayloadAction<number>) => {
      if (action.payload > state.topScore) {
        state.topScore = action.payload; 
        localStorage.setItem("topscore", action.payload.toString());
      }
    },
  },
});

export const { setUsername, setTopScore } = userSlice.actions;

export default userSlice.reducer;
