import React from 'react'
import { Navigate } from 'react-router-dom'

const DoctorWaitingPublicRoutes = (props) => {
    if(localStorage.getItem('doctorwaitingtoken')){
        return <Navigate to ='/doctor_moreinfo' />
       
    }else{
        return props.children
    }
}

export default DoctorWaitingPublicRoutes
