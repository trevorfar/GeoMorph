"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { nextGame } from "../../../GlobalRedux/Features/countrySlice";
import { AppDispatch } from "../../../GlobalRedux/store";
import ClassicGameContainer from "./ClassicGameContainer";
import Keyboard from "../../Keyboard";
import ClassicGuessContainer from "./ClassicGuessContainer";
import FooterButtons from "../../FooterButtons";

const Classic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);

  useEffect(() => {
    dispatch(nextGame());
  }, [dispatch]);

  return (
    <div className="flex justify-center md:rounded-xl items-center w-full md:w-3/5 mx-auto flex-col gap-8 bg-blue-500 h-screen select-none">
      <div className="">
        <ClassicGameContainer isActive isDisabled />
      </div>

      <div className="flex flex-col gap-4 justify-center items-center pt-2">
        <ClassicGuessContainer />
      </div>
      <div className="">{!isLeaderboardVisible && <Keyboard />}</div>
      <FooterButtons setIsLeaderboardVisible={setIsLeaderboardVisible} />
    </div>
  );
};
export default Classic;
