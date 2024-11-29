"use client"
import { useDispatch } from "react-redux";
import { setActiveGamemode } from "./GlobalRedux/Features/countrySlice"
import GameModeContainer from "./components/GameModeContainer";
import { GameMode } from "../../types";

const Page = () => {
    const gameModes: GameMode[] = ["classic", "leaderboard"]
    const dispatch = useDispatch();
    const colors = [
        "bg-purple-600",
        "bg-yellow-600",
    ]

    return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-15 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3">
            <div className="flex flex-col gap-2 pb-4">
                <div className="flex justify-center items-center pb-12 h-1/2 ">
                    <h1 className="text-3xl">Select Gamemode</h1>
                </div>
                <p className="font-semibold text-lg">Not sure how to Choose?</p>
                <li className="">Classic mode is perfect for testing the game and getting a feel for the mechanics. Scores are not tracked, and gameplay doesn’t affect the leaderboards. Plus, you’ll have access to helpful features like skipping a challenge if you get stuck.</li>
                <li className="">In leaderboard mode, your scores matter! Enter a username that persists across sessions, and any new high scores will be saved to your account and displayed on the leaderboards. However, be prepared for a challenge—skipping isn’t allowed!</li>
                <div className="flex flex-row h-1/2 gap-4 text-center">
            
                        {
                            gameModes.map((mode, index) => (
                                <GameModeContainer obj={mode} bgColor={colors[index % colors.length]} key={mode}/>                            
                            ))
                        }
                </div>
            </div>
          
        </div>
      </div>
    )
}

export default Page