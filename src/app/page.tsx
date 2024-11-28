"use client"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { nextGame } from "./GlobalRedux/Features/countrySlice"
import { AppDispatch } from "./GlobalRedux/store"
import GameContainer from "./components/GameContainer"
import Keyboard from "./components/Keyboard"
import GuessContainer from "./components/GuessContainer"




const Page = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(nextGame())
  }, [dispatch])

  const openChangelog = () => {
    const changelogContent = `
    Changelog:

    Version 1.0.1:
    - Fixed bug where guesses were not being tracked correctly
    - Added a current streak, once you get 5 your score goes up by 2 and you're awarded an additonal hint. At 10, it goes up by 3 and you get 2 more hints.
    - Added new hints feature

    Version 1.0.0:
    - Initial release
    `;

    const blob = new Blob([changelogContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank"; // Opens in a new tab
    link.click(); // Trigger the download/opening of the file
    URL.revokeObjectURL(url); // Clean up the object URL after use
  };

  return (
    <div className="flex justify-center md:rounded-xl items-center w-full md:w-3/5 mx-auto flex-col gap-8 bg-blue-500 h-screen select-none">
      <div className="">
      <GameContainer isActive isDisabled/>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center pt-2">
      <GuessContainer />
      </div>
      <div className="">
      <Keyboard />
      </div>
      <button 
          onClick={openChangelog}
          className="bg-green-500 text-white py-2 px-4 rounded-xl"
        >
          View Changelog
      </button>
    </div>
  )
}
export default Page
