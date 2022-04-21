import React, { useState } from "react";
import Logout from "./auth/Logout";
import axios from "axios";
import Leaderboard from "./Leaderboard/Leaderboard";

const Navbar = () => {
  const onLeaderboardClickHandler = () => {
    console.log("clicked");
    window.location.href = "/leaderboard";
  };
  const logoClickHandler = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex justify-between bg-indigo-500 p-8 text-white">
      <p onClick={logoClickHandler} className="font-bold text-lg">
        Be Productive
      </p>
      <button className="leaderboard" onClick={onLeaderboardClickHandler}>
        <p>Leaderboard</p>
      </button>
      <Logout />
    </div>
  );
};

export default Navbar;
