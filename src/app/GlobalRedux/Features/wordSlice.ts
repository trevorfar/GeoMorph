import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"
import { checkValidWord, containsTwoLetters, getRandomWord, validateInput } from "@/utils/functions/functions"



type WordState = {
  targetWord: string
  previousWord: string[]
  currentGuess: string[]
  lockedIndecies: number[]
  selectedIndecies: number[]
  numGuesses: number
  
}
const numLetters = 5;

const initialState: WordState = {
    targetWord: "",
    numGuesses: 0,
    previousWord: Array.from({ length: numLetters }, () => ""),
    currentGuess: Array.from({ length: numLetters }, () => ""),
    lockedIndecies: Array.from({ length: numLetters }, () => 0),
    selectedIndecies: Array.from({ length: numLetters }, () => 0),
  }


  


export const submit = createAsyncThunk(
  "word/submit",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as { word?: WordState };
        if (
          state.word &&
          validateInput(state.word.currentGuess) &&
          containsTwoLetters(state.word.previousWord, state.word.currentGuess, numLetters) &&
          checkValidWord(state.word.currentGuess.join("")) 
        ) {
          dispatch(setPrevGuess([...state.word.currentGuess]));
          dispatch(setCurrentGuess(Array.from({ length: numLetters }, () => "")));
        }
    } catch (error) {
      console.error("Error in submit thunk:", error);
    }
  }
);



export const startGame = createAsyncThunk<void, void>(
  "word/startGame",
  async (_, { dispatch, getState }) => {  
      dispatch(setTargetWord(getRandomWord()));
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
    if (state.lockedIndecies[index] === 0 && index < numLetters) {
      state.currentGuess[index] = letter;
    }   
   },
    del: (state, action) => {
      const { index } = action.payload
      if (state.lockedIndecies[index] === 0) {
        state.currentGuess[index] = ""; 
    }
    },
    setPrevGuess: (state, action: PayloadAction<string[]>) => {
      state.previousWord =  action.payload;
    },
    setCurrentGuess: (state, action: PayloadAction<string[]>) => {
      state.currentGuess = action.payload;
    },
    swapLetters: (state, action: PayloadAction<[number, number]>) => {
      const [index1, index2] = action.payload;
      if (
        index1 >= 0 &&
        index1 < state.currentGuess.length &&
        index2 >= 0 &&
        index2 < state.currentGuess.length
      ) {
        [state.currentGuess[index1], state.currentGuess[index2]] = [
          state.currentGuess[index2],
          state.currentGuess[index1],
        ];
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
      if (action.payload >= 0 && action.payload < state.selectedIndecies.length) {
        state.selectedIndecies[action.payload] = 1;
      }
    },
    deselectIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.selectedIndecies.length) {
        state.selectedIndecies[action.payload] = 0;
      }
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
  deselectIndex,
  
  
} = wordSlice.actions

export default wordSlice.reducer
