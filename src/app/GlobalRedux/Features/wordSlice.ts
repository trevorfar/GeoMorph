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

function containsTwoLetters(inp1: string, inp2: string): boolean {
  let count = 0;
  if(inp1.length == 0){
    return true;
  }
  for (const char of inp2){
    if(inp1.includes(char)){
      count++
    }
    if(count >= 2){
      return true;
    }
  }
  return false;
}
function validateInput(input: string):boolean {
  if(input.length === 5){    
    return true
  }else {
    return false
  }
}

export const submit = createAsyncThunk(
  "word/submit",
  async (_, { dispatch, getState }) => {
    const state = getState() as { word: WordState }
    if(validateInput(state.word.currentGuess) && containsTwoLetters(state.word.previousWord, state.word.currentGuess)){
      dispatch(setPrevGuess(state.word.currentGuess));
      dispatch(setCurrentGuess(""));
    }else {
      return
    }
  }
)


export const nextGame = createAsyncThunk(
  "word/nextGame",
  async (_, { dispatch, getState }) => {  
      dispatch(setTargetWord(getRandomCountry()));
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
    setTargetWord: (state, action: PayloadAction<string>) => {
      state.targetWord = action.payload;
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
  setCurrentGuess,
  setTargetWord
  
} = wordSlice.actions

export default wordSlice.reducer
