import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"

type CountryState = {
  country: string
  gameWon: boolean
  score: number
  currentWord: string[]
  index: number
  guesses: string[]
}

const getRandomCountry = () => {
  return countries[Math.floor(Math.random() * countries.length)]
}

const getRandomHint = (country: string) => {
  const randomIndex1 = Math.floor(Math.random() * country.length)
  let randomIndex2
  do {
    randomIndex2 = Math.floor(Math.random() * country.length)
  } while (randomIndex1 === randomIndex2)

  const resultArray = new Array(country.length).fill("")
  resultArray[randomIndex1] = country[randomIndex1]
  resultArray[randomIndex2] = country[randomIndex2]
  return resultArray
}

const initialState: CountryState = {
  country: "",
  gameWon: false,
  score: 0,
  currentWord: [],
  index: 0,
  guesses: [],
}

export const submit = createAsyncThunk(
  "country/submit",
  async (_, { dispatch, getState }) => {
    const state = getState() as { country: CountryState }
    const { currentWord, country } = state.country
    if (currentWord.join("") === country.toUpperCase()) {
      dispatch(nextGame())
      dispatch(incrementScore())
    } else if (currentWord.length === country.length) {
      dispatch(incorrectGuess())
    } else {
      return
    }
  }
)

export const nextGame = createAsyncThunk(
  "country/nextGame",
  async (_, { dispatch }) => {
    const newCountry = getRandomCountry()
    const newHint = getRandomHint(newCountry)
    dispatch(setNextGame({ country: newCountry, currentWord: newHint }))
  }
)

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    type: (state, action: PayloadAction<string>) => {
      state.currentWord.push(action.payload)
      state.index += 1
    },
    del: (state) => {
      state.currentWord.pop()
      state.index -= 1
    },
    incrementScore: (state) => {
      state.score += 1
    },
    incorrectGuess: (state) => {
      state.guesses.push(state.currentWord.join(""))
    },
    setNextGame: (
      state,
      action: PayloadAction<{ country: string; currentWord: string[] }>
    ) => {
      state.country = action.payload.country
      state.currentWord = action.payload.currentWord
      state.index = 0
      state.gameWon = false
      state.guesses = []
    },
    updateCurrentWord: (state, action: PayloadAction<string>) => {
      state.currentWord.push(action.payload)
      state.index += 1
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
} = countrySlice.actions

export default countrySlice.reducer
