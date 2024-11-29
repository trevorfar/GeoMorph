"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { nextGame } from "../../../GlobalRedux/Features/countrySlice";
import { AppDispatch } from "../../../GlobalRedux/store";
import Keyboard from "../../Keyboard";
import FooterButtons from "../../FooterButtons";
import { promptSignin } from "@/utils/promptSignin";
import Signup from "../../Signup";
import LeaderboardGameContainer from "./LeaderboardGameContainer";
import LeaderboardGuessContainer from "./LeaderboardGuessContainer";

const  Classic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  useEffect(() => {
    const checkSignin = async () => {
    if (!(await promptSignin())) {
      setShowSignin(true);
    }
  };
  checkSignin();
  }, [])
  
  useEffect(() => {
    dispatch(nextGame())
  }, [dispatch])

  return (
    <div className="flex justify-center md:rounded-xl items-center w-full md:w-3/5 mx-auto flex-col gap-8 bg-blue-500 h-screen select-none">
      <div className="">
        <LeaderboardGameContainer isActive isDisabled />
      </div>

      <div className="flex flex-col gap-4 justify-center items-center pt-2">
        <LeaderboardGuessContainer />
      </div>
      <div className="">{!isLeaderboardVisible && !showSignin && <Keyboard />}</div>
      <FooterButtons setIsLeaderboardVisible={setIsLeaderboardVisible} />
      {showSignin && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3">
            <Signup setShowSignin={setShowSignin}/>
            <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowSignin(false)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl "
            >
              Don&apos;t sign in
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Classic;
