import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
// import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manager-dashboard" element={<ManagerDashboard />} />
    </Routes>
  );
}

export default App;
