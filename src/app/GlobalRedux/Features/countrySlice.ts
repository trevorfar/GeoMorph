import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"

type CountryState = {
  country: string
  gameWon: boolean
  score: number
  currentWord: string[]
  index: number
  guesses: string[]
  hintIndices: number[]
}

const getRandomCountry = () => {
  return countries[Math.floor(Math.random() * countries.length)]
}

const getRandomHint = (country: string) => {
  const randomIndex1 = Math.floor(Math.random() * country.length)
  let randomIndex2, randomIndex3
  do {
    randomIndex2 = Math.floor(Math.random() * country.length)
    randomIndex3 = Math.floor(Math.random() * country.length)
  } while (
    randomIndex1 === randomIndex2 ||
    randomIndex1 === randomIndex3 ||
    randomIndex2 === randomIndex3
  )

  const resultArray: string[] = country
    .split("")
    .map((char) => (char === " " ? " " : ""))
  resultArray[randomIndex1] = country[randomIndex1].toUpperCase()
  resultArray[randomIndex2] = country[randomIndex2].toUpperCase()
  resultArray[randomIndex3] = country[randomIndex3].toUpperCase()
  return {
    hint: resultArray,
    hintIndices: [randomIndex1, randomIndex2, randomIndex3],
  }
}

const initialState: CountryState = {
  country: "",
  gameWon: false,
  score: 0,
  currentWord: [],
  index: 0,
  guesses: [],
  hintIndices: [],
}

export const submit = createAsyncThunk(
  "country/submit",
  async (_, { dispatch, getState }) => {
    const state = getState() as { country: CountryState }
    const { currentWord, country } = state.country
    const filteredCurrentWord = currentWord.filter((letter) => letter !== "")
    if (filteredCurrentWord.length !== country.length) {
      return
    }
    if (currentWord.join("") === country.toUpperCase()) {
      dispatch(nextGame())
      dispatch(incrementScore())
    } else {
      dispatch(incorrectGuess())
    }
  }
)

export const nextGame = createAsyncThunk(
  "country/nextGame",
  async (_, { dispatch }) => {
    const newCountry = getRandomCountry()
    const { hint, hintIndices } = getRandomHint(newCountry)
    dispatch(
      setNextGame({ country: newCountry, currentWord: hint, hintIndices })
    )
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
      state.score += 1
    },
    decrementScore: (state) => {
      if (state.score >= 1) {
        state.score -= 1
      } 
    },
    incorrectGuess: (state) => {
      state.guesses.push(state.currentWord.join(""))
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
    builder.addCase(submit.fulfilled, (state) => {
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
} = countrySlice.actions

export default countrySlice.reducer
