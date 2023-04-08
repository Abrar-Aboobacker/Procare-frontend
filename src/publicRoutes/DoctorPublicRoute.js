import React from 'react'
import { Navigate } from 'react-router-dom'

const DoctorPublicRoute = (props) => {
    if(localStorage.getItem('token')){
        return <Navigate to ='/doctor_profile' />
       
    }else{
        return props.children
    }
}

export default DoctorPublicRoute
