import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Components/login/AdminLogin";
import Dashboard from "./Components/Admin/Dashboard";
import Doctors from "./Components/Admin/Doctors";
import { Toaster } from "react-hot-toast";
import {  useSelector } from "react-redux";
import { AppContext } from "./context/AppContext";
import AdminProtectedRoutes from "./protectedRoutes/AdminProtectedRoutes";
import AdminPubllicRoute from './publicRoutes/AdminPubllicRoute';
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorPublicRoute from "./publicRoutes/DoctorPublicRoute";
import DoctorProtectedRoutes from "./protectedRoutes/DoctorProtectedRoutes";
import { CircularProgress } from "@mui/material";
import  './index.css'
import DoctorInfo from "./Components/Doctor/DoctorInfo";
import Notification from "./Components/Admin/Notification";
import NewDoctor from "./Components/Admin/NewDoctor";
import UserLogin from "./Components/login/UserLogin";
import DoctorLogin from "./Components/login/DoctorLogin";
import UserSignUp from './Components/signup/UserSignUp';
import DoctorSignUp from './Components/signup/DoctorSignUp';
import Otp from "./Components/user/Otp";
import Users from "./Components/Admin/Users";
import DoctorWaitingPage from "./Components/Doctor/DoctorWaitingPage";
import DoctorRejectUi from "./Components/Doctor/DoctorRejectUi";
import DoctorWaitingPublicRoutes from "./publicRoutes/DoctorWaitingPublicRoutes";
import DoctorWaitingProtectedRoutes from "./protectedRoutes/DoctorWaitingProtectedRoutes";
import DoctorOtp from "./Components/Doctor/DoctorOtp";
import Home from "./pages/user/Home";

function App() {
 
  const [progress, setProgress] = React.useState(0);

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
  //   }, 800);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

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
        {/* User Routes */}
        <Route path="/user_login" element={<UserLogin/>}/>
        <Route path="/user_signup" element={<UserSignUp/>}/>
        <Route path="/user_otp" element={<Otp/>}/>
        <Route path="/" element={<Home/>}/>
        {/* Doctor Routes */}
        <Route exact  path="/doctor_login"  element={<DoctorPublicRoute><DoctorLogin/></DoctorPublicRoute>}/>
        <Route path="/doctor_signup" element={<DoctorSignUp/>}/> 
        <Route path="/doctor_otp" element={<DoctorOtp/>}/>
        <Route path="/doctor_moreinfo" element={<DoctorWaitingProtectedRoutes><DoctorInfo/></DoctorWaitingProtectedRoutes>} />
        <Route path="/doctor_profile" element={<DoctorProtectedRoutes><DoctorProfile/></DoctorProtectedRoutes>} />
        <Route path="/doctor_waiting_page" element={<DoctorWaitingProtectedRoutes><DoctorWaitingPage/></DoctorWaitingProtectedRoutes>}/>
        <Route path="/doctor_reject" element={<DoctorWaitingProtectedRoutes><DoctorRejectUi/></DoctorWaitingProtectedRoutes>}/>
          {/* Admin Routes */}
        <Route path="/admin_login" element={<AdminPubllicRoute><AdminLogin/></AdminPubllicRoute>}/>
        <Route path="/admin_dashboard" element={<AdminProtectedRoutes><Dashboard/></AdminProtectedRoutes>}/>
        <Route path="/admin_doctors" element={<AdminProtectedRoutes><Doctors/></AdminProtectedRoutes>}/>
        <Route path="/admin_notification" element={<AdminProtectedRoutes><Notification/></AdminProtectedRoutes>}/>
        <Route path="/admin_new_doctor" element={<AdminProtectedRoutes><NewDoctor/></AdminProtectedRoutes>}/>
        <Route path="/admin_users" element={<AdminProtectedRoutes><Users/></AdminProtectedRoutes>}/>
      </Routes>
      </BrowserRouter>
      </AppContext.Provider>
      
    </>
  );
}

export default App;
