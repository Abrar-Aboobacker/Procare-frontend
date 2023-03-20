import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginChangeContainer from "./container/LoginChangeContainer";
import SighnUpChangeContainer from "./container/SighnUpChangeContainer";
import AdminLogin from "./Components/login/AdminLogin";
import Dashboard from "./Components/admin/pages/Dashboard";
import Doctors from "./Components/admin/pages/Doctors";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Routes>
        <Route path="/login" element={<LoginChangeContainer/>}/>
        <Route path="/signup" element={<SighnUpChangeContainer/>}/>
        <Route path="/admin_login" element={<AdminLogin/>}/>
        <Route path="/admin_dashboard" element={<Dashboard/>}/>
        <Route path="/admin_doctors" element={<Doctors/>}/>

      </Routes>
      </BrowserRouter>
    
    </>
  );
}

export default App;
