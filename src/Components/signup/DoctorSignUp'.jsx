import React from 'react'
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";

const DoctorSignUp = () => {
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
          marginTop: 0,
          padding: 3,
          height:"80vh",
          borderRadius: 5,
          boxShadow: "5px 5px 10px #ccc ",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc ",
          },
        }}
      >
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
              label="Full Name"
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
              focused
              margin="normal"
              type={"file"}
              label="upload your Certificate"
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
          <Grid item sm={12}>
            <TextField
              fullWidth
              multiline
               maxRows={5}
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"text"}
              label="Write About Your Self"
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

export default DoctorSignUp
