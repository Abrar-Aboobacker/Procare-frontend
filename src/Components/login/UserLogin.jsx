import React from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
const UserLogin = () => {

 
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
          padding: 3,
          marginTop:10,
          borderRadius:5,
          boxShadow:"5px 5px 10px #ccc ",
          ":hover":{
              boxShadow:"10px 10px 20px #ccc ",
          }
        }}
      >
         <Box mt={2}  >
         <Box display={'flex'} justifyContent={'center'} alignContent={'center'} >
         <Typography mr={5} variant='h6' sx={{backgroundColor:"#30349B",paddingTop:2,paddingBottom:2,paddingRight:1,paddingLeft:1,color:"white",borderRadius:"12px"}}>
         User Login
          </Typography>
          <Typography ml={5} variant='h6' sx={{paddingTop:2,paddingBottom:2,paddingRight:1,paddingLeft:1}} >
          <Link to={"/doctor_login"}>Doctor Login </Link> 
          </Typography>
         
         </Box>
        </Box>
        <Typography variant="h4" padding={3} textAlign="center"> Login</Typography>
        <Typography variant="h6" padding={3} textAlign="center"> Welcome Back</Typography>
        <TextField size='small' fullWidth sx={{backgroundColor:"white"}} margin="normal" type={"email"} label="Email" variant="outlined" />
        <TextField size='small' fullWidth sx={{backgroundColor:"white"}} margin="normal" type={"password"}  label="Password" variant="outlined" />
        <Button  variant="contained" color="warning" sx={{ marginTop:3, borderRadius:3}}>Login</Button>
        <Typography mt={2}>Are you new user?<Link to={"/user_signup"}>click Here </Link></Typography>
      </Box>
    </form>
  </div>
  )
}

export default UserLogin
