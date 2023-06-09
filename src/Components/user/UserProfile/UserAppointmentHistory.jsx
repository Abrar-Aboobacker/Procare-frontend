import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Profile from './Profile'
import moment from 'moment'
import Footer from '../Home/Footer'
import axios from '../../../axios/axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const UserAppointmentHistory = () => {
    const [Appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('usertoken')){
        navigate('/user_login')
        toast.error("You need to login first")
      }
    })
    const getHistory =async ()=>{
        try {
            const response = await axios.get("/getAppointmentHistory",{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
                }
            })
            if(response.data.success){
                setAppointments(response.data.appointmentHistory)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getHistory()
    },[])
  return (
    <>
    <Navbar/>
    <Box>
        <Box sx={{ display: { xs: "block",sm: "block",md:'flex' } }}>
          <Box sx={{ my:{xs:5,sm:5,md:21,lg:5}, ml: 3 ,mb:2}}>
            <Profile/>
          </Box>
          <Box sx={{width:{xs:'92%',sm:"92%",md:"50%",lg:"65%"},ml:{xs:2,sm:3},my:{xs:5,sm:5,md:20,lg:5} ,mb:2}}>
          <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
            Appointment History
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 540 }}>
              <Table stickyHeader aria-label="sticky table">
                {Appointments && Appointments.length > 0 ? ( 
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>Doctor Name</TableCell>
                        <TableCell>Appointment Date</TableCell>
                        <TableCell>Appointment Time</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                       {Appointments.map((value) => ( 
                        <TableRow >
                          <TableCell>{value?.doctor?.name}</TableCell>
                           <TableCell>{moment(value.date).format("DD-MM-YYYY")}</TableCell> 
                          <TableCell>{value?.time}</TableCell>
                          <TableCell>{value?.status}</TableCell>
                        </TableRow>
                        ))}  
                    </TableBody>
                  </>
                  ) : (  
                    <Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography fontWeight={400} variant="h6" textAlign={'center'}>
                      Currently there is no new appointment check your history
                    </Typography>
                  </Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    {/* <Link to="/Doctor/AppointmentHistory">
                    <Typography sx={{mt:3,paddingY:1,paddingX:3, color:"white",backgroundColor:'#a5aacc'}}>History</Typography>
                    </Link> */}
                  </Box>
                  </Box>
                 )} 
              </Table>
            </TableContainer>
          </Paper>
      </Box>
        </Box>
      </Box> 
      <Footer/>
    </>
  )
}

export default UserAppointmentHistory
