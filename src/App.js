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
import useAuthCheck from "./hooks/useAuthCheck";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Demo from "./pages/Demo";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication</div>
  ) : (
    <div className="lg:h-screen text-gray scrollbar-thin  scrollbar-thumb-[#001529] scrollbar-track-slate-500">
      <Navbar>
        <Dashboard>
          <Home>
            <Routes>
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/inbox"
                element={
                  <PrivateRoute>
                    <Conversation />
                  </PrivateRoute>
                }
              />
              <Route
                path="/inbox/:id"
                element={
                  <PrivateRoute>
                    <Inbox />
                  </PrivateRoute>
                }
              />
              <Route
                path="/demo"
                element={
                  <PrivateRoute>
                    <Demo />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Home>
        </Dashboard>
      </Navbar>
    </div>
  );
}

export default App;
