import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import MenuBoard from "./components/MenuBoard/menuboard";
import Inventory from "./components/Inventory/inventory";
import Employees from "./components/Employees/employees";
import Menuinfo from "./components/Menuinfo/menuinfo";
// import "./App.css"
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      <Route path="/menuboard" element={<MenuBoard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/menuinfo" element={<Menuinfo />} />
    </Routes>
    </ChakraProvider>
  );
}

export default App;
