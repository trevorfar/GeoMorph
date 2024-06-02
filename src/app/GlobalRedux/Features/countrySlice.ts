import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"

type CountryState = {
  country: string
  gameWon: boolean
  score: number
  currentWord: string[]
  index: number
}

const getRandomCountry = () => {
  return countries[Math.floor(Math.random() * countries.length)]
}

const initialState: CountryState = {
  country: "",
  gameWon: false,
  score: 0,
  currentWord: [],
  index: 0,
}

export const submit = createAsyncThunk(
  "country/submit",
  async (_, { dispatch, getState }) => {
    const state = getState() as { country: CountryState }
    const { currentWord, country } = state.country
    if (currentWord.join("") === country.toUpperCase()) {
      dispatch(next())
      dispatch(incrementScore())
    }else{
      console.log("Incorrect guess")
    }
  }
)

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    next: (state) => {
      return {
        ...state,
        country: getRandomCountry(),
        currentWord: [],
        index: 0,
        gameWon: false,
        score: state.score,
      }
    },
    type: (state, action: PayloadAction<string>) => {
      state.currentWord.push(action.payload), (state.index += 1)
    },
    del: (state) => {
      state.currentWord.pop(), (state.index -= 1)
    },
    incrementScore: (state) => {
      state.score += 1
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submit.fulfilled, (state) => {
      state.gameWon = true
    })
  },
})

export const { next, type, del, incrementScore } = countrySlice.actions

export default countrySlice.reducer
