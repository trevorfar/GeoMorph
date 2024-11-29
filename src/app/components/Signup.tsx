import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setTopScore } from "../GlobalRedux/Features/userSlice"
import { RootState } from "../GlobalRedux/store";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { username, topScore } = useSelector(
    (state: RootState) => state.user
  );

  const [newUsername, setNewUsername] = useState("");

  const handleUsernameChange = () => {
    dispatch(setUsername(newUsername));
  };

  const handleScoreUpdate = (score: number) => {
    dispatch(setTopScore(score)); 
  };

  return (
    <div>
      <h2>User Profile</h2>
      <p>Active Username: {username}</p>
      <p>Top Score: {topScore}</p>

      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="Enter new username"
      />
      <button onClick={handleUsernameChange}>Update Username</button>

      <button onClick={() => handleScoreUpdate(150)}>Set Top Score to 150</button>
    </div>
  );
};

export default UserProfile;
