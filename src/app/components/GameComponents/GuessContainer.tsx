"use client";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import { AppDispatch, RootState } from '../../GlobalRedux/store';
import { setCurrentGuess, setPrevGuess, submit } from "@/app/GlobalRedux/Features/wordSlice"
import { useEffect, useRef, useState } from "react";

const GuessContainer = () => {
  const { currentGuess, previousWord } = useSelector((state: RootState) => state.word);
  const dispatch = useDispatch<AppDispatch>();
  const [currGuess, setCurrGuess] = useState(Array(5).fill(null))

  const skeletons = Array(5).fill(null);
  const currentGuessRef = useRef(currentGuess);
  const activeIndexRef = useRef(0);

  useEffect(() => {
      currentGuessRef.current = currentGuess; // Keep the ref updated
  }, [currentGuess]);

  const handleKeyPress = (e: KeyboardEvent) => {
      const updatedGuess = [...currentGuessRef.current];
      const activeIndex = activeIndexRef.current;
     
      

      if (e.key.length === 1 && e.key.match(/^[a-zA-Z]$/)) {
        if (activeIndex === 4 && updatedGuess[activeIndex] !== "") {
          return; 
          }
          updatedGuess[activeIndex] = e.key.toUpperCase();
          dispatch(setCurrentGuess(updatedGuess));
          if (activeIndex < 4) {
              activeIndexRef.current = activeIndex + 1; 
          }
      } else if (e.key === "Backspace") {
        if (updatedGuess[activeIndex] === "") {
          if (activeIndex > 0) {
              activeIndexRef.current = activeIndex - 1; 
          }
      }
      updatedGuess[activeIndex] = ""; 
      dispatch(setCurrentGuess(updatedGuess));
      } else if (e.key === "Enter") {
          dispatch(submit());
      }
  };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <div className="flex flex-col h-full items-center justify-center text-center">
            <div className="border-2 border-black h-1/3 w-2/3 flex flex-col items-center justify-center gap-2">
                <div>Previous Guess</div>
                <div className="flex flex-row gap-2">
                    {skeletons.map((_, idx) => (
                        <Skeleton key={idx} index={idx} letter={previousWord[idx]}/>
                    ))}
                </div>
            </div>
            <div className="border-2 border-black h-2/3 w-full justify-center items-center flex">
                <div className="border-2 border-red-700 w-11/12 flex flex-row gap-12 items-center justify-center">
                    {skeletons.map((_, idx) => (
                        <Skeleton key={idx} index={idx} letter={currentGuess[idx]} />
                    ))}
                    <button onClick={() => dispatch(setPrevGuess("Italy"))}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default GuessContainer;
