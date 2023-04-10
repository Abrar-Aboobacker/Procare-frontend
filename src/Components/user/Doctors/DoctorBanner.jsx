import { Box, Typography } from '@mui/material'
import React from 'react'
import bannerImg from '../../../Assets/banner.png'
const DoctorBanner = () => {
  return (
    <>
     <Box sx={{backgroundImage: `url(${bannerImg})`,height:270,backgroundSize:'cover',display:'flex',backgroundPosition:{xs:'68%',sm:'65%',md:'50%'},position:'relative'}}>
        <Box sx={{marginRight:{xs:0,sm:45,md:50,lg:85},marginTop:{xs:24,sm:11,md:8}}}>
        <Typography variant='h5' sx={{marginTop:{xs:10,sm:3},marginLeft:{xs:2,sm:5},fontSize:{xs:20,sm:30},fontWeight:{xs:0,sm:400,md:600}}}>
        We have the best professionals - licensed and verified, Check who can help you heal!
        </Typography>
        </Box>
    </Box> 
    </>
  )
}

export default DoctorBanner
