"use client"
import { useDispatch, useSelector } from "react-redux"
import countries from "./countries"
import { AppDispatch, RootState } from "./GlobalRedux/store"
import { next } from "./GlobalRedux/Features/countrySlice"
import GameContainer from "./components/GameContainer"
import Keyboard from "./components/Keyboard"
import { useEffect } from "react"




const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(next())
  }, [dispatch])

  return (
    <div className="flex justify-center items-center flex-col bg-slate-100 h-screen">
      <GameContainer/>
      <div className="flex flex-col gap-4 justify-center items-center pt-2">
      <button className="bg-green-400 w-16  h-8 rounded-xl" onClick={() => dispatch(next())}>Play</button>
      <Keyboard />

   </div>
   </div>
  )
}
export default Page
