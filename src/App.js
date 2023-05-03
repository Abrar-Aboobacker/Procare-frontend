import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Components/login/AdminLogin";
import { Toaster } from "react-hot-toast";
import {  useSelector } from "react-redux";
import { AppContext } from "./context/AppContext";
import AdminProtectedRoutes from "./protectedRoutes/AdminProtectedRoutes";
import AdminPubllicRoute from './publicRoutes/AdminPubllicRoute';
import DoctorPublicRoute from "./publicRoutes/DoctorPublicRoute";
import DoctorProtectedRoutes from "./protectedRoutes/DoctorProtectedRoutes";
import { CircularProgress } from "@mui/material";
import  './index.css'
import Notification from "./Components/Admin/Notification";
import DoctorLogin from "./Components/login/DoctorLogin";
import UserSignUp from './Components/signup/UserSignUp';
import DoctorSignUp from './Components/signup/DoctorSignUp';
import Otp from "./Components/user/Otp";
import DoctorWaitingPage from "./Components/Doctor/DoctorWaitingPage";
import DoctorRejectUi from "./Components/Doctor/DoctorRejectUi";
import DoctorWaitingProtectedRoutes from "./protectedRoutes/DoctorWaitingProtectedRoutes";
import DoctorOtp from "./Components/Doctor/DoctorOtp";
import Home from "./pages/user/Home";
import DoctorsList from "./pages/user/DoctorsList";
import ErrorPage from "./pages/404/ErrorPage";
import PriceListing from "./pages/user/PriceListing";
import DoctorProfile from "./pages/user/DoctorProfile";
import DoctorMoreInfo from "./pages/doctor/DoctorMoreInfo";
import UserProfilePage from "./pages/user/UserProfilePage";
import BookingPage from "./pages/user/BookingPage";
import DoctorProfile2 from "./pages/doctor/DoctorProfile2";
import DoctorAppointmentHistory from "./Components/DoctorProfile/DoctorAppointmentHistory";
import UserAppointment from "./Components/user/UserProfile/UserAppointment";
import UserAppointmentHistory from "./Components/user/UserProfile/UserAppointmentHistory";
import DoctorNotificationPage from "./pages/doctor/DoctorNotificationPage";
import UserNotification from "./pages/user/UserNotification";
import UserLoginPage from "./pages/user/UserLoginPage";
import UserChat from "./Components/user/UserProfile/UserChat";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminDoctorViewPage from "./pages/admin/AdminDoctorViewPage";
import AdminNewDoctorPage from "./pages/admin/AdminNewDoctorPage";
import AdminUserPage from "./pages/admin/AdminUserPage";
import AdminPlanPage from "./pages/admin/AdminPlanPage";
import AdminAppointmentPage from "./pages/admin/AdminAppointmentPage";

function App() {
 
  const [progress] = React.useState(0);



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
        <Route path="/user_login" element={<UserLoginPage/>}/>
        <Route path="/user_signup" element={<UserSignUp/>}/>
        <Route path="/user_otp" element={<Otp/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path='/doctors'element={<DoctorsList/>}/>
        <Route path='/doctor_details/:id'element={<DoctorProfile/>} />
        <Route path='/plan_pricing' element={<PriceListing/>}/>
        <Route path='/user_profile' element={<UserProfilePage/>}/>
        <Route path='/doctor_appointment/:id' element={<BookingPage/>}/>
        <Route path='/user/Appointment' element={<UserAppointment/>}/>
        <Route path ='/user/AppointmentHistory' element={<UserAppointmentHistory/>}/>
        <Route path="/user_notification" element={<UserNotification/>}/>
        <Route path ='user_chat' element={<UserChat/>}/>
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
        <Route path="/admin_dashboard" element={<AdminProtectedRoutes><AdminDashboardPage/></AdminProtectedRoutes>}/>
        <Route path="/admin_doctors" element={<AdminProtectedRoutes><AdminDoctorViewPage/></AdminProtectedRoutes>}/>
        <Route path="/admin_notification" element={<AdminProtectedRoutes><Notification/></AdminProtectedRoutes>}/>
        <Route path="/admin_new_doctor" element={<AdminProtectedRoutes><AdminNewDoctorPage/></AdminProtectedRoutes>}/>
        <Route path="/admin_users" element={<AdminProtectedRoutes><AdminUserPage/></AdminProtectedRoutes>}/>
        <Route path="/admin_pricing" element={<AdminProtectedRoutes><AdminPlanPage/></AdminProtectedRoutes>}/>
        <Route path="/admin_Appointment_page" element={<AdminProtectedRoutes><AdminAppointmentPage/></AdminProtectedRoutes>}/>
      </Routes>
      </BrowserRouter>
      </AppContext.Provider>
      
    </>
  );
}

export default App;
