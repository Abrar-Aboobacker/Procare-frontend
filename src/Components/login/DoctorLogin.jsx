import React, {  useState } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link,  useNavigate } from 'react-router-dom';
import axios from '../../axios/axios';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { setDoctor } from '../../redux/DoctorSlice';
const DoctorLogin = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      dispatch(showLoading())
      const response = await axios.post("/doctor/doctor_signin",{
        email:email,
        password:password
      })
      dispatch(hideLoading())
      if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.data)
        dispatch(setDoctor(response.data.doctorz))
      }else{
        console.log("heree");
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("something went wrong" )
    }
  }
 
  return (
    <div>
    <form action="">
      <Box>
        
       
      <Box
        sx={{
          backgroundColor:"#F5FCFF",
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop:10,
          padding: 3,
          borderRadius:5,
          boxShadow:"5px 5px 10px #ccc ",
          ":hover":{
              boxShadow:"10px 10px 20px #ccc ",
          }
        }}
      >
         <Box mt={2}  >
         <Box display={'flex'} justifyContent={'center'} alignContent={'center'} >
          <Typography mr={5} variant='h6' sx={{paddingTop:2,paddingBottom:2,paddingRight:1,paddingLeft:1}} >
           <Link to={"/user_login"}>User Login</Link> 
          </Typography>
          <Typography ml={5} variant='h6' sx={{backgroundColor:"#30349B",paddingTop:2,paddingBottom:2,paddingRight:1,paddingLeft:1,color:"white",borderRadius:"12px"}}>
            Doctor Login
          </Typography>
         </Box>
        </Box>
        <Typography variant="h4" padding={3} textAlign="center">Login</Typography>
        <Typography variant="h6" padding={3} textAlign="center">Welcome Back Doctor</Typography>
        <TextField size='small' fullWidth sx={{backgroundColor:"white"}} margin="normal" value={email} onChange={(e)=>setEmail(e.target.value)}  type={"email"} label="Email" variant="outlined" />
        <TextField size='small' fullWidth sx={{backgroundColor:"white"}} margin="normal" value={password} onChange={(e)=>setPassword(e.target.value)}  type={"password"}  label="Password" variant="outlined" />
        <Button onClick={handleLogin} variant="contained" color="warning" sx={{ marginTop:3, borderRadius:3}}>Login</Button>
      <Typography mt={2}>Don't you have an account <Link  to={"/doctor_signup"}>Click here</Link> </Typography> 
      </Box>
      </Box>
    </form>
  </div>
  )
}

export default DoctorLogin
