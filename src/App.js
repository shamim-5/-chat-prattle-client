import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Home from "./components/Home";

function App() {
  return (
    <div className="lg:h-screen scrollbar-thin scrollbar-thumb-[#001529] scrollbar-track-slate-500">
      <Navbar>
        <Dashboard>
          <Home>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/inbox" element={<Conversation />} />
              <Route path="/inbox/:id" element={<Inbox />} />
            </Routes>
          </Home>
        </Dashboard>
      </Navbar>
    </div>
  );
}

export default App;
