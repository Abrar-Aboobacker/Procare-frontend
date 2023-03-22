import React from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";
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
          marginTop: 0,
          padding: 3,
          height:"70vh",
          borderRadius:5,
          boxShadow:"5px 5px 10px #ccc ",
          ":hover":{
              boxShadow:"10px 10px 20px #ccc ",
          }
        }}
      >
        <Typography variant="h4" padding={3} textAlign="center"> Login</Typography>
        <Typography variant="h6" padding={3} textAlign="center"> Welcome Back</Typography>
        <TextField sx={{backgroundColor:"white"}} margin="normal" type={"email"} label="Email" variant="outlined" />
        <TextField sx={{backgroundColor:"white"}} margin="normal" type={"password"}  label="Password" variant="outlined" />
        <Button  variant="contained" color="warning" sx={{ marginTop:3, borderRadius:3}}>Login</Button>
      </Box>
    </form>
  </div>
  )
}

export default UserLogin
