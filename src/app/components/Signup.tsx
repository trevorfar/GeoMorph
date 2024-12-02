import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../GlobalRedux/Features/userSlice";
import { RootState } from "../GlobalRedux/store";
import { updateHighscore } from "@/utils/updateDB";

const UserProfile = ({setShowSignin,
}: {
  setShowSignin: (visible: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state: RootState) => state.user);

  const [newUsername, setNewUsername] = useState("");

  const handleUsernameChange = () => {
    updateHighscore;
    dispatch(setUsername(newUsername));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl ">User Profile</h2>
      <p className="text-lg font-semibold">Enter a Username {username}</p>

      <div>
        <input
          type="text"
          className="border-2 border-black rounded-xl p-2"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          placeholder="Enter new username"
        />
      </div>

      <button
        className="bg-green-700 text-white py-2 px-4 rounded-xl
                         hover:bg-green-800 hover:text-opacity-55"
        onClick={() => {
          handleUsernameChange()
          setShowSignin(false)
        }}
      >
        Enter
      </button>
    </div>
  );
};

export default UserProfile;
