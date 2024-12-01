import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import countries from "../../countries"



type CountryState = {
  
}

const getRandomCountry = () => {  
  return countries[Math.floor(Math.random() * countries.length)]
}



const initialState: CountryState = {
  
}

export const submit = createAsyncThunk(
  "country/submit",
  async (_, { dispatch, getState }) => {
    
  }
)


export const nextGame = createAsyncThunk(
  "country/nextGame",
  async (_, { dispatch, getState }) => {
  }
)

export const endGame = createAsyncThunk(
  "country/endGame",
  async (_, { dispatch, getState }) => {
  }
)


export const skipGame = createAsyncThunk(
  "country/skipGame",
  async (_, { dispatch }) => {
    
  }
)

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    type: (state, action: PayloadAction<string>) => {
      
    },
    del: (state) => {
      
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
  clearGameState
  
} = countrySlice.actions

export default countrySlice.reducer
