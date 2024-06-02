"use client"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../GlobalRedux/store"
import { type, del, submit } from "../GlobalRedux/Features/countrySlice"
import { useEffect } from "react"

export const keys = {
  topRow: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  middleRow: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  bottomRow: ["Enter", "Z", "X", "C", "V", "B", "N", "M", "←"],
}

const Keyboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { index, country } = useSelector((state: RootState) => state.country)

  const handleSubmit = () => {
    dispatch(submit())
  
  }

  const handleClick = (letter: string) => {
    switch (letter) {
      case keys.bottomRow[8].toUpperCase():
        if (index !== 0) {
          dispatch(del())
        }
        break
      case "Enter":
        handleSubmit()
        break
      case "BACKSPACE":
        if (index !== 0) {
          dispatch(del())
        }
        break
      default:
        dispatch(type(letter))
    }
  }

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()

      if (
        keys.topRow.includes(key) ||
        keys.middleRow.includes(key) ||
        keys.bottomRow.includes(key) ||
        key === "BACKSPACE" ||
        key === "ENTER"
      ) {
        switch (key) {
          case "ENTER":
            handleSubmit()
            break
          case "BACKSPACE":
            if (index !== 0) {
              handleClick(key)
            }
            break
          default:
            if (index < Array.from(country).length) {
              handleClick(key)
            }
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
//prod push
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, country])

  return (
    <div className="flex flex-wrap justify-center w-full text-center select-none">
      <div className="flex flex-wrap justify-center w-full text-center gap-1 p-1">
        {keys.topRow.map((letter, idx) => (
          <div
            className="w-8 h-14 rounded-lg hover:bg-gray-300 bg-gray-400 justify-center items-center flex"
            key={letter}
            onClick={() => handleClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <br />
      <div className="flex flex-wrap justify-center w-full text-center gap-1 p-1">
        {keys.middleRow.map((letter) => {
          return (
            <div
              className="w-8 h-14 rounded-lg hover:bg-gray-300 bg-gray-400 justify-center items-center flex"
              key={letter}
              onClick={() => handleClick(letter)}
            >
              {letter}
            </div>
          )
        })}
      </div>
      <br />
      <div className="flex flex-wrap justify-center w-full gap-1">
        {keys.bottomRow.map((letter, idx) => (
          <div
            className={`p-1 w-${
              idx === 0 || idx === 8 ? "12" : "8"
            } h-14 rounded-lg hover:bg-gray-300 bg-gray-400 justify-center items-center flex`}
            key={letter}
            onClick={() => handleClick(letter)}
          >
          {letter}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Keyboard
