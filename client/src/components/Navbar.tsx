import React, { useState } from "react";
import Logout from "./auth/Logout";
import axios from "axios";

const Navbar = () => {
  const [score, setScore] = useState();
  const [streak, setStreak] = useState();
  const [level, setLevel] = useState();

  const onLeaderboardClickHandler = () => {
    window.location.href = "/leaderboard";
  };
  const logoClickHandler = () => {
    window.location.href = "/dashboard";
  };

  React.useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/userdetails", {
        headers: { token: localStorage.getItem("token") },
      });
      setScore(res.data.user.score);
      setStreak(res.data.user.streak);
      setLevel(res.data.user.level);
    };
    getUserDetails();
  }, []);

  return (
    <div className="flex justify-between bg-indigo-500 p-8 text-white">
      <p onClick={logoClickHandler} className="font-bold text-lg">
        Be Productive
      </p>
      <button
        type="reset"
        className="leaderboard"
        onClick={onLeaderboardClickHandler}
      >
        <p>Leaderboard</p>
      </button>
      <p>Score: {score}</p>
      <p> Streak: {streak} days</p>
      <p> Level: {level}</p>
      <Logout />
    </div>
  );
};

export default Navbar;
