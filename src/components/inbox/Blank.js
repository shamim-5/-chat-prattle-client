import React from "react";
import blankImage from "../../assets/blank.svg";

const Blank = () => {
  return (
    <div className="h-[calc(100vh_-_129px)] flex lg:flex-col lg:space-y-4 items-center justify-center text-gray-700">
      <img src={blankImage} alt="No messages" className="w-10 hidden lg:block" />
      <div className="-rotate-90 lg:rotate-0 min-w-[130px] lg:min-w-0">No messages yet</div>
    </div>
  );
};

export default Blank;
