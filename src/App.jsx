import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";

const App = () => {
  /* This is the Parent element, and it doesn't have any siblings
            Element contains two sub elements:
              - Navbar --> navigation bar
              - Outlet --> it is a react-router-dom element, is used in parent route elements to render their child route elements
  */
  return (
    <div className="font-custom relative text-gray-500 px-4 max-w-[1280px] mx-auto">
      <Navbar/>
      <Outlet/>
      {/* 
        Here I can render footer
      */}
      <div className=" h-28"></div>
    </div>
  );
};

export default App;
