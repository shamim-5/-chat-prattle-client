import React from "react";
import { useSelector } from "react-redux";
import getAvater from "gravatar-url";

const ChatHead = ({ message }) => {
  const { user } = useSelector((state) => state.auth);
  const { email } = user || {};

  const { sender, receiver } = message || {};

  const partnerEmail = sender.email === email ? receiver.email : sender.email;

  const partnerName = sender.email === email ? receiver.name : sender.name;

  return (
    <div className="relative flex items-center p-3 border border-[#1C2E4C]">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src={getAvater(partnerEmail, { size: 80 })}
        alt={partnerName}
      />
      <span className="block ml-2 font-bold text-gray-light">{partnerName}</span>
    </div>
  );
};

export default ChatHead;
