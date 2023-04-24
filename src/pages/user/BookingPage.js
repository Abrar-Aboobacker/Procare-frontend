import React from 'react'
import Navbar from '../../Components/user/Home/Navbar'
import Footer from '../../Components/user/Home/Footer'
import BookingView from '../../Components/user/BookingPage/BookingView'
import { useParams } from 'react-router-dom'

const BookingPage = () => {
    const {id}=useParams()
  return (
    <>
     <Navbar/>
     <BookingView id={id}/>
     <Footer/>
    </>
  )
}

export default BookingPage
