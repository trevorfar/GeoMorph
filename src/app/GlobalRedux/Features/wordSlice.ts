import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"



type WordState = {
  targetWord: string
  previousWord: string
  currentGuess: string
  
}

const getRandomCountry = () => {  
  return countries[Math.floor(Math.random() * countries.length)]
}



const initialState: WordState = {
    targetWord: "",
    previousWord: "",
    currentGuess: "",
}

export const submit = createAsyncThunk(
  "word/submit",
  async (_, { dispatch, getState }) => {
    const state = getState() as { word: WordState }

  //   if (state.word.currentGuess.every((letter) => letter !== "")) {
  //     dispatch(setPrevGuess(state.word.currentGuess.join("")));
  // }
  }
)


export const nextGame = createAsyncThunk(
  "word/nextGame",
  async (_, { dispatch, getState }) => {
  }
)

export const endGame = createAsyncThunk(
  "word/endGame",
  async (_, { dispatch, getState }) => {
  }
)


export const skipGame = createAsyncThunk(
  "word/skipGame",
  async (_, { dispatch }) => {
    
  }
)

const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {
    type: (state, action: PayloadAction<string>) => {
      if(state.currentGuess.length < 5){
        state.currentGuess += action.payload;
      }
    },
    del: (state) => {
      state.currentGuess = state.currentGuess.slice(0, -1);
      },
    setPrevGuess: (state, action: PayloadAction<string>) => {
      state.previousWord = action.payload;
    },
    setCurrentGuess: (state, action: PayloadAction<string>) => {
      state.currentGuess = action.payload;
    },
    
    clearGameState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    .addCase(submit.fulfilled, (state) => {

    })
  },
})

export const {
  type,
  del,
  clearGameState,
  setPrevGuess,
  setCurrentGuess
  
} = wordSlice.actions

export default wordSlice.reducer
