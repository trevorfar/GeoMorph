import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"



type WordState = {
  targetWord: string
  previousWord: string
  currentGuess: string[]
  lockedIndecies: number[]
  selectedIndecies: number[]
  
}

const getRandomCountry = () => {  
  return countries[Math.floor(Math.random() * countries.length)]
}



const initialState: WordState = {
    targetWord: "",
    previousWord: "",
    currentGuess: Array(5).fill(""),
    lockedIndecies: Array(5).fill(0),
    selectedIndecies: Array(5).fill(0)
  }

function containsTwoLetters(inp1: string, inp2: string): boolean {
  let count = 0;
  if(inp1.length == 0){
    return true;
  }

  for (let i = 0; i < 5; i++){
    if(inp1[i].toLowerCase() === inp2[i].toLowerCase()){
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
    // const state = getState() as { word: WordState }
    // if(validateInput(state.word.currentGuess) && containsTwoLetters(state.word.previousWord, state.word.currentGuess)){
    //   dispatch(setPrevGuess(state.word.currentGuess));
    //   dispatch(setCurrentGuess(""));
    // }else {
    //   return
    // }
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
    type: (state, action) => {
      const { letter, index } = action.payload
      if (state.lockedIndecies[index] === 0) {
        state.currentGuess[index] = letter;
    }   
   },
    del: (state, action) => {
      const { index } = action.payload
      if (state.lockedIndecies[index] === 0) {
        state.currentGuess[index] = ""; 
    }
    },
    setPrevGuess: (state, action: PayloadAction<string>) => {
      state.previousWord = action.payload;
    },
    setCurrentGuess: (state, action: PayloadAction<string[]>) => {
      state.currentGuess = action.payload;
    },
    swapLetters: (state, action: PayloadAction<[number, number]>) => {
      const [index1, index2] = action.payload;
      if (index1 >= 0 && index2 >= 0) {
          const temp = state.currentGuess[index1];
          state.currentGuess[index1] = state.currentGuess[index2];
          state.currentGuess[index2] = temp;
      }
    },
    setTargetWord: (state, action: PayloadAction<string>) => {
      state.targetWord = action.payload;
    },
    lockIndex: (state, action: PayloadAction<number>) => {
      if(state.lockedIndecies[action.payload] === 1){
        state.lockedIndecies[action.payload] = 0;
      }else {
        state.lockedIndecies[action.payload] = 1;
      }
    },
    selectIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndecies[action.payload] = 1;
    },
    deselectIndex: (state, action: PayloadAction<number>) => {
      state.selectedIndecies[action.payload] = 0;

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
  setTargetWord,
  lockIndex,
  swapLetters,
  selectIndex,
  deselectIndex
  
} = wordSlice.actions

export default wordSlice.reducer
