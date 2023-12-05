import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import ManagerDashboard from "./components/ManagerDashboard/ManagerDashboard";
import MenuBoard from "./components/MenuBoard/menuboard";
import Inventory from "./components/Inventory/inventory";
import Employees from "./components/Employees/employees";
import Menuinfo from "./components/Menuinfo/menuinfo";
import MenuBoardDisplay from "./components/MenuBoard/menuboarddisplay";
import SalesReport from "./components/salesreports/salesreport";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useEffect, useState } from "react";

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

  const[zoom, setZoom] = useState(100);
  
  const zoomIn = () =>{
    setZoom(prevZoom => prevZoom + 10);
  }

  const zoomOut = () =>{
    setZoom(prevZoom => prevZoom - 10);
  }

  const resetZoom = () => {
    setZoom(100);
  }

  useEffect(() => {
    var addScriptToTranslate = document.createElement("script");
    addScriptToTranslate.setAttribute("src","https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
    document.body.appendChild(addScriptToTranslate);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <ChakraProvider theme={customTheme}>
      <div style={{ zoom : zoom + "%",position: "absolute", top: "0", left: "0", zIndex: "999" }}>
        {/* Container for Google Translate element */}
        <div id="google_translate_element"></div>
      </div>
      <div style={{ zoom: zoom + "%", position: "fixed", bottom: "10px", right: "0" }}>
        <button style={{marginRight: "10px", color: "white"}} onClick={zoomIn}>Zoom In</button>
        <button style={{marginRight: "10px", color: "white"}} onClick={zoomOut}>Zoom Out</button>
        <button style={{color: "white"}} onClick={resetZoom}>Reset Zoom</button>
        </div>
        <div style={{ zoom: zoom + "%"}}>
      <Routes>
        <Route path="/" element={<MenuBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menuboard-display" element={<MenuBoardDisplay />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/menuinfo" element={<Menuinfo />} />
        <Route path="/salesreport" element={<SalesReport />} />
      </Routes>
      </div>
    </ChakraProvider>
  );
};

export default App;
