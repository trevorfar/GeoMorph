import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  username: string;
};

const initialUserState: UserState = {
  username: ""
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      typeof window !== "undefined" ? localStorage.setItem("username", action.payload) : undefined;
    },
  },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
