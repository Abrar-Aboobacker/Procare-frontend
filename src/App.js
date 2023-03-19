import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginChangeContainer from "./container/LoginChangeContainer";
import SighnUpChangeContainer from "./container/SighnUpChangeContainer";
import AdminLogin from "./Components/login/AdminLogin";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginChangeContainer/>}/>
        <Route path="/signup" element={<SighnUpChangeContainer/>}/>
        <Route path="/admin_login" element={<AdminLogin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
