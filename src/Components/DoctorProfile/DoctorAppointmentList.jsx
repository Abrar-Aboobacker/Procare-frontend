import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import axios from '../../axios/axios'
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { Link } from 'react-router-dom';
import { hover } from '@testing-library/user-event/dist/hover';
const DoctorAppointmentList = () => {
    const dispatch = useDispatch();
    const [Appointments, setAppointments] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        dispatch(showLoading())
        axios
          .get(`/doctor/getAppointments`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
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

      const approveAppointment = (id) => {
        axios
          .post(
            "/doctor/approveAppointment",
            { id },
            {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
          )
          .then((response) => {
            if (response.data.success) {
              toast.success(response.data.message);
              setRefresh(!refresh);
            } else {
              toast.error(response.data.message);
            }
          });
      };
      const cancelAppointment = (id) => {
        axios
          .post(
            "/doctor/cancelAppointment",
            { id },
            {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
          )
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.count,"countttttt");
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
      const completedAppointment = (id) => {
        axios
          .post(
            "/doctor/completedAppointment",
            { id },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((response) => {
            if (response.data.success) {
              toast.success(response.data.message);
              setRefresh(!refresh);
            } else {
              toast.error(response.data.message);
            }
          });
      };
    
  return (
    <>
      <Box sx={{width: {xs:"92vw",sm:"96%",md:"45vw",lg:"60vw",xl:"65vw"}, mb:3,my:{xs:5,sm:5,md:28,lg:5}}}>
      <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
           New Appointments
          </Typography>
          <Box sx={{display:'flex',justifyContent:'end'}}>
            <Link to={"/Doctor/AppointmentHistory"}>
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
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Appointment Date</TableCell>
                        <TableCell>Appointment Time</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell sx={{textAlign:'center'}}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Appointments.map((value) => (
                        <TableRow >
                          <TableCell>{value.client.fName}</TableCell>
                          <TableCell>{moment(value.date).format("DD-MM-YYYY")}</TableCell>
                          <TableCell>{value.time}</TableCell>
                          <TableCell>{value.status}</TableCell>
                          <TableCell>
                            <Box sx={{display:'flex'}}>
                                {value.status=== 'active'?(
                                    <Button   variant="contained"
                                    
                                    sx={{ marginRight: 2,backgroundColor:"#c3c5c7",":hover":{color:'black',backgroundColor:"#c3c5c7"} }}
                                    onClick={() => completedAppointment(value._id)}>
                                        Completed
                                    </Button>
                                ):(<>
                                    <Button
                                    variant="contained"
                                    color="success"
                                    sx={{ marginRight: 2 }}
                                    onClick={() => approveAppointment(value._id)}
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                  variant="contained"
                                  color="error"
                                  sx={{ marginRight: 2 }}
                                  onClick={() => cancelAppointment(value._id)}   
                                >
                                  Reject
                                </Button>
                                </>
                                )}
                                                       
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
                    <Link to="/Doctor/AppointmentHistory">
                    <Typography sx={{mt:3,paddingY:1,paddingX:3, color:"white",backgroundColor:'#a5aacc'}}>History</Typography>
                    </Link>
                  </Box>
                  </Box>
                )} 
              </Table>
            </TableContainer>
          </Paper>
      </Box>
    </>
  )
}

export default DoctorAppointmentList
