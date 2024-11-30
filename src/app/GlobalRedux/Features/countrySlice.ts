import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"
import { GameMode } from "../../../../types"
import { setHighscore, UserState } from "./userSlice"
import { updateHighscore } from "@/utils/updateDB"


type CountryState = {
  country: string
  gameWon: boolean
  score: number
  currentWord: string[]
  index: number
  guesses: string[]
  hintIndices: number[]
  hints: number
  currStreak: number
  hintRewardedAtStreak: number
  activeGameMode: GameMode;
  gameModeData: Record<string, any>;
}

const getRandomCountry = () => {
  return countries[Math.floor(Math.random() * countries.length)]
}

const getRandomHint = (country: string) => {
  const numSpaces = country.split(" ").length - 1
  const countryLength = country.length - numSpaces;
  const hintIndices: number[] = [];

  const numHints = countryLength > 5 ? 3 : 2; 
  

  while (hintIndices.length < numHints) {
    let randomIndex = Math.floor(Math.random() * country.length);
    if(country[randomIndex] != " " && !hintIndices.includes(randomIndex)){
      hintIndices.push(randomIndex);
    }
  }
  


  const resultArray: string[] = country
  .split("")
  .map((char, idx) => (hintIndices.includes(idx) || char === " " ? char : "").toUpperCase());

  return {
    hint: resultArray, 
    hintIndices,
  };

}

const initialState: CountryState = {
  country: "",
  gameWon: false,
  score: 0,
  currentWord: [],
  index: 0,
  guesses: [],
  hintIndices: [],
  hints: 3,
  currStreak: 0,
  hintRewardedAtStreak: 0,
  activeGameMode: 'classic', 
  gameModeData: {},
}

export const submit = createAsyncThunk(
  "country/submit",
  async (_, { dispatch, getState }) => {
    const state = getState() as { country: CountryState }
    const userState = getState() as { user: UserState }

    const { currentWord, country } = state.country
    const { username } = userState.user

    const filteredCurrentWord = currentWord.filter((letter) => letter !== "")

    if (filteredCurrentWord.length !== country.length) {
      return
    }

    if (currentWord.join("") === country.toUpperCase()) {
      dispatch(nextGame())
      await dispatch(incrementScore())
      
      const updatedState = getState() as { country: CountryState };
      const { score } = updatedState.country;

      await updateHighscore(username, score)
    } else {
      dispatch(incorrectGuess(currentWord.join("")))
    }
  }
)


export const nextGame = createAsyncThunk(
  "country/nextGame",
  async (_, { dispatch, getState }) => {
    const newCountry = getRandomCountry()
    const { hint, hintIndices } = getRandomHint(newCountry)

    dispatch(
      setNextGame({ country: newCountry, currentWord: hint, hintIndices })
    )
  }
)

export const endGame = createAsyncThunk(
  "country/endGame",
  async (_, { dispatch, getState }) => {
    let state = getState() as { country: CountryState };
    const userState = getState() as { user: UserState };

    if (state.country.score > userState.user.highscore) {
      dispatch(setHighscore(state.country.score));
    } 
    dispatch(clearGameState());
    dispatch(nextGame());
  }
)


export const skipGame = createAsyncThunk(
  "country/skipGame",
  async (_, { dispatch }) => {
    dispatch(decrementScore())
    dispatch(nextGame())
  }
)

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    type: (state, action: PayloadAction<string>) => {
      while (
        state.index < state.country.length &&
        (state.hintIndices.includes(state.index) ||
          state.country[state.index] === " ")
      ) {
        state.index += 1
      }
      if (
        state.index < state.country.length &&
        state.country[state.index] !== " "
      ) {
        state.currentWord[state.index] = action.payload
        state.index += 1
      }
    },
    getHint: (state) => {
      if(state.hints <= 0) return;
      const unrevealedIndices = state.country
      .split("")
      .map((char, idx) => idx)
      .filter(
        (idx) =>
          !state.hintIndices.includes(idx) && 
          state.currentWord[idx] === "" &&    
          state.country[idx] !== " "         
      );

      if(unrevealedIndices.length > 0){
        const randomIndex =
        unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];

        state.hintIndices.push(randomIndex); 
        state.currentWord[randomIndex] = state.country[randomIndex].toUpperCase();
        state.hints--;
      }
    },
    del: (state) => {
      while (
        state.index > 0 &&
        (state.hintIndices.includes(state.index - 1) ||
          state.country[state.index - 1] === " ")
      ) {
        state.index -= 1
      }
      if (state.index > 0) {
        state.index -= 1
        state.currentWord[state.index] = ""
      }
    },
    
    incrementScore: (state) => {
      if (state.currStreak >= 9 && state.hintRewardedAtStreak < 9) {
        state.hints += 2;
        state.hintRewardedAtStreak = 9;  
      } else if (state.currStreak >= 4 && state.hintRewardedAtStreak < 4) {
        state.hints++;
        state.hintRewardedAtStreak = 4;  
      }
    
      if (state.currStreak >= 9) {
        state.score += 3;
      } else if (state.currStreak >= 4) {
        state.score += 2;
      } else {
        state.score += 1;
      }
      
      state.currStreak++;
    },
    clearGameState: (state) => initialState,
    decrementScore: (state) => {
      if (state.score >= 1) {
        state.score -= 1
      } 
      if(state.score === 0){
        state.hints = 3;
      }
      state.currStreak = 0;
    },

    incorrectGuess: (state, action: PayloadAction<string>) => {
      const guess = action.payload;
      
      if(!state.guesses.includes(guess)){
      state.guesses.push(state.currentWord.join(""))
      }

      if (state.score >= 1) {
        state.score -= 1
      } 
      if(state.score === 0){
        state.hints = 3;
      }
      state.currStreak = 0;
      ;
    },
    setNextGame: (
      state,
      action: PayloadAction<{
        country: string
        currentWord: string[]
        hintIndices: number[]
      }>
    ) => {
      state.country = action.payload.country
      state.currentWord = action.payload.currentWord
      state.hintIndices = action.payload.hintIndices
      state.index = 0
      state.gameWon = false
      state.guesses = []
    },
    setActiveGamemode: (state, action: PayloadAction<GameMode>) => {
      state.activeGameMode = action.payload;
      console.log(state.activeGameMode);

    },
    updateCurrentWord: (state, action: PayloadAction<string>) => {
      if (
        state.index < state.country.length &&
        !state.hintIndices.includes(state.index) &&
        state.country[state.index] !== " "
      ) {
        state.currentWord[state.index] = action.payload
        state.index += 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(submit.fulfilled, (state) => {
      state.gameWon = true
    })
  },
})

export const {
  type,
  del,
  incrementScore,
  incorrectGuess,
  setNextGame,
  updateCurrentWord,
  decrementScore,
  getHint,
  setActiveGamemode,
  clearGameState
  
} = countrySlice.actions

export default countrySlice.reducer
