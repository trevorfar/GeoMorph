"use client"
import { useDispatch, useSelector } from "react-redux"
import countries from "./countries"
import { AppDispatch, RootState } from "./GlobalRedux/store"
import { next } from "./GlobalRedux/Features/countrySlice"
import GameContainer from "./components/GameContainer"
import Keyboard from "./components/Keyboard"




const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="flex justify-center items-center flex-col">
      <GameContainer/>
      <div className="flex flex-col gap-4">
      <button onClick={() => dispatch(next())}>Next</button>
      <Keyboard />

   </div>
   </div>
  )
}
export default Page
