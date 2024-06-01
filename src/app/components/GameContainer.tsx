"use client"
import { RootState } from "../GlobalRedux/store";
import Skeleton from "./Skeleton"
import { useDispatch, useSelector } from "react-redux"



const GameContainer = () => {
    const { country, currentWord, index } = useSelector((state: RootState) => state.country);

    return (
        <div className="flex flex-col h-72 w-full bg-gray-200 items-center justify-center">
        <div className=" flex flex-row">
            <div className="">
            {country}
            </div>
            <div className="">{index}</div>
            <div className="">{Array.from(country)[index]}</div>
        </div>
        <div className="flex flex-wrap md:flex-row gap-2 md:gap-4 pt-12">
            {Array.from(country).map((_, index) =>(
            <Skeleton key={index} index={index}/>
            ))}
          
        </div>
        </div>
    )
}
export default GameContainer