"use client"
import { useDispatch, useSelector } from "react-redux";
import GuessContainer from "../components/GameComponents/GuessContainer"
import { RootState } from "../GlobalRedux/store";
import { useEffect } from "react";
import { startGame } from "../GlobalRedux/Features/wordSlice";




const Page = () => {
    const { targetWord } = useSelector((state: RootState) => state.word);
    const dispatch = useDispatch();
    
    useEffect(() =>{
        const beginGame = async () => {
            //@ts-ignore
            await dispatch(startGame());
        }

        beginGame();
    }, [dispatch])

    return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-15 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 h-11/2 md:h-3/4 lg:h-3/4md:w-3/4 lg:w-3/4 xl:w-1/2 absolute">
            <div className="w-full flex items-center justify-center border-black border-2 h-1/3"> 
            <h1 className="text-3xl font-sans tracking-[.25em]">  {targetWord.toUpperCase()} </h1>
            </div>
            <div className="items-center justify-center h-2/3 border-2 border-red-700">
                <GuessContainer />
            </div>
            </div>
    </div>
    )
}

export default Page