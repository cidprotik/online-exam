import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Routes,Route, Navigate } from 'react-router-dom'
import Start from "./pages/home/Start";
function App() {
  const { authUser } = useAuthContext();
  console.log("first",authUser);
  const  isAdmin  = true;
  return(
    <>
    <div className={isAdmin ? 'admin-background' : 'regular-background'}>
    <Routes>
        <Route path='/'  element={authUser ? <Start /> : <Navigate to='/login' />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}  />
      </Routes>
    <Toaster />
    </div>
    </>

  );
    
}

export default App;
