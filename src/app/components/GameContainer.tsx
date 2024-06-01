"use client"
import { RootState } from "../GlobalRedux/store";
import Skeleton from "./Skeleton"
import { useDispatch, useSelector } from "react-redux"



const GameContainer = () => {
    const { country, currentWord } = useSelector((state: RootState) => state.country);

    return (
        <div className="flex flex-col h-64 w-full bg-gray-400 items-center justify-center">
        <div className=" flex">
            {country}
        </div>
        <div className="flex flex-row gap-4 pt-12">
            {Array.from(country).map((_, index) =>(
            <Skeleton key={index}/>
            ))}
          
        </div>
        </div>
    )
}
export default GameContainer