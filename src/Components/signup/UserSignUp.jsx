import React from 'react'
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
  
  } from "@mui/material";
import { Link } from 'react-router-dom';
const UserSignUp = () => {
  return (
    <div>
      <form action="">
        <Box
          sx={{
            backgroundColor: "#F5FCFF",
            display: "flex",
            flexDirection: "column",
            maxWidth: 500,
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginTop: 10,
            padding: 3,
            borderRadius: 5,
            boxShadow: "5px 5px 10px #ccc ",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >
          <Box mt={2}  >
         <Box display={'flex'} justifyContent={'center'} alignContent={'center'} >
         <Typography mr={5} variant='h6' sx={{backgroundColor:"#30349B",paddingTop:2,paddingBottom:2,paddingRight:1,paddingLeft:1,color:"white",borderRadius:"12px" ,marginBottom:3}}>
         User Signup
          </Typography>
          <Typography ml={5} variant='h6' sx={{paddingTop:2,paddingBottom:2,paddingRight:1,paddingLeft:1}} >
          <Link to={"/doctor_signup"}>Doctor Signup </Link> 
          </Typography>
         
         </Box>
        </Box>
          <Typography variant="h4" padding={3} textAlign="center">
            Signup
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Fisrt Name"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"email"}
                label="email"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"tel"}
                label="Phone No"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"password"}
                label="Password"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"password"}
                label="Confirm Password"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="warning"
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            SignUp
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default UserSignUp
