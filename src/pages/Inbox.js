import React from 'react';
import ChatBody from '../components/inbox/chatBody/ChatBody';
import Sidebar from '../components/inbox/Sidebar';

const Inbox = () => {
   return (
     <div>
       <div className="max-w-7xl mx-auto -mt-1">
         <div className="min-w-full rounded  lg:grid lg:grid-cols-4 flex-row lg:space-y-0 space-y-4">
           <Sidebar />
           <ChatBody />
         </div>
       </div>
     </div>
   );
};

export default Inbox;