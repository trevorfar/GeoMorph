"use client"
import { openChangelog } from "@/utils/changeLog"
import { useState } from "react";
import Leaderboard from "./Leaderboard";
import { useRouter } from "next/navigation";

const FooterButtons = ({setIsLeaderboardVisible,
}: {
  setIsLeaderboardVisible: (visible: boolean) => void;
}) => {
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const router = useRouter()

    return (
        <>
        <div className="flex flex-row gap-4">
      <button 
          onClick={() => openChangelog()}
          className="bg-purple-700 text-white py-2 px-4 rounded-xl hover:bg-purple-700/80 hover:text-opacity-55"
        >
          View Changelog
      </button>
      <button 
        onClick={() => {
            setShowLeaderboard(true)
            setIsLeaderboardVisible(true)
        }}
        className="bg-purple-700 text-white py-2 px-4 rounded-xl hover:bg-purple-700/80 hover:text-opacity-55"
      >
        View Leaderboard
      </button>
      {/* <button 
        onClick={() => {
            router.push('/');
        }}
        className="bg-purple-700 text-white py-2 px-4 rounded-xl hover:bg-purple-700/80 hover:text-opacity-55"
      >
        Switch Gamemode
      </button> */}
      </div>
   
      {showLeaderboard && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3">
            <Leaderboard />
            <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setShowLeaderboard(false)
                setIsLeaderboardVisible(false)
              }
              }
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-xl "
            >
              Close Leaderboard
            </button>
            </div>
          </div>
        </div>
      )}
      </>
    )
}
export default FooterButtons