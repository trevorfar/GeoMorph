"use client"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { next } from "./GlobalRedux/Features/countrySlice"
import { AppDispatch } from "./GlobalRedux/store"
import GameContainer from "./components/GameContainer"
import Keyboard from "./components/Keyboard"
import GuessContainer from "./components/GuessContainer"




const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(next())
  }, [dispatch])

  return (
    <div className="flex justify-center items-center flex-col bg-slate-200 h-screen select-none">
      <GameContainer/>
      <div className="flex flex-col gap-4 my-auto justify-center items-center pt-2">
      <GuessContainer />
      <button className="bg-red-700 w-16 h-8 rounded-xl text-white " onClick={() => dispatch(next())}>Skip</button>
      <Keyboard />

   </div>
   </div>
  )
}
export default Page
