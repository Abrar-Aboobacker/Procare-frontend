import React, { useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userSchema } from "../../validation/userValidation";
import { useDispatch } from "react-redux";
import axios from "../../axios/axios";
import { hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { setUser } from "../../redux/UserSlice";
import Navbar from "../user/Home/Navbar";
import Footer from "../user/Home/Footer";

const UserSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("usertoken")) {
      navigate("/");
    }
  },);
  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await axios.post("/signup", {
          values,
        });
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(setUser(values));
          navigate("/user_otp");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        helpers.setErrors({ submit: error.message });
        toast.error("something went wrong");
      }
    },
  });
  return (
    <div>
      <Navbar />
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            backgroundColor: "#F5FCFF",
            display: "flex",
            flexDirection: "column",
            width:{xs:"75%",sm:500},
            maxWidth: 500,
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginY: {xs:10,sm:14.5,md:26.3,lg:10},
            padding: 3,
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
                mr={{ sm: 2, md: 5 }}
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
                User Signup
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
                name="fName"
                value={formik.values.fName}
                error={formik.errors.fName}
                helperText={formik.errors.fName}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"text"}
                name="lName"
                value={formik.values.lName}
                error={formik.errors.lName}
                helperText={formik.errors.lName}
                onChange={formik.handleChange}
                label="Last Name"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"email"}
                name="email"
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
                type={"tel"}
                label="Phone No"
                name="phone"
                value={formik.values.phone}
                error={formik.errors.phone}
                helperText={formik.errors.phone}
                onChange={formik.handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"password"}
                label="Password"
                name="password"
                value={formik.values.password}
                error={formik.errors.password}
                helperText={formik.errors.password}
                onChange={formik.handleChange}
                // error={}
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                sx={{ backgroundColor: "white" }}
                margin="normal"
                type={"password"}
                name="cpassword"
                value={formik.values.cpassword}
                error={formik.errors.cpassword}
                helperText={formik.errors.cpassword}
                onChange={formik.handleChange}
                label="Confirm Password"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="warning"
            type="submit"
            sx={{ marginTop: 3, borderRadius: 3 }}
            name="submit"
          >
            SignUp
          </Button>
          <Typography mt={2}>
            Already Have an Account?<Link to={"/user_login"}>Log in</Link>
          </Typography>
        </Box>
      </form>
      <Footer />
    </div>
  );
};

export default UserSignUp;
