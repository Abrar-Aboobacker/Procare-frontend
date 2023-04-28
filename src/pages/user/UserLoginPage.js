import React from 'react'
import Navbar from '../../Components/user/Home/Navbar'
import UserLogin from '../../Components/login/UserLogin'
import Footer from '../../Components/user/Home/Footer'

const UserLoginPage = () => {
  return (
    <div>
      <Navbar/>
      <UserLogin/>
      <Footer/>
    </div>
  )
}

export default UserLoginPage
