import React from 'react'
import { Box, Button, TextField, Typography } from "@mui/material";


const AdminLogin = () => {
  return (
    <div>
    <form action="">
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
        <TextField fullWidth sx={{backgroundColor:"white"}} margin="normal" type={"email"} label="Email" variant="outlined" />
        <TextField fullWidth sx={{backgroundColor:"white"}} margin="normal" type={"password"}  label="Password" variant="outlined" />
        <Button variant="contained"   sx={{ color:"#FF90AB",backgroundColor:"white",":hover":{backgroundColor:"#FF90AB",color:"white"}, marginTop:3, borderRadius:3}}>Login</Button>
      </Box>
    </form>
  </div>
  )
}

export default AdminLogin

