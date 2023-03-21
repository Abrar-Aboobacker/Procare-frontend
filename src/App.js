import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginChangeContainer from "./container/LoginChangeContainer";
import SighnUpChangeContainer from "./container/SighnUpChangeContainer";
import AdminLogin from "./Components/login/AdminLogin";
import Dashboard from "./Components/admin/pages/Dashboard";
import Doctors from "./Components/admin/pages/Doctors";
import { Toaster } from "react-hot-toast";
import axios from "./axios/axios";
import { useDispatch } from "react-redux";
import { adminlogin } from "./redux/admin";
import { AppContext } from "./context/AppContext";
import AdminProtectedRoutes from "./Components/protectedRoutes/AdminProtectedRoutes";
import AdminPubllicRoute from './Components/publicRoutes/AdminPubllicRoute';

function App() {
 

  return (
    <>
    <AppContext.Provider value={{
    }}>
      <BrowserRouter>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Routes>
        <Route path="/login" element={<LoginChangeContainer/>}/>
        <Route path="/signup" element={<SighnUpChangeContainer/>}/>
        <Route path="/admin_login" element={<AdminPubllicRoute><AdminLogin/></AdminPubllicRoute>}/>
        <Route path="/admin_dashboard" element={<AdminProtectedRoutes><Dashboard/></AdminProtectedRoutes>}/>
        <Route path="/admin_doctors" element={<AdminProtectedRoutes><Doctors/></AdminProtectedRoutes>}/>
      </Routes>
      </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}

export default App;
