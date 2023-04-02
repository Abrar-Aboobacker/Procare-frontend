import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const AdminProtectedRoutes = (props) => {
    if(localStorage.getItem('admintoken')){
        return props.children
    }else{
        return <Navigate to ='/admin_login' />
    }
}

export default AdminProtectedRoutes
