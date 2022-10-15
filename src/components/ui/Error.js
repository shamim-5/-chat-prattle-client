import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center">
      <div className="relative text-red-heavy max-w-xl px-4 py-2 text-red-800 rounded shadow w-full ">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Error;
