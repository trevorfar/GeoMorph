"use client";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../Skeleton";
import { AppDispatch, RootState } from '../../GlobalRedux/store';
import { submit, type, del, swapLetters, resetSelection, wonGame, setPrevGuess } from "@/app/GlobalRedux/Features/wordSlice"
import { useEffect, useState} from "react";
import StyledButton from "@/utils/StyledComponents/Button";
import { compArray, validateSubmitInput } from "@/utils/functions/functions";
import ConfirmDialog from "../RulesDialog";

const GuessContainer = () => {
  const { currentGuess, previousWord, lockedIndecies, selectedIndecies, targetWord } = useSelector((state: RootState) => state.word);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false); 

  const [currPosition, setCurrPosition] = useState(0)
  
  const dispatch = useDispatch<AppDispatch>();

  const numLetters = 5;

  const skeletons = Array(numLetters).fill(null);
    const handleSwap = () => {
    let array = []
    
    for(let i = 0; i < numLetters; i++){
        if(selectedIndecies[i] === 1) array.push(i);
    }
    if (array.length !== 2) {
        return; 
    }
    if(array.length === 2){
        dispatch(swapLetters([array[0], array[1]]))
        dispatch(resetSelection());
    }    
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key.length === 1 && e.key.match(/^[a-zA-Z]$/)) {
            let position = currPosition;
            if (currentGuess.every((guess) => guess !== "")) {
                return; 
            }

            if (currentGuess.every((guess, index) => guess !== "" || lockedIndecies[index] === 1)) {
                return; 
            }

            while (position < numLetters && lockedIndecies[position] === 1 || currentGuess[position] != "") {
                position++;
            }

            if (position < numLetters) {
                dispatch(type({ letter: e.key, index: position }));
                setCurrPosition(position + 1);
            }
        }
        // Backspace
        else if (e.key === "Backspace") {
            if (currentGuess.every((_, index) => lockedIndecies[index] === 1)) {
                return; 
            }
            if (currentGuess.every((guess) => guess === "")) {
                return;
            }
           
            
            let position = currPosition > 0 ? currPosition - 1 : currPosition;
            if(currPosition === 0) return;
            
            while (position >= 0 && lockedIndecies[position] === 1) {
                position--;
            }

            if (position >= 0) {
                dispatch(del({ index: position })); 
                setCurrPosition(position); 
            }
        }

        else if (e.key === "Enter") {
            if(compArray(currentGuess, previousWord)){
                return // error state, same word
            }
            if (currentGuess.join("") == targetWord){
                if(validateSubmitInput(currentGuess, previousWord, numLetters, true)){
                    dispatch(wonGame())
                    setCurrPosition(0);
                }
                else {
                    return // Add error state here
                }
            }
            else if (validateSubmitInput(currentGuess, previousWord, numLetters)){
                dispatch(submit());
                setCurrPosition(0);
            }
            else {
                return // add error state here
            }
        }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
}, [currPosition, currentGuess, dispatch, lockedIndecies, previousWord, targetWord]);

    return (
        <div className="flex flex-col h-full items-center justify-center text-center">
            <div className=" h-1/3 w-2/3 flex flex-col items-center justify-center gap-2">
                <div>Previous Guess</div>
                <input onInput={(e) => dispatch(setPrevGuess(Array.from(e.currentTarget.value)))}></input>
                <div className="flex flex-row gap-2">
                    {skeletons.map((_, idx) => (
                        <Skeleton key={idx} index={idx} letter={previousWord[idx]} isDisplay={false}/>
                    ))}
                </div>
            </div>



            <div className="border-2 border-black h-2/3 w-full justify-center items-center flex">
                <div className="w-11/12 flex flex-row gap-12 items-center justify-center">
                    {skeletons.map((_, idx) => (
                        <Skeleton key={idx} index={idx} letter={currentGuess[idx]} isDisplay={true} />
                    ))}
                </div>
            </div>
            <div className="flex flex-row gap-4 pt-4">
                <StyledButton text={"SWAP"} onClick={(handleSwap)}/>
                <StyledButton text={"RULES"} onClick={() => setIsConfirmDialogVisible(true)} />
            </div>
            {isConfirmDialogVisible && (
        <ConfirmDialog setIsDialogVisible={setIsConfirmDialogVisible}/>
      )}
        </div>
    );
};

export default GuessContainer;
