import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../../axios/axios'
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setDoctor } from "../../redux/DoctorSlice";
import DoctorNavbar from "../DoctorNav/DoctorNavbar";
import Footer from "../user/Home/Footer";
const DoctorWaitingPage = () => {
    const [ setIsActive] = useState(false);
    const [setReject] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(()=>{
        const checkDoctorStatus =async ()=>{
          try {
          const response = await axios.get("/doctor/doctorStatus",{
            headers:{
              Authorization: `Bearer ${localStorage.getItem("doctorwaitingtoken")}`,
              
          }
          })
            if(response.data.message ==='doctor is acitve'){
              setIsActive(true)
              localStorage.removeItem('doctorwaitingtoken');
              toast.success('Your account approved please login now.')
              navigate('/doctor_login')
            }else if(response.data.message ==="doctor request is rejected"){
              setReject(true)
              dispatch(setDoctor(response.data.doctorStatus))
              navigate('/doctor_reject')
            }
          } catch (error) {
            console.log(error);
            toast.error("something went wrong")
          }
        }
        checkDoctorStatus()
      },)
  return (
    <>
    <DoctorNavbar/>
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
        Please wait for the confimation.It will complete as soon as possible
        </Typography>
        <Box sx={{marginRight:'auto'}}>
        <Button><Link to={'/doctor_moreinfo'}>Edit your details</Link> </Button>
        </Box>
      </Box>
    </Box>
    <Footer/>
    </>
  );
};

export default DoctorWaitingPage;
