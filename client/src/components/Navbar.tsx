import React, { useState } from "react";
import Logout from "./auth/Logout";
import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [score, setScore] = useState();
  const [streak, setStreak] = useState();
  const [level, setLevel] = useState();

  const onLeaderboardClickHandler = () => {
    window.location.href = "/leaderboard";
    return false;
  };
  const logoClickHandler = () => {
    window.location.href = "/dashboard";
    return false;
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
      <Link to="/dashboard" className="font-bold text-lg">
        Be Productive
      </Link>
      <Link to="/leaderboard">Leaderboard</Link>
      {/* <p onClick={logoClickHandler} className="font-bold text-lg">
        Be Productive
      </p> */}
      {/* <button
        type="reset"
        className="leaderboard"
        onClick={onLeaderboardClickHandler}
      >
        <p>Leaderboard</p>
      </button> */}
      <p>Score: {score}</p>
      <p> Streak: {streak} days</p>
      <p> Level: {level}</p>
      <Logout />
    </div>
  );
};

export default Navbar;
