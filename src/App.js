import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import User from "./pages/Users/User";
import Login from "./component/Login";
import AddUser from "./pages/Users/AddUser";

import "bootstrap/dist/css/bootstrap.min.css";
import EditUser from "./pages/Users/EditUser";
import Stations from "./pages/Stations/Stations";
import AddStation from "./pages/Stations/AddStation";
import EditStation from "./pages/Stations/EditStation";
import Robot from "./pages/Robot/Robot";
import AddRobot from "./pages/Robot/AddRobot";
import EditRobot from "./pages/Robot/EditRobot";
import Remote1 from "./pages/Remote/Remote1";
import Controlls from "./pages/Controlls/Controlls";
import Register from "./component/Register";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/stations/add" element={<AddStation />} />
          <Route path="/stations/edit/:id" element={<EditStation />} />
          <Route path="/robot" element={<Robot />} />
          <Route path="/robot/add" element={<AddRobot />} />
          <Route path="/robot/edit/:id" element={<EditRobot />} />
          <Route path="/remote" element={<Remote1 />} />
          <Route path="/controll/:id" element={<Controlls />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
