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
    <div className="flex justify-center md:rounded-xl items-center w-full md:w-96 mx-auto flex-col bg-yellow-400 h-screen select-none">
      <div className="mb-16">
      <GameContainer/>
      <div className="flex flex-col gap-4 justify-center items-center pt-2">
      <GuessContainer />
      <button className="bg-red-700 w-16 h-8 rounded-xl text-white " onClick={() => dispatch(next())}>Skip</button>
      <div className="">
      <Keyboard />
      </div>
    </div>
   </div>
   </div>
  )
}
export default Page
