import React from "react";
import Navbar from "../components/Navbar";
import axios from "axios";


const Leaderboard = () => {
  
  const [usersList, setusersList] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getPeople = async () => {
      const res = await axios.get("/leaderboard");
      for (var index in res.data.usersList) {
        // setusersList((usersList) => [
        //   ...usersList,
        //   {
        //     key: Math.random().toString(),
        //     value: res.data.usersList[index].username,
        //   },
        // ]);
        setusersList((usersList) => [
          ...usersList,
          res.data.usersList[index].username,
        ]);
      }
      console.log(usersList);
    };
    getPeople();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {usersList.map((item, key) => (
          <p key={key}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
