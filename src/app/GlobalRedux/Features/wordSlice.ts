import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"



type WordState = {
  targetWord: string
  previousWord: string[]
  currentGuess: string[]
  lockedIndecies: number[]
  selectedIndecies: number[]
  
}

const getRandomCountry = () => {  
  return countries[Math.floor(Math.random() * countries.length)]
}



const initialState: WordState = {
    targetWord: "",
    previousWord: Array.from({ length: 5 }, () => ""),
    currentGuess: Array.from({ length: 5 }, () => ""),
    lockedIndecies: Array.from({ length: 5 }, () => 0),
    selectedIndecies: Array.from({ length: 5 }, () => 0),
  }

function containsTwoLetters(inp1: string[], inp2: string[]): boolean {
  let count = 0;
  if (
    inp1.length !== 5 ||
    inp2.length !== 5 ||
    inp1.some((el) => typeof el !== "string") ||
    inp2.some((el) => typeof el !== "string")
  ) {
    return false;
  }

  if(inp1.every(element => element === "")){
    return true;
  }

  for (let i = 0; i < 5; i++){
    if(inp1[i].toLowerCase() === inp2[i].toLowerCase()){
      count++;
    }
    if(count >= 2){
      return true;
    }
  }
  return false;
}

function validateInput(input: string[]):boolean {
    return input.every((el) => typeof el === "string" && el != "");
}

export const submit = createAsyncThunk(
  "word/submit",
  async (_, { dispatch, getState }) => {
    try {
      const state = getState() as { word?: WordState };

      if (
        state.word &&
        validateInput(state.word.currentGuess) &&
        containsTwoLetters(state.word.previousWord, state.word.currentGuess)
      ) {
        dispatch(setPrevGuess([...state.word.currentGuess]));
        dispatch(setCurrentGuess(Array.from({ length: 5 }, () => "")));
      }
    } catch (error) {
      console.error("Error in submit thunk:", error);
    }
  }
);



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
    if (state.lockedIndecies[index] === 0 && index < 5) {
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
  deselectIndex
  
} = wordSlice.actions

export default wordSlice.reducer
