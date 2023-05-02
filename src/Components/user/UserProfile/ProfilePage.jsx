import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import axios from '../../../axios/axios'
import { toast } from "react-hot-toast";
import { showLoading,hideLoading } from "../../../redux/alertsSlice";
import { setUser } from "../../../redux/UserSlice";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../../validation/changePasswordValidation";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const navigate=useNavigate()
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [value, setvalue] = useState({
    fName: user ? user?.fName : "",
    lName: user ? user?.lName : "",
    phone: user ? user?.phone : null,
    email: user ? user?.email : "",
    dob: user ? user?.dob : "",
    gender: user ? user?.gender : "",
    // feesPerCunsaltation: user ? user?.feesPerCunsaltation : null,
    // qualification: user ? user?.qualification : "",
    // language: user ? user?.language : "",
  });
  const [image, setImage] = useState();
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      cpassword:""
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
        const response = await axios.post("/changePassword", {
          values,
        }, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("usertoken")
          },
        });
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.removeItem('usertoken');
          dispatch(setUser(null))
          navigate("/user_login")
        dispatch(setUser(response.data.userz))
          // navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        helpers.setErrors({ submit: error.message });
        toast.error("something went wrong");
      }
    },
  });
  const handleChanges = (e) => {
    const { name, value } = e.target;

    setvalue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmits = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/userProfileEdit",
        { ...value },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("usertoken")
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        console.log("hereee");
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <Box>
        <Box sx={{ display: { xs: "block", sm: "block",md:'flex' } }}>
          <Box sx={{ mt: {xs:5,sm:5,md:25,lg:10,xl:5}, ml: 3, mb: 2 }}>
            <Profile />
          </Box>
          <Box>
              <Box
                sx={{
                  backgroundColor: "#eff2f7",
                  // display: "flex",
                  flexWrap: "wrap",
                  // flexDirection: "col",
                  // maxWidth: 450,
                  width: "80%",
                  height: {xs:"80%",sm:"80%",md:"90%",lg:"85%",xl:"80%"},
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "auto",
                  padding: 3,
                  borderRadius: 5,
                  mt: 5,
                  mb:5,
                  // height:"70vh",
                  boxShadow: "5px 5px 10px #ccc ",
                  ":hover": {
                    boxShadow: "10px 10px 20px #ccc ",
                  },
                }}
              >
                <Typography variant="h4" padding={3} textAlign="center">
                  Personal Information
                </Typography>
                <Box>
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      mx:{xs:5,sm:8,md:8},
                      marginRight: 3,
                    }}
                    margin="normal"
                    type={"text"}
                    name="fName"
                    value={value?.fName}
                    onChange={handleChanges}
                    size="small"
                    label="First Name"
                    variant="outlined"
                  />
                  <TextField
                    sx={{ backgroundColor: "white", mx:{xs:5,sm:0,md:8} }}
                    margin="normal"
                    name="lName"
                    type={"text"}
                    size="small"
                    onChange={handleChanges}
                    value={value?.lName}
                    label="Last Name"
                    variant="outlined"
                  />
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      mx:{xs:5,sm:8,md:8}
                      // marginLeft: 3,
                      // marginRight: 3,
                    }}
                    margin="normal"
                    name="email"
                    size="small"
                    value={value?.email}
                    onChange={handleChanges}
                    type="email"
                    label="email"
                    variant="outlined"
                  />
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      marginRight: 3,
                      mx:{xs:5,sm:0,md:8},
                    }}
                    margin="normal"
                    type={"tel"}
                    name="phone"
                    value={value?.phone}
                    onChange={handleChanges}
                    size="small"
                    label="Phone"
                    variant="outlined"
                  />
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      marginRight: 3,
                      width: 210,
                      mx:{xs:5,sm:8,md:8},
                    }}
                    focused
                    margin="normal"
                    type={"date"}
                    name="dob"
                    value={value?.dob}
                    onChange={handleChanges}
                    size="small"
                    label="date of birth"
                    variant="outlined"
                  />
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      marginRight: 3,
                      mx:{xs:5,sm:0,md:8},
                    }}
                    margin="normal"
                    type={"text"}
                    name="gender"
                    value={value?.gender}
                    onChange={handleChanges}
                    size="small"
                    label="gender"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                  <Button
                    type="submit"
                      onClick={handleSubmits}
                    variant="contained"
                    color="warning"
                    sx={{ marginTop: 3, borderRadius: 3 }}
                  >
                    Update
                  </Button>
                </Box>
                <Typography variant="h4" padding={3} textAlign="center">
                  Change Password
                </Typography>
                <div>
                <form onSubmit={formik.handleSubmit}>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      // marginLeft: "10",
                      // marginRight: 5,
                      mx:{xs:5,sm:0,md:8},
                    }}
                    margin="normal"
                    type={"password"}
                    name="currentPassword"
                    size="small"
                    value={formik?.values?.currentPassword}
                    error={formik?.errors?.currentPassword}
                    helperText={formik?.errors?.currentPassword}
                    onChange={formik?.handleChange}
                    label="Current Password"
                    variant="outlined"
                  />
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      // marginLeft: "10",
                      // marginRight: 5,
                      mx:{xs:5,sm:1,md:8},
                    }}
                    margin="normal"
                    type={"password"}
                    name="password"
                    size="small"
                    value={formik?.values?.password}
                    error={formik?.errors?.password}
                    helperText={formik?.errors?.password}
                    onChange={formik?.handleChange}
                    label="New Password"
                    variant="outlined"
                  />
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      marginLeft: "10",
                      marginRight: 5,
                      mx:{xs:5,sm:0,md:8},
                    }}
                    margin="normal"
                    type={"password"}
                    name="cpassword"
                    size="small"
                    value={formik?.values?.cpassword}
                    error={formik?.errors?.cpassword}
                    helperText={formik?.errors?.cpassword}
                    onChange={formik?.handleChange}
                    label="Confirm Password"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="warning"
                    sx={{ marginTop: 2, borderRadius: 3 }}
                  >
                    Confirm
                  </Button>
                </Box>
                </form>
                </div>
              </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
