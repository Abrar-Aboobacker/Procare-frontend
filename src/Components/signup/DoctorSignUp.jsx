import React from 'react'
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
import { toast } from 'react-hot-toast';
import axios from '../../axios/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { useFormik } from 'formik';
import { DoctorSchema } from '../../validation/doctorsignupvalidation';
import { setDoctor } from '../../redux/DoctorSlice';

const DoctorSignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      cpassword:'',
      about: '',
    },
    validationSchema:DoctorSchema,
     onSubmit:async (values,helpers)=>{
    try {
      dispatch(showLoading())
      const response = await axios.post("/doctor/doctor_signup",{
        values
      })
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        // localStorage.setItem("doctorwaitingtoken", response.data.data)
        dispatch(setDoctor(values))
        navigate('/doctor_otp')

      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      helpers.setErrors({submit:error.message})
      toast.error("something went wrong")
     }
   }
  })
  return (
    <div>
    <form onSubmit={formik.handleSubmit}>
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
          <Typography mr={5} variant='h6' sx={{paddingTop:2,paddingBottom:2,paddingRight:1,paddingLeft:1}} >
           <Link to={"/user_signup"}>User signup</Link> 
          </Typography>
          <Typography ml={5} variant='h6' sx={{backgroundColor:"#30349B",paddingTop:2,paddingBottom:2,paddingRight:1,paddingLeft:1,color:"white",borderRadius:"12px",marginBottom:3}}>
            Doctor signup
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
              name="name"
              size="small"
              value={formik.values.name}
                error={formik.errors.name}
                helperText={formik.errors.name}
                onChange={formik.handleChange}
              label="Full Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              name='email'
              type={"email"}
              size="small"
              value={formik.values.email}
              error={formik.errors.email}
              helperText={formik.errors.email}
              onChange={formik.handleChange}
              label="email"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              name='phone'
              size="small"
              value={formik.values.phone}
              error={formik.errors.phone}
              helperText={formik.errors.phone}
              onChange={formik.handleChange}
              type={"tel"}
              label="Phone No"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              value={formik.values.password}
              error={formik.errors.password}
              helperText={formik.errors.password}
              onChange={formik.handleChange}
              type={"password"}
              name="password"
              size="small"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"password"}
              name='cpassword'
              size="small"
              value={formik.values.cpassword}
              error={formik.errors.cpassword}
              helperText={formik.errors.cpassword}
              onChange={formik.handleChange}
              label="Confirm Password"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              multiline
               maxRows={5}
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"text"}
              name='about'
              value={formik.values.about}
              error={formik.errors.about}
              helperText={formik.errors.about}
              onChange={formik.handleChange}
              label="Write About Your Self"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          name='submit'
          type='submit'
          color="warning"
          sx={{ marginTop: 3, borderRadius: 3 }}>
          SignUp
        </Button>
      </Box>
    </form>
  </div>
  )
}

export default DoctorSignUp