import "./App.css";
import Home from "./pages/home/Home";
import Countdown from "react-countdown";
import React, { useState,useEffect } from "react";
import Login from "./pages/login/Login";
function App() {
  const  isAdmin  = true;
  return(
    <>
    <div className={isAdmin ? 'admin-background' : 'regular-background'}>
    <Login />
    </div>
    </>

  );
    
}

export default App;
