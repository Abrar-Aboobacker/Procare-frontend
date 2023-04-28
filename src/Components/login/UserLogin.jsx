import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import axios from '../../axios/axios';
import { userLoginSchema } from "../../validation/userLoginValidation";
import { hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/UserSlice";
const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserInfo =async ()=>{
    try {
        const response = await axios.get("/userInfo",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
            }
        })
        if(response.data.success){
            // setAppointments(response.data.appointmentHistory)
           navigate('/') 
        }
    } catch (error) {
        console.log(error)
    }
}
useEffect(()=>{
  getUserInfo()
},[])
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await axios.post("/userLogin", {
          values,
        });
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("usertoken", response.data.data)
        dispatch(setUser(response.data.userz))
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        helpers.setErrors({ submit: error.message });
        toast.error("something went wrong");
      }
    },
  });
  return (
    <div>
      <form action="" onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            backgroundColor: "#F5FCFF",
            display: "flex",
            flexDirection: "column",
            maxWidth: 500,
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            padding: 3,
            marginTop: 10,
            mb:10,
            borderRadius: 5,
            boxShadow: "5px 5px 10px #ccc ",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >
          <Box mt={2}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Typography
                mr={5}
                variant="h6"
                sx={{
                  backgroundColor: "#30349B",
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingRight: 1,
                  paddingLeft: 1,
                  color: "white",
                  borderRadius: "12px",
                }}
              >
                User Login
              </Typography>
              <Typography
                ml={5}
                variant="h6"
                sx={{
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingRight: 1,
                  paddingLeft: 1,
                }}
              >
                <Link to={"/doctor_login"}>Doctor Login </Link>
              </Typography>
            </Box>
          </Box>
          <Typography variant="h4" padding={3} textAlign="center">
           
            Login
          </Typography>
          <Typography variant="h6" padding={3} textAlign="center">
           
            Welcome Back
          </Typography>
          <TextField
            size="small"
            fullWidth
            sx={{ backgroundColor: "white" }}
            margin="normal"
            name="email"
            value={formik.values.email}
            error={formik.errors.email}
            helperText={formik.errors.email}
            onChange={formik.handleChange}
            type={"email"}
            label="Email"
            variant="outlined"
          />
          <TextField
            size="small"
            fullWidth
            sx={{ backgroundColor: "white" }}
            margin="normal"
            type={"password"}
            label="Password"
            name='password'
            value={formik.values.password}
            error={formik.errors.password}
            helperText={formik.errors.password}
            onChange={formik.handleChange}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="warning"
            name="submit"
            type='submit'
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Login
          </Button>
          <Typography mt={2}>
            Are you new user?<Link to={"/user_signup"}>click Here </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default UserLogin;
