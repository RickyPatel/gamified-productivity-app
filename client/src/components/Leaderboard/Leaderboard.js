import { React, useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [usersList, setUsersList] = useState();

  useEffect(() => {
    const getPeople = async () => {
      const res = await axios.get("/leaderboard");
      console.log("from heere")
      console.log(res.data.userslist);
      res.data.userslist.forEach((element) => {
        console.log(element.username);
      });
    };
    getPeople();
  }, []);

  return (
    <div>
      <h1>Leaderboard page</h1>
    </div>
  );
};

export default Leaderboard;
