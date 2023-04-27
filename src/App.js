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
import DoctorsList from "./pages/user/DoctorsList";
import ErrorPage from "./pages/404/ErrorPage";
import PriceListing from "./pages/user/PriceListing";
import Pricing from "./Components/Admin/Pricing";
import Doctor_profile from "./pages/user/Doctor_profile";
import DoctorMoreInfo from "./pages/doctor/DoctorMoreInfo";
import UserProfilePage from "./pages/user/UserProfilePage";
import BookingPage from "./pages/user/BookingPage";
import DoctorProfile2 from "./pages/doctor/DoctorProfile2";
import DoctorAppointmentHistory from "./Components/DoctorProfile/DoctorAppointmentHistory";
import UserAppointment from "./Components/user/UserProfile/UserAppointment";
import UserAppointmentHistory from "./Components/user/UserProfile/UserAppointmentHistory";
import AppointmentHistory from "./pages/admin/AppointmentHistory";
import DoctorNotificationPage from "./pages/doctor/DoctorNotificationPage";

function App() {
 
  const [progress, setProgress] = React.useState(0);



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
        <Route path='*' element = {<ErrorPage/>}/>
        {/* User Routes */}
        <Route path="/user_login" element={<UserLogin/>}/>
        <Route path="/user_signup" element={<UserSignUp/>}/>
        <Route path="/user_otp" element={<Otp/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path='/doctors'element={<DoctorsList/>}/>
        <Route path='/doctor_details/:id'element={<Doctor_profile/>} />
        <Route path='/plan_pricing' element={<PriceListing/>}/>
        <Route path='/user_profile' element={<UserProfilePage/>}/>
        <Route path='/doctor_appointment/:id' element={<BookingPage/>}/>
        <Route path='/user/Appointment' element={<UserAppointment/>}/>
        <Route path ='/user/AppointmentHistory' element={<UserAppointmentHistory/>}/>
        {/* Doctor Routes */}
        <Route path="/doctor_login"  element={<DoctorPublicRoute><DoctorLogin/></DoctorPublicRoute>}/>
        <Route path="/doctor_signup" element={<DoctorSignUp/>}/> 
        <Route path="/doctor_otp" element={<DoctorOtp/>}/>
        <Route path="/doctor_moreinfo" element={<DoctorWaitingProtectedRoutes><DoctorMoreInfo/></DoctorWaitingProtectedRoutes>} />
        <Route path="/doctor_profile" element={<DoctorProtectedRoutes><DoctorProfile2/></DoctorProtectedRoutes>} />
        <Route path="/Doctor/AppointmentHistory"element={<DoctorProtectedRoutes><DoctorAppointmentHistory/></DoctorProtectedRoutes>}/>
        <Route path="/doctor_waiting_page" element={<DoctorWaitingProtectedRoutes><DoctorWaitingPage/></DoctorWaitingProtectedRoutes>}/>
        <Route path="/doctor_reject" element={<DoctorWaitingProtectedRoutes><DoctorRejectUi/></DoctorWaitingProtectedRoutes>}/>
        <Route path="/doctor_notification" element={<DoctorProtectedRoutes><DoctorNotificationPage/></DoctorProtectedRoutes>}/>
          {/* Admin Routes */}
        <Route path="/admin_login" element={<AdminPubllicRoute><AdminLogin/></AdminPubllicRoute>}/>
        <Route path="/admin_dashboard" element={<AdminProtectedRoutes><Dashboard/></AdminProtectedRoutes>}/>
        <Route path="/admin_doctors" element={<AdminProtectedRoutes><Doctors/></AdminProtectedRoutes>}/>
        <Route path="/admin_notification" element={<AdminProtectedRoutes><Notification/></AdminProtectedRoutes>}/>
        <Route path="/admin_new_doctor" element={<AdminProtectedRoutes><NewDoctor/></AdminProtectedRoutes>}/>
        <Route path="/admin_users" element={<AdminProtectedRoutes><Users/></AdminProtectedRoutes>}/>
        <Route path="/admin_pricing" element={<AdminProtectedRoutes><Pricing/></AdminProtectedRoutes>}/>
        <Route path="/admin_Appointment_page" element={<AdminProtectedRoutes><AppointmentHistory/></AdminProtectedRoutes>}/>
      </Routes>
      </BrowserRouter>
      </AppContext.Provider>
      
    </>
  );
}

export default App;
