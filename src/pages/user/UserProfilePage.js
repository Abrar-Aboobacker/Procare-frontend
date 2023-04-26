import React, { useEffect } from 'react'
import Navbar from '../../Components/user/Home/Navbar'
import Footer from '../../Components/user/Home/Footer'
import ProfilePage from '../../Components/user/UserProfile/ProfilePage'
import axios from '../../axios/axios'
import { useNavigate } from 'react-router-dom'
const UserProfilePage = () => {
 const  navigate = useNavigate()
  const getUserInfo =async ()=>{
    try {
        const response = await axios.get("/userInfo",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            }
        })
        if(!response.data.success){
            // setAppointments(response.data.appointmentHistory)
            // navigate('/user_login')
        }else{
          
        }
    } catch (error) {
        console.log(error)
        navigate('/user_login')
    }
}
useEffect(()=>{
  getUserInfo()
},[])
  return (
    <>
    <Navbar/>
    <ProfilePage/>
    <Footer/>
    </>
  )
}

export default UserProfilePage
