"use client";

import "tailwindcss/tailwind.css";
import {v4 as uuidv4} from "uuid";
import {useEffect, useReducer} from "react";
import structuredClone from "@ungap/structured-clone";
import words from "../words";

type Style = {
  [key: string]: string;
};

const style: Style = {
  default: "bg-white border-2 border-zinc-300",
  tempAns: "bg-white text-black border-2 border-zinc-400",
  correctSpot: "bg-lime-600 text-white",
  wrongSpot: "bg-amber-500 text-white",
  wrongWord: "bg-slate-600 text-white",
};

type ContentObj = {
  word: string | undefined;
  style: string;
};

type ContentObjs = {
  [key: string]: ContentObj[];
};

type InitState = {
  contentsObj: ContentObjs;
  currentRow: string;
  currentCol: number;
  winTheGame: boolean;
  answer: string[];
};

const contentObj: ContentObj = {
  word: "",
  style: style.default,
};

const initState: InitState = {
  contentsObj: {
    0: Array(5).fill(contentObj),
    1: Array(5).fill(contentObj),
    2: Array(5).fill(contentObj),
    3: Array(5).fill(contentObj),
    4: Array(5).fill(contentObj),
    5: Array(5).fill(contentObj),
  },
  currentRow: "0",
  currentCol: -1,
  winTheGame: false,
  answer: [],
};

const resetState = structuredClone(initState);

type Action = {
  type: string;
  payload?: string;
};

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)]
    .toUpperCase()
    .split("");
};

const reducer = (state: InitState, action: Action): InitState => {
  switch (action.type) {
    case "addLetter":
      if (state.currentCol === 4) {
        return state;
      } else {
        state.contentsObj[state.currentRow][state.currentCol + 1] = {
          word: action.payload,
          style: style.tempAns,
        };
        return {
          ...state,
          currentCol: state.currentCol + 1,
          contentsObj: state.contentsObj,
        };
      }

    case "delete":
      if (
        (state.currentCol === 4 && state.currentRow === "5") ||
        state.winTheGame === true
      ) {
        return state;
      } else {
        state.contentsObj[state.currentRow][state.currentCol] = {
          word: "",
          style: style.default,
        };
        return {
          ...state,
          currentCol: state.currentCol - 1 >= -1 ? state.currentCol - 1 : -1,
        };
      }
    case "enter":
      if (state.currentCol === 4) {
        let score: number = 0;
        state.contentsObj[state.currentRow] = state.contentsObj[
          state.currentRow
        ].map((obj: ContentObj, idx: number) => {
          if (obj.word === state.answer[idx]) {
            score += 1;
            return {word: obj.word, style: style.correctSpot};
          } else if (obj.word && state.answer.includes(obj.word)) {
            return {word: obj.word, style: style.wrongSpot};
          } else {
            return {word: obj.word, style: style.wrongWord};
          }
        });
        return {
          ...state,
          currentRow:
            score === 5 || state.currentRow === "5"
              ? state.currentRow
              : String(Number(state.currentRow) + 1),
          currentCol:
            score === 5 || state.currentRow === "5" ? state.currentCol : -1,
          winTheGame: score === 5,
        };
      } else {
        return state;
      }

    case "reset":
      const restStateWithNewAnswer = structuredClone(resetState);
      restStateWithNewAnswer.answer = getRandomWord();
      return restStateWithNewAnswer;

    case "getNewAnwser":
      return {
        ...state,
        answer: getRandomWord(),
      };

    default:
      return structuredClone(resetState);
  }
};

const buttonClassNames =
  "w-11 h-10 text-orange-600 hover:text-orange-300 cursor-pointer";

export default function Page() {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key.match(/^[a-zA-Z]$/)) {
      const key = event.key.toUpperCase() as string;
      dispatch({type: "addLetter", payload: key});
    }
  };

  useEffect(() => {
    dispatch({type: "getNewAnwser", payload: ""});
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="text-yellow-600 font-bold text-5xl">Wordle</div>

      <div className="grid grid-cols-5 grid-flow-row gap-4 mt-5">
        {[...Array(6)].map((_, idx) => {
          return state.contentsObj[idx].map((contentObj: ContentObj) => {
            return (
              <div
                key={uuidv4()}
                className={
                  "w-20 h-20 flex justify-center items-center text-2xl " +
                  `${contentObj.style}`
                }>
                {contentObj.word}
              </div>
            );
          });
        })}
      </div>

      <div className="flex space-x-40">
        <div
          className={buttonClassNames}
          onClick={() => dispatch({type: "enter"})}>
          ENTER
        </div>
        <div
          className={buttonClassNames}
          onClick={() => dispatch({type: "delete"})}>
          DELETE
        </div>
        <div
          className={buttonClassNames}
          onClick={() => dispatch({type: "reset"})}>
          RESET
        </div>
      </div>
      <div>{state.winTheGame && "You Win!"}</div>
    </div>
  );
}
