import React from 'react'
import Navbar from '../../Components/user/Home/Navbar'
import DoctorBanner from '../../Components/user/Doctors/DoctorBanner'
import Filter from '../../Components/user/Doctors/Filter'
import DoctorView from '../../Components/user/Doctors/DoctorView'
import Footer from '../../Components/user/Home/Footer'

const DoctorsList = () => {
  return (
    <>
      <Navbar/>
      <DoctorBanner/>
      {/* <Filter/> */}
      <DoctorView/>
      <Footer/>
    </>
  )
}

export default DoctorsList
