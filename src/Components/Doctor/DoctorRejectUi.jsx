import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DoctorRejectUi = () => {
    const {doctor}=useSelector((state)=>state.doctor)
    console.log(doctor);
  return (
    <div>
      <Box sx={{display:'flex',backgroundColor:"#E9FBFF",height:"100vh"}}>
      <Box
        sx={{
          backgroundColor:"#F5FCFD",
          display: "flex",
          flexDirection: "column",

          maxWidth: 450,
          height:200,
          alignItems: "center",
          justifyContent: "space-between",
          margin: "auto",
          marginTop: 25,
          padding: 3,
          borderRadius:2,
          boxShadow:"5px 5px 10px #ccc ",
        }}
      >
        <Typography variant="h5">
            Your application for doctor appointment is rejected becuase: {doctor?.rejectReason}
        </Typography>
        <Box sx={{marginRight:'auto'}}>
        <Button><Link to={'/doctor_moreinfo'}>Edit your details</Link> </Button>
        </Box>
      </Box>
    </Box>
    </div>
  )
}

export default DoctorRejectUi
