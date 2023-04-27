import React from 'react'
import DoctorNavbar from '../../Components/DoctorNav/DoctorNavbar'
import Footer from '../../Components/user/Home/Footer'
import DoctorNotificationView from '../../Components/Doctor/DoctorNotificationView'

const DoctorNotificationPage = () => {
  return (
    <>
      <DoctorNavbar/>
      <DoctorNotificationView/>
      <Footer/>
    </>
  )
}

export default DoctorNotificationPage
