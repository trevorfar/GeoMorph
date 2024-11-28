"use client"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../GlobalRedux/store";
import { getHint, nextGame, skipGame } from "../GlobalRedux/Features/countrySlice"

const GuessContainer = () => {
    const { country, guesses } = useSelector((state: RootState) => state.country);
    const dispatch = useDispatch<AppDispatch>();

  return (
    
    <div className="w-full h-16 bg-gray-400 grid grid-cols-5">
        <div className="justify-center items-center gap-4 bg-gray-300 col-span-4 grid grid-cols-4 md:grid-cols-3 overflow-x-auto">
            {guesses.map((guess, index)=>(
              <div key={index}
               className="">
                {guess}
              </div>
            ))}
        </div>

        <div className="bg-gray-300 items-center flex justify-center flex-row gap-2">
        
        <button id="skipButton" className="bg-red-700 w-16 h-8 rounded-xl text-white select-none" onClick={(e) => {
        dispatch(skipGame());
        setTimeout(() => {
          (e.target as HTMLButtonElement).blur(); 
        }, 100);
        }}>Skip</button>
        
        <button className="bg-purple-700 w-16 h-8 rounded-xl text-white select-none" onClick={(e) => {
        dispatch(getHint());
        setTimeout(() => {
          (e.target as HTMLButtonElement).blur(); 
        }, 100);
      }}>
        Hint
        </button>

        </div>
        

    </div>
  )
}

export default GuessContainer
