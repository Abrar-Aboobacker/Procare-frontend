import React from 'react'
import Navbar from '../../Components/user/Home/Navbar'
import Footer from '../../Components/user/Home/Footer'
import Profile from '../../Components/user/UserProfile/Profile'
import ProfileSidebar from '../../Components/user/UserProfile/ProfileSidebar'
import { Box, Stack } from '@mui/material'

const UserProfilePage = () => {
  return (
    <>
    <Box display={'flex'} justifyContent={'flex-start'}>
    <ProfileSidebar/>
    <Profile/>
    </Box>
    </>
  )
}

export default UserProfilePage
