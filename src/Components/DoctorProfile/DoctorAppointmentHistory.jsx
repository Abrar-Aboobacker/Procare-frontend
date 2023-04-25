import { Avatar, Box, Button, Card, CardContent, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { baseURL } from '../../constants/constant'
import { TabContext, TabList } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { setDoctor } from '../../redux/DoctorSlice'
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import moment from 'moment'
import axios from '../../axios/axios'
import { Link } from 'react-router-dom'
import DoctorNavbar from '../DoctorNav/DoctorNavbar'
import Footer from '../user/Home/Footer'
const DoctorAppointmentHistory = () => {
    
    const { doctor } = useSelector((state) => state.doctor);
    const dispatch = useDispatch();
    const [value, setValue] = React.useState("1");
    const [image, setImage] = useState();
    const [Appointments, setAppointments] = useState([]);
    const getHistory =async ()=>{
        try {
            const response = await axios.get("doctor/getAppointmentHistory",{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
        // validate file
        if (!allowedExtensions.exec(selectedFile.name)) {
          toast.error("Please upload a PNG, JPG, or JPEG image.");
          setImage("");
          return;
        } else if (selectedFile.size > 1 * 1024 * 1024) {
          toast.error("Please upload a file smaller than 1MB.");
          setImage("");
          return;
        } else {
          setImage(selectedFile);
        }
      };
      const handlePicUpload = async (e) => {
        e.preventDefault();
        try {
          dispatch(showLoading());
          const response = await axios.post(
            "/doctor/doctorProfilePicUpload",
            { profile: image },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setDoctor(response.data.data));
          } else {
            console.log("hereee");
            toast.error(response.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          toast.error("something went wrong");
        }
      };
  return (
    <>
      <Box>
        <DoctorNavbar/>
      <Box sx={{ display: { xs: "block", sm: "flex" } }}>
      <Box sx={{ mt: 5, ml: 3,mb:3 }}>
      <Card
              elevation={2}
              sx={{
                maxWidth: 400,
                width: 400,
                backgroundColor: "#eff2f7",
                pt: 5,
              }}
            >
              <label htmlFor="fileInput">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{ height: 200, width: 200, objectFit: "unset" }}
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `${baseURL}${doctor.profile}
                    `
                    }
                  />
                </Box>
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <Button
                    onClick={handlePicUpload}
                    variant="contained"
                    color="warning"
                    sx={{ marginBottom: 2 }}
                  >
                    Update Profile
                    {/* <CameraAlt sx={{ marginLeft: 2, color: "white" }} />{" "} */}
                  </Button>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    textAlign={"center"}
                  >
                    {doctor?.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      typography: "body1",
                      justifyContent: "center",
                    }}
                  >
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Box display={'flex'} justifyContent={'center'}>
                            <Link to={'/doctor_profile'}>
                          <Typography sx={{mt:5,fontSize:20,color:'black'}}>
                            EDIT PROFILE
                          </Typography>
                          </Link>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'}>
                            <Link to={'/doctor_profile'}>
                          <Typography sx={{mt:5,fontSize:20,color:'black'}}>
                            SCHEDULE
                          </Typography>
                          </Link>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'}>
                            <Link to={'/doctor_profile'}>
                          <Typography sx={{mt:5,fontSize:20,color:'black'}}>
                            APPOINTMENTS
                          </Typography>
                          </Link>
                        </Box>
                      </Box>
                    </TabContext>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            </Box>
            <Box sx={{width:'68%',ml:5,mt:5}}>
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
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Appointment Date</TableCell>
                        <TableCell>Appointment Time</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                       {Appointments.map((value) => ( 
                        <TableRow >
                          <TableCell>{value?.client?.fName}</TableCell>
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
      <Footer/>
      </Box>
    </>
  )
}

export default DoctorAppointmentHistory
