import { Avatar, Box, Button, Card, CardContent, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../../constants/constant';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import { toast } from 'react-hot-toast';
import { hideLoading, showLoading } from '../../../redux/alertsSlice';
import axios from '../../../axios/axios'
import moment from 'moment';
const UserAppointment = () => {
    const [Appointments, setAppointments] = useState([]);
    
    const dispatch = useDispatch()
    const [image, setImage] = useState();
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
      dispatch(showLoading())
      axios
        .get(`/getPendingAppointments`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            },
        })
        .then((response) => {
          if (response.data.success) {
          dispatch(hideLoading())
            setAppointments(response.data.pendingAppointments);
          } else {
            toast.error(response.data.message);
          }
        });
    }, [refresh]);
    const cancelAppointment = (id) => {
      axios
        .post(
          "/cancelAppointment",
          { id },
          {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("usertoken"),
              },
            }
        )
        .then((response) => {
          if (response.data.success) {
          //   dispatch(
          //     setLogin({
          //       client:"client",
          //     count:response.data.count
               
          //     })
          //   );
            toast.success(response.data.message);
            setRefresh(!refresh);
          } else {
            toast.error(response.data.message);
          }
        });
    };
  return (
    <>
    <Navbar/>
    <Box>
        <Box sx={{ display: { xs: "block", sm: "flex" } }}>
          <Box sx={{ mt: 5, ml: 3 ,mb:2}}>
            <Profile/>
          </Box>
          <Box sx={{width:'70%',ml:2,mt:5}}>
      <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
           New Appointments
          </Typography>
          <Box sx={{display:'flex',justifyContent:'end'}}>
            <Link to={"/user/AppointmentHistory"}>
            <Typography sx={{mb:2,backgroundColor:'#516dc9',color:'white',borderRadius:10,pt:1,pb:1,pl:2,pr:2}}>
              History
            </Typography>
            </Link>
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                {Appointments && Appointments.length > 0 ? (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>Doctor Name</TableCell>
                        <TableCell>Appointment Date</TableCell>
                        <TableCell>Appointment Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell sx={{textAlign:'center'}}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                       {Appointments.map((value) => ( 
                        <TableRow >
                          <TableCell>{value.doctor.name}</TableCell>
                          <TableCell>{moment(value.date).format("DD-MM-YYYY")}</TableCell>
                          <TableCell>{value.time}</TableCell>
                          <TableCell>{value.status}</TableCell>
                          <TableCell>
                            <Box sx={{display:'flex'}}>
                                
                                 
                                    <Button
                                    variant="contained"
                                    color="warning"
                                    sx={{ marginRight: 2 }}
                                    onClick={() => cancelAppointment(value._id)}
                                  >
                                    cancel
                                  </Button>
                                                 
                            </Box>
                          </TableCell>
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
                    <Link to="/user/AppointmentHistory">
                    <Typography sx={{mt:3,paddingY:1,paddingX:3, color:"white",backgroundColor:'#a5aacc'}}>History</Typography>
                    </Link>
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

export default UserAppointment
