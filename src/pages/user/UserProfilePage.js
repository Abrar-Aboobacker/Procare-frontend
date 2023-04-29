import React, { useEffect } from 'react'
import Navbar from '../../Components/user/Home/Navbar'
import Footer from '../../Components/user/Home/Footer'
import ProfilePage from '../../Components/user/UserProfile/ProfilePage'
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const UserProfilePage = () => {
 const  navigate = useNavigate()

useEffect(()=>{
  if(!localStorage.getItem('usertoken')){
    navigate('/user_login');
    toast.error("Please Login")
  }
},[navigate])
  return (
    <>
    <Navbar/>
    <ProfilePage/>
    <Footer/>
    </>
  )
}

export default UserProfilePage
