"use client"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../GlobalRedux/store";
import { getHint, nextGame, skipGame } from "../../../GlobalRedux/Features/countrySlice"

const ClassicGuessContainer = () => {
    const { country, guesses } = useSelector((state: RootState) => state.country);
    const dispatch = useDispatch<AppDispatch>();

  return (
    
    <div className="w-full h-16 bg-gray-500 grid grid-cols-5 rounded-xl">
        <div className="justify-center items-center bg-gray-300 col-span-4
         grid grid-cols-2 md:grid-cols-6 overflow-x-auto rounded-xl">
            {guesses.map((guess, index)=>(
              <div key={index}
               className="">
                {guess}
              </div>
            ))}
        </div>

        <div className=" m-2 items-center flex justify-center flex-row gap-2 rounded-xl">
        
        <button id="skipButton" className="bg-red-700 w-16 h-8 rounded-xl text-white select-none 
        hover:bg-red-700/80 hover:text-opacity-55" onClick={(e) => {
        dispatch(skipGame());
        setTimeout(() => {
          (e.target as HTMLButtonElement).blur(); 
        }, 100);
        }}>Skip</button>
        
        <button className="bg-purple-700 w-16 h-8 rounded-xl text-white select-none
         hover:bg-purple-700/80 hover:text-opacity-55" onClick={(e) => {
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

export default ClassicGuessContainer
