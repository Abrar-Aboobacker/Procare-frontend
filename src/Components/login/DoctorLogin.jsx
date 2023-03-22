import React, {  useState } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link,  useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import { toast } from 'react-hot-toast';
const DoctorLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async (e)=>{
    e.preventDefault();
    console.log("hy");
    try {
      const response = await axios.post("/doctor/doctor_signin",{
        email:email,
        password:password
      })
      console.log(e);
      if(response.data.success){
        console.log(response.data.data+"ddddddd");
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.data)
        navigate('/')
      }else{
        console.log("heree");
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("something went wrong" )
    }
  }
 
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
        <TextField sx={{backgroundColor:"white"}} margin="normal" value={email} onChange={(e)=>setEmail(e.target.value)}  type={"email"} label="Email" variant="outlined" />
        <TextField sx={{backgroundColor:"white"}} margin="normal" value={password} onChange={(e)=>setPassword(e.target.value)}  type={"password"}  label="Password" variant="outlined" />
        <Button onClick={handleLogin} variant="contained" color="warning" sx={{ marginTop:3, borderRadius:3}}>Login</Button>
       <Link className='Link' to={"/signup"}>Ckick to signup</Link>
      </Box>
      
    </form>
  </div>
  )
}

export default DoctorLogin
