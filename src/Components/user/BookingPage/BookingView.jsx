import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { baseURL } from "../../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import moment from "moment";
import { useNavigate } from "react-router-dom";
const BookingView = ({ id }) => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [ setIsAvailable] = useState();
  const fetchIsPlanIsPresent = async ()=>{
    try {
      const response = await axios.get("/isPlanPresent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      })
      if(response.data.success){
        toast.error("please purchase a plan")
        navigate('/plan_pricing')
      }
    } catch (error) {
      toast.error("You Need to  login first")
      navigate('/user_login')
    }
  }
  const fetchDctorDetails = async () => {
    try {
      const response = await axios.get(`/singleDoctorDetails/${id}`, {});
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/book_appointment",
        {
          doctorId: id,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("usertoken"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      navigate('/user_login')
    }
  };
  useEffect(()=>{
    fetchIsPlanIsPresent()
  },)
  useEffect(() => {
    fetchDctorDetails();
  },);
  return (
    <>
      <section style={{ marginTop: "50px", marginBottom: "80px" }}>
        <Box sx={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
          <Typography
            variant="h5"
            sx={{ mb: 5, ml: 2, fontWeight: 500, letterSpacing: 2 }}
          >
            Schedule Your Session{" "}
          </Typography>
          <Box
            sx={{
              width: "100%",
              paddingLeft: "15px",
              paddingRight: "15px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ flex: { md: "0 0 25%" } }}>
                <Card
                  elevation={4}
                  sx={{
                    maxWidth: 445,
                    backgroundColor: "#eff2f7",
                    width: { xs: "320px" },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Avatar
                      sx={{
                        objectFit: "cover",
                        width: "150px",
                        height: "150px",
                        mt: 5,
                      }}
                      alt={doctor?.name}
                      src={`${baseURL}${doctor?.profile}`}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      {doctor?.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {doctor?.qualification}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: 14,
                        mt: 8,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AccessTimeIcon sx={{ mr: 2 }} />
                        45 minutes
                      </Box>
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      &#x2022; Please join the session 5 minutes before the
                      sheduled time,should you face any issues.
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      &#x2022; for an ideal experience, please ensure that you
                      have a high speed internet connection
                    </Typography>
                  </CardContent>
                </Card>
                {/* <Box display={"flex"} justifyContent={"center"} mt={5}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 3 }}
                  >
                    Book Now
                  </Button>
                </Box> */}
              </Box>
              <Box sx={{ flex: { md: "0 0 75%" } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginLeft: 4,
                    marginBottom: "1.5rem",
                  }}
                >
                  <Box sx={{ flex: "0 0 50%" }}>
                    <Typography variant="h6" sx={{ fontSize: 18 }}>
                      Next Availability
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 18 }}>
                      {doctor && doctor?.time && doctor?.time?.start
                        ? doctor?.time?.start
                        : "time is not updated"}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginLeft: 4,
                    marginBottom: "1.5rem",
                  }}
                >
                  <Box sx={{ flex: "0 0 50%", maxWidth: "45%", mr: 2 }}>
                    <TextField
                      focused
                      fullWidth
                      onChange={(value) =>{
                        setIsAvailable(false)
                        setDate(moment(value).format("DD-MM-YYYY"))
                      }  
                      }
                      name="date"
                      type="date"
                      label="Enter your Date"
                    />
                  </Box>
                  <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
                    <TextField
                      focused
                      fullWidth
                      onChange={(value) =>{
                        setIsAvailable(false)
                          setTime(moment(value).format("HH-MM"))
                      }
                      }
                      name="time"
                      type="time"
                      label="Enter your Starting time"
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    // flexWrap: "wrap",
                    justifyContent: "center",
                    mr: 4,
                    mt: 5,
                    marginBottom: "1.5rem",
                  }}
                >
                  {/* <Button
                    variant="contained"
                    color="inherit"
                    onClick={handleAvailability}
                    sx={{ borderRadius: 3 }}
                  >
                    Check Availability
                  </Button> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    // flexWrap: "wrap",
                    justifyContent: "center",
                    mr: 4,
                    mt: 5,
                    marginBottom: "1.5rem",
                  }}
                >
                {/* {isAvailable &&( */}
                      <Button
                      variant="contained"
                      color="warning"
                      sx={{ borderRadius: 3 }}
                      onClick={handleBooking}
                    >
                      Book Now
                    </Button>
                 {/* )} */}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default BookingView;
