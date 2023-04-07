import React from 'react'
import { Navigate } from 'react-router-dom'

const DoctorWaitingProtectedRoutes = (props) => {
    if(localStorage.getItem('doctorwaitingtoken')){
        return props.children
     }else{
        return <Navigate to ='/doctor_signup'/>
     }
}

export default DoctorWaitingProtectedRoutes
