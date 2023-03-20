import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import axios from 'axios';
const DoctorLogin = () => {
  const userRef = useRef()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(()=>{
    userRef.current.focus();
  },[])
  useEffect(()=>{
    axios.post('')
  },[email,password])
  return (
    <div>
    <form action="">
      <Box
        sx={{
          backgroundColor:"#F5FCFF",
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: 0,
          padding: 3,
          borderRadius:5,
          height:"70vh",
          boxShadow:"5px 5px 10px #ccc ",
          ":hover":{
              boxShadow:"10px 10px 20px #ccc ",
          }
        }}
      >
        <Typography variant="h4" padding={3} textAlign="center">Login</Typography>
        <Typography variant="h6" padding={3} textAlign="center">Welcome Back Doctor</Typography>
        <TextField sx={{backgroundColor:"white"}} margin="normal" value={email}  type={"email"} label="Email" variant="outlined" />
        <TextField sx={{backgroundColor:"white"}} margin="normal" value={password}  type={"password"}  label="Password" variant="outlined" />
        <Button variant="contained" color="warning" sx={{ marginTop:3, borderRadius:3}}>Login</Button>
       <Link className='Link' to={"/signup"}>Ckick to signup</Link>
      </Box>
      
    </form>
  </div>
  )
}

export default DoctorLogin
