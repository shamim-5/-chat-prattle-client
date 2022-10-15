import React from "react";
import Blank from "../components/inbox/Blank";
import Sidebar from "../components/inbox/Sidebar";

const Conversation = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto -mt-1">
        <div className="min-w-full rounded flex lg:grid lg:grid-cols-4">
          <Sidebar />
          <div className="w-full lg:col-span-3 lg:block">
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
