"use client" // I know. I dont want this to be a client component either but this is way easier 
import { useDispatch } from "react-redux";
import { setActiveGamemode } from "../GlobalRedux/Features/countrySlice"
import { useSelector } from 'react-redux';
import { RootState } from "../GlobalRedux/store";
import { useRouter } from 'next/navigation'


type GameMode = 'classic' | 'leaderboard';


const GameModeContainer = ({ obj, bgColor } : { obj: GameMode, bgColor: string}) => {
    const dispatch = useDispatch();
    const router = useRouter()

    const { activeGameMode } = useSelector((state: RootState) => state.country);

    return (
        <button 
        onClick={() => {
            dispatch(setActiveGamemode(obj));  
            router.push(`/game/${obj}`)
        }}
        className={`outline border-black border-1 w-full p-2 rounded-xl ${bgColor} 
        hover:bg-opacity-60 transition-all duration-200 cursor-pointer animate-jiggle `}>
               <div className="text-3xl font-semibold text-white">
                GO!
               </div>
        </button>
    )
}

export default GameModeContainer