"use client"
import { useDispatch } from "react-redux";
import { setActiveGamemode } from "./GlobalRedux/Features/countrySlice"
import GameModeContainer from "./components/GameModeContainer";
import { GameMode } from "../../types";

const Page = () => {
    const gameModes: GameMode[] = ["leaderboard"]
    const dispatch = useDispatch();
    const colors = [
        "bg-purple-600",
        "bg-yellow-600",
    ]

    return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-15 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3">
            <div className="flex flex-col">
                <div className="flex justify-center items-center pb-12 h-1/2">
                    <h1 className="text-3xl">Ready to play?</h1>
                </div>
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