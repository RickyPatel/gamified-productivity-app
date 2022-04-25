import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import LeaderBoardItem from "../components/Leaderboard/LeaderBoardItem";

interface Provider {
  username: string;
  score: number;
}

const Leaderboard = () => {
  const [usersList, setusersList] = React.useState<Provider[]>([]);

  React.useEffect(() => {
    const getPeople = async () => {
      const res = await axios.get("/leaderboard");
      const sorted = [...res.data.usersList].sort((a, b) => b.score - a.score);
      setusersList(sorted);
    };
    getPeople();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-10 my-10 w-2/5">
        <div className=" p-4 rounded-md mb-4 flex justify-between items-center">
          <div className="text-white">User name</div>
          <p className="py-2 px-3 text-white rounded-md">Score</p>
        </div>
        {usersList.map((item, key) => (
          <LeaderBoardItem
            key={key}
            username={item.username}
            score={item.score}
          ></LeaderBoardItem>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
