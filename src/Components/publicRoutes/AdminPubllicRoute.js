import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminPubllicRoute = (props) => {
    if(localStorage.getItem('token')){
        return <Navigate to ='/admin_dashboard' />
       
    }else{
        return props.children
    }
}

export default AdminPubllicRoute
