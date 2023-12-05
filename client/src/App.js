import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import MenuBoard from "./components/MenuBoard/menuboard";
import Inventory from "./components/Inventory/inventory";
import Employees from "./components/Employees/employees";
import Menuinfo from "./components/Menuinfo/menuinfo";
import MenuBoardDisplay from "./components/MenuBoard/menuboarddisplay";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useEffect } from "react";

const customTheme = extendTheme({ 
  styles: {
    global: {
      body: {
        color: "black", // Set the default text color to black
      },
      "#google_translate_element .goog-te-text": {
        color: "black !important",
      },
    },
  },
})

const App = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({pageLanguage: "en"},"google_translate_element");
  };

  useEffect(() => {
    var addScriptToTranslate = document.createElement("script");
    addScriptToTranslate.setAttribute("src","https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
    document.body.appendChild(addScriptToTranslate);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <div style={{ position: "absolute", top: "0", left: "0", zIndex: "999" }}>
        {/* Container for Google Translate element */}
        <div id="google_translate_element"></div>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/menuboard-display" element={<MenuBoardDisplay />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/" element={<MenuBoard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/menuinfo" element={<Menuinfo />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;
