import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"
import { checkValidWord, containsXLetters, getRandomWord, validateInput, verifyWin } from "@/utils/functions/functions"
import words from "@/app/words"



type WordState = {
  targetWord: string
  previousWord: string[]
  currentGuess: string[]
  lockedIndecies: number[]
  selectedIndecies: number[]
  numGuesses: number
  numSelects: number
  resetFlag: boolean
  listOfWords: string[]
  score: number
  
}
const numLetters = 5;

const initialState: WordState = {
    targetWord: "",
    listOfWords: words,
    numSelects: 0,
    numGuesses: 0,
    previousWord: Array.from({ length: numLetters }, () => ""),
    currentGuess: Array.from({ length: numLetters }, () => ""),
    lockedIndecies: Array.from({ length: numLetters }, () => 0),
    selectedIndecies: Array.from({ length: numLetters }, () => 0),
    resetFlag: false,
    score: 0,
  }

export const wonGame = createAsyncThunk(
  "word/wonGame",
  async (_, { dispatch, getState }) => {
      const state = getState() as { word: WordState };
          dispatch(setCurrentGuess(Array.from({ length: numLetters }, () => "")));
          dispatch(incrementScore());
          dispatch(startGame());
    
        }
);

  


export const submit = createAsyncThunk(
  "word/submit",
  async (_, { dispatch, getState }) => {
      const state = getState() as { word: WordState };
      if(state.word.currentGuess === Array.from(state.word.targetWord)){
        dispatch(wonGame());
      }
        else {
          dispatch(setPrevGuess([...state.word.currentGuess]));
          dispatch(setCurrentGuess(Array.from({ length: numLetters }, () => "")));
        }
        }
);



export const startGame = createAsyncThunk<void, void>(
  "word/startGame",
  async (_, { dispatch, getState }) => {  
    const state = getState() as { word: WordState }
    const { word: targetWord, updatedWords: afterTargetWordRemoval } = getRandomWord(state.word.listOfWords);
    const { word: previousWord, updatedWords: finalWordList } = getRandomWord(afterTargetWordRemoval);

    dispatch(setTargetWord(targetWord));
    dispatch(setPrevGuess(Array.from(previousWord)));
    dispatch(setListOfWords(finalWordList));
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
    handleNumSelects: (state, action: PayloadAction<number>) => {
      const delim: number = action.payload;
      state.numSelects +=  delim;
    },
     setListOfWords: (state, action) => {
      state.listOfWords = action.payload;
    },
    resetSelection: (state) => {
      state.selectedIndecies = Array(5).fill(0);
      state.numSelects = 0;
      state.resetFlag = !state.resetFlag; 
    },
    swapLetters: (state, action: PayloadAction<[number, number]>) => {
      const [index1, index2] = action.payload;
      if (
        index1 >= 0 &&
        index1 < state.previousWord.length &&
        index2 >= 0 &&
        index2 < state.previousWord.length
      ) {
        [state.previousWord[index1], state.previousWord[index2]] = [
          state.previousWord[index2],
          state.previousWord[index1],
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
    incrementScore: (state) => {
      state.score += 1;
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
  handleNumSelects,
  resetSelection,
  setListOfWords,
  incrementScore
  
  
} = wordSlice.actions

export default wordSlice.reducer
