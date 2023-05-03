import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { otpSchema } from "../../validation/otpValidation";
import { toast } from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";
import { setDoctor } from "../../redux/DoctorSlice";

const DoctorOtp = () => {
  const { doctor } = useSelector((state) => state.doctor);
  const doctorEmail = doctor.email
  useEffect(()=>{
  },[doctor])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds,minutes]);
  const formik = useFormik({
    initialValues: {
      otpis: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values, helpers) => {
      try {
        const response = await axios.post("/doctor/postDoctorOtp", {
          values
        });
        // dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("doctorwaitingtoken", response.data.data);
          dispatch(setDoctor(response.data.newDoctor));
          navigate("/doctor_moreinfo");
        } else {
          
          toast.error(response.data.message);
        }
      } catch (error) {
        // console.log(error);
        console.log('here');
        // helpers.setErrors({ submit: error.message });
        toast.error("something went wrong,Please enter your informaiton once more");
      }
    },
  });
  const resendOTP = async () => {
    setMinutes(0);
    setSeconds(30);

    try {
      // dispatch(showLoading());
      const response = await axios.post("/doctor/resendDoctorOtp", {
        doctorEmail
      });
      // dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div>
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
            padding: 3,
            marginTop: 15,
            borderRadius: 5,
            boxShadow: "5px 5px 10px #ccc ",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >
          <Box
            sx={{
              padding: "1rem",
              borderRadius: "0.5rem",
            }}
          >
            <Typography
              variant="h4"
              marginBottom={2}
              padding={3}
              textAlign="center"
            >
              Please Enter your otp here
            </Typography>
            <TextField
              size="small"
              name="otpis"
              value={formik.values.otpis}
              error={formik.errors.otpis}
              helperText={formik.errors.otpis}
              onChange={formik.handleChange}
              fullWidth
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"text"}
              label="Otp"
              variant="outlined"
            />
            <Button
              name="submit"
              type="submit"
              variant="contained"
              color="warning"
              sx={{ marginTop: 3, borderRadius: 3 }}
            >
              Verify
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "1.5rem 0",
              }}
            >
              {seconds > 0 || minutes > 0 ? (
                <p>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p>Didn't recieve code?</p>
              )}

              <Button
                disabled={seconds > 0 || minutes > 0}
                sx={{
                  color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                }}
                onClick={resendOTP}
              >
                Resend OTP
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default DoctorOtp;
