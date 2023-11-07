import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import MenuBoard from "./components/MenuBoard/menuboard";
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
    </Routes>
    </ChakraProvider>
  );
}

export default App;
