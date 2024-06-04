"use client"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { nextGame } from "./GlobalRedux/Features/countrySlice"
import { AppDispatch } from "./GlobalRedux/store"
import GameContainer from "./components/GameContainer"
import Keyboard from "./components/Keyboard"
import GuessContainer from "./components/GuessContainer"




const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(nextGame())
  }, [dispatch])

  return (
    <div className="flex justify-center md:rounded-xl items-center w-full md:w-3/5 mx-auto flex-col bg-yellow-500 h-screen select-none">
      <div className="mb-16">
      <GameContainer/>
      <div className="flex flex-col gap-4 justify-center items-center pt-2">
      <GuessContainer />
      <div className="">
      <Keyboard />
      </div>
    </div>
   </div>
   </div>
  )
}
export default Page
