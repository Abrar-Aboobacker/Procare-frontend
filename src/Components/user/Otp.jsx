import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { otpSchema } from '../../validation/otpValidation'
import axios from '../../axios/axios'
import { useDispatch } from 'react-redux'
import { hideLoading } from '../../redux/alertsSlice'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Otp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            otpis:''
        },
        validationSchema:otpSchema,
         onSubmit:async (values,helpers)=>{
        try {
          const response = await axios.post("/postOtp",{
            values
          })
          dispatch(hideLoading())
          if (response.data.success) {
            toast.success(response.data.message)
            navigate('/user_login')
    
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
          backgroundColor:"#F5FCFF",
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          padding: 3,
          marginTop:15,
          borderRadius:5,
          boxShadow:"5px 5px 10px #ccc ",
          ":hover":{
              boxShadow:"10px 10px 20px #ccc ",
          }
        }}
      >
        <Typography variant="h5" padding={3} textAlign="center">Please Enter your otp here</Typography>
        <TextField size='small' name='otpis' value={formik.values.otpis} error={formik.errors.otpis} helperText={formik.errors.otpis} onChange={formik.handleChange} fullWidth sx={{backgroundColor:"white"}} margin="normal" type={"text"} label="Otp" variant="outlined" />
        <Button name="submit" type='submit'  variant="contained" color="warning" sx={{ marginTop:3, borderRadius:3}}>Verify</Button>
      </Box>
    </form>
  </div>
  )
}

export default Otp
