import React, {  useState } from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from '../../axios/axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
 

  const handleLogin = async (e)=>{
    e.preventDefault();
    console.log("hy");
    try {
      const response = await axios.post("/admin/admin_login",{
        email:email,
        password:password
      })
      console.log(e);
      if(response.data.success){
        console.log(response.data.data+"ddddddd");
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.data)
        navigate('/admin_dashboard')
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
    <form    >
      <Box
        sx={{
          backgroundColor:"#ffecf0",
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: 10,
          padding: 3,
          borderRadius:5,
          height:"70vh",
          boxShadow:"5px 5px 10px #ccc ",
          ":hover":{
              boxShadow:"10px 10px 20px #ccc ",
          }
        }}
      >
        <Typography variant="h4" padding={3} textAlign="center">Admin Login</Typography>    
        <TextField value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth sx={{backgroundColor:"white"}} margin="normal" type={"email"} label="Email" variant="outlined" />
        <TextField value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth sx={{backgroundColor:"white"}} margin="normal" type={"password"}  label="Password" variant="outlined" />
        <Button onClick={handleLogin}  variant="contained"   sx={{ color:"#FF90AB",backgroundColor:"white",":hover":{backgroundColor:"#FF90AB",color:"white"}, marginTop:3, borderRadius:3}}>Login</Button>
      </Box>
    </form>
  </div>
  )
}

export default AdminLogin

