import React from "react";
import { Route, Routes } from "react-router-dom";
import Inbox from "../pages/Inbox";
import Conversation from "../pages/Conversation";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Home = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inbox" element={<Conversation />} />
        <Route path="/inbox/:id" element={<Inbox />} />
      </Routes>
    </div>
  );
};

export default Home;
