"use client"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { nextGame } from "./GlobalRedux/Features/countrySlice"
import { AppDispatch } from "./GlobalRedux/store"
import GameContainer from "./components/GameContainer"
import Keyboard from "./components/Keyboard"
import GuessContainer from "./components/GuessContainer"
import Leaderboard from "./components/Leaderboard"
import { openChangelog } from "@/utils/changeLog"
import { promptSignin } from "@/utils/promptSignin"
import Signup from "./components/Signup"


const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  useEffect(() => {
    if(!promptSignin()){
      setShowSignin(true);
    }
  }, [])
  useEffect(() => {
    dispatch(nextGame())
  }, [dispatch])

  



  return (
    <div className="flex justify-center md:rounded-xl items-center w-full md:w-3/5 mx-auto flex-col gap-8 bg-blue-500 h-screen select-none">
      <div className="">
      <GameContainer isActive isDisabled/>
      </div>
      
      <div className="flex flex-col gap-4 justify-center items-center pt-2">
      <GuessContainer />
      </div>
      <div className="">
      {!showSignin && !showLeaderboard && <Keyboard />}
      </div>
      <div className="flex flex-row gap-4">
      <button 
          onClick={() => openChangelog()}
          className="bg-purple-700 text-white py-2 px-4 rounded-xl hover:bg-purple-700/80 hover:text-opacity-55"
        >
          View Changelog
      </button>
      <button 
        onClick={() => setShowLeaderboard(true)}
        className="bg-purple-700 text-white py-2 px-4 rounded-xl hover:bg-purple-700/80 hover:text-opacity-55"
      >
        View Leaderboard
      </button>
      </div>
      {showLeaderboard && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3">
            <Leaderboard />
            <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowLeaderboard(false)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-xl "
            >
              Close Leaderboard
            </button>
            </div>
          </div>
        </div>
      )}
      {showSignin && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3">
            <Signup />
            <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowSignin(false)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-xl "
            >
              Don&apos;t sign in
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Page
