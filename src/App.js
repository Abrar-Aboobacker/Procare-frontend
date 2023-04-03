import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginChangeContainer from "./container/LoginChangeContainer";
import SighnUpChangeContainer from "./container/SighnUpChangeContainer";
import AdminLogin from "./Components/login/AdminLogin";
import Dashboard from "./Components/Admin/Dashboard";
import Doctors from "./Components/Admin/Doctors";
import { Toaster } from "react-hot-toast";
import axios from "./axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "./context/AppContext";
import AdminProtectedRoutes from "./protectedRoutes/AdminProtectedRoutes";
import AdminPubllicRoute from './publicRoutes/AdminPubllicRoute';
// import Sidebar from './Components/sidebar/Sidebar'
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorPublicRoute from "./publicRoutes/DoctorPublicRoute";
import DoctorProtectedRoutes from "./protectedRoutes/DoctorProtectedRoutes";
import { CircularProgress } from "@mui/material";
import  './index.css'
import DoctorInfo from "./Components/Doctor/DoctorInfo";
import Notification from "./Components/Admin/Notification";
import NewDoctor from "./Components/Admin/NewDoctor";
function App() {
 
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const {loading}= useSelector(state=>state.alerts)
 
  return (
    <>
    <AppContext.Provider value={{
    }}>
      <BrowserRouter>
      {loading&& (<div className="spinner-parent">
      <CircularProgress variant="determinate" value={progress} sx={{color:"white"}} />
      </div>)}
      
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Routes>
        <Route exact  path="/login"  element={<DoctorPublicRoute><LoginChangeContainer/></DoctorPublicRoute>}/>
        <Route path="/signup" element={<SighnUpChangeContainer/>}/>
        <Route path="/admin_login" element={<AdminPubllicRoute><AdminLogin/></AdminPubllicRoute>}/>
        <Route path="/admin_dashboard" element={<AdminProtectedRoutes><Dashboard/></AdminProtectedRoutes>}/>
        <Route path="/admin_doctors" element={<AdminProtectedRoutes><Doctors/></AdminProtectedRoutes>}/>
        <Route path="/admin_notification" element={<AdminProtectedRoutes><Notification/></AdminProtectedRoutes>}/>
        <Route path="/admin_new_doctor" element={<AdminProtectedRoutes><NewDoctor/></AdminProtectedRoutes>}/>
        <Route path="/doctor_moreinfo" element={<DoctorProtectedRoutes><DoctorInfo/></DoctorProtectedRoutes>} />
        <Route path="/doctor_profile" element={<DoctorProtectedRoutes><DoctorProfile/></DoctorProtectedRoutes>} />
      </Routes>
      </BrowserRouter>
      </AppContext.Provider>
      
    </>
  );
}

export default App;
