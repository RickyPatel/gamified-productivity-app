import React from "react";

const LeaderBoardItem = (props) => {
  return (
    <div className=" border border-gray-400 p-4 rounded-md mb-4 flex justify-between items-center">
      <div className="text-white">{props.username}</div>
      <input
        type="button"
        className="py-2 px-3 bg-indigo-500 text-white rounded-md cursor-pointer"
        value={props.score}
      />
    </div>
  );
};

export default LeaderBoardItem;
