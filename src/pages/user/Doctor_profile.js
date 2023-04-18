import React from 'react'
import Navbar from '../../Components/user/Home/Navbar'
import Footer from '../../Components/user/Home/Footer'
import DoctorProfilePage from '../../Components/user/DoctorProfile/DoctorProfilePage'
import { useParams } from 'react-router-dom'

const Doctor_profile = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
     <Navbar/> 
     <DoctorProfilePage id={id}/>
     <Footer/>
    </>
  )
}

export default Doctor_profile
