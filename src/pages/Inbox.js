import React from 'react';
import ChatBody from '../components/inbox/chatBody/ChatBody';
import Sidebar from '../components/inbox/Sidebar';

const Inbox = () => {
   return (
     <div>
       <div className="max-w-7xl mx-auto -mt-1">
         <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
           <Sidebar />
           <ChatBody />
         </div>
       </div>
     </div>
   );
};

export default Inbox;