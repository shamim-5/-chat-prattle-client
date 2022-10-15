import React from "react";
import { useParams } from "react-router-dom";
import Blank from "../components/inbox/Blank";
import Sidebar from "../components/inbox/Sidebar";

const Conversation = () => {
  const { id } = useParams();

  return (
    <div>
      <div className="max-w-7xl mx-auto -mt-1">
        <div className="min-w-full rounded lg:space-y-0 space-y-4 lg:grid lg:grid-cols-4">
          <Sidebar />
          <div className={`w-full lg:col-span-3 lg:block  ${id ? "" : "hidden"} lg:visible`}>
            <div className="w-full grid conversation-row-grid">
              <Blank />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
