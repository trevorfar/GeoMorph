"use client";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import { AppDispatch, RootState } from '../../GlobalRedux/store';
import { setCurrentGuess, setPrevGuess, submit, type, del } from "@/app/GlobalRedux/Features/wordSlice"
import { useEffect, useState} from "react";

const GuessContainer = () => {
  const { currentGuess, previousWord, lockedIndecies } = useSelector((state: RootState) => state.word);
  const [currPosition, setCurrPosition] = useState(0)
  const dispatch = useDispatch<AppDispatch>();
  const skeletons = Array(5).fill(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
        // Character Input
        if (e.key.length === 1 && e.key.match(/^[a-zA-Z]$/)) {
            let position = currPosition;

            while (position < 5 && lockedIndecies[position] === 1) {
                position++;
            }

            if (position < 5) {
                dispatch(type({ letter: e.key, index: position }));
                setCurrPosition(position + 1);
            }
        }
        // Backspace
        else if (e.key === "Backspace") {
            let position = currPosition > 0 ? currPosition - 1 : 4;

            while (position >= 0 && lockedIndecies[position] === 1) {
                position--;
            }

            if (position >= 0) {
                dispatch(del({ index: position })); 
                setCurrPosition(position); 
            }
        }
        else if (e.key === "Enter") {
            dispatch(submit());
            setCurrPosition(0); 
        }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
}, [currPosition, currentGuess.length, dispatch, lockedIndecies]);

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
                <div className="w-11/12 flex flex-row gap-12 items-center justify-center">
                    {skeletons.map((_, idx) => (
                        <Skeleton key={idx} index={idx} letter={currentGuess[idx]} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuessContainer;
