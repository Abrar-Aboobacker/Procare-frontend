import React from 'react'
import { Navigate,} from 'react-router-dom'
const DoctorProtectedRoutes = (props) => {



 if(localStorage.getItem('token')){
    return props.children
 }else{
    return <Navigate to ='/doctor_login'/>
 }
}

export default DoctorProtectedRoutes
