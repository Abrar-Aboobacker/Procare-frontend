import React from 'react'
import DoctorNavbar from '../../Components/DoctorNav/DoctorNavbar'

import DoctorProfileView from './DoctorProfileView'
import Footer from '../../Components/user/Home/Footer'

const DoctorProfile2 = () => {
  return (
    <>
      <DoctorNavbar/>
      {/* <DoctorShedule/> */}
      <DoctorProfileView/>
      <Footer/>
    </>
  )
}

export default DoctorProfile2
