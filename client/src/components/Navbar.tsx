import React from "react";
import Logout from "./auth/Logout";
import axios from "axios";

const Navbar = () => {
  const onLeaderboardClickHandler = () => {
    console.log("clicked");
    axios.get("/leaderboard", {});
  };
  return (
    <div className="flex justify-between bg-green-400 p-8 text-white">
      <p className="font-bold text-lg">Mern TODO</p>
      <button className="leaderboard" onClick={onLeaderboardClickHandler}>
        Leaderboard
      </button>
      <Logout />
    </div>
  );
};

export default Navbar;
