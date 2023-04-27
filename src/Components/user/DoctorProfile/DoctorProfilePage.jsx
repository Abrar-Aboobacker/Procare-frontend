import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import "./DoctorProfile.css";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { baseURL } from "../../../constants/constant";
import { toast } from "react-hot-toast";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
const DoctorProfilePage = ({ id }) => {
  const navigate = useNavigate()
  const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const [doctor, setDoctor] = useState(null);
  const [open, setOpen] = useState(false);
  const [availableDays, setavailableDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [availability, setAvailability] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [token, setToken] = useState(null);
  const [schedulTime, setSchedulTime] = useState("");
  // const user = localStorage.getItem("usertoken");
  // const usertoken = user.usertoken;
  const fetchDctorDetails = async () => {
    try {
      const response = await axios.get(`/singleDoctorDetails/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setDoctor(response.data.data);
        setavailableDays(response.data.availableDays);
      }
    } catch (error) {
      console.log(error);

    }
  };
  useEffect(() => {
    fetchDctorDetails();
  }, []);
  const fetchIsPlanIsPresent = async ()=>{
    try {
      const response = await axios.get("/isPlanPresent", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      })
      if(response.data.success){
        toast.error(response.data.message)
        navigate('/plan_pricing')
      }else{
        setOpen(true)
      }
    } catch (error) {
      toast.error("You Need to  login first")
      navigate('/user_login')
    }
  }
  // useEffect(()=>{
  //   fetchIsPlanIsPresent()
  // },[])
  function tileDisabled({ activeStartDate, date, view }) {
    if (date < new Date()) {
      return true;
    }
    // Disable all days that are not in the availableDays array
    if (
      view === "month" &&
      !availableDays.includes(date.toLocaleString("en-US", { weekday: "long" }))
    ) {
      return true;
    }
  }
  function tileClassName({ date }) {
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });

    if (availableDays.includes(dayOfWeek)) {
      // Active day
      if (date < new Date()) {
        return "inactive";
      }
      return "active";
    } else {
      // Inactive day
      return "inactive";
    }
  }
  const handleAppointment = (event) => {
    try {
      event.preventDefault();
      axios
        .post(
          "/verifyAppointment",
          {
            date: selectedDate,
            timeId: selectedTime,
            doctor: id,
            time:schedulTime,
            // token:token
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("usertoken"),
            },
          }
        )
        .then((response) => {
          const result = response.data;
          console.log(result);
          if (result.success) {
            setToken(result.token);
            setSchedulTime(result.schedulTime);
            // setShowPaypal(true);
            toast.success(result.message);
          } else {
            toast.error(result.message,{duration:6000});
          }
        });
    } catch (error) {
      toast.error("You Need to  login first")
      navigate('/user_login')
    }
  };
  function handleDateChange(date) {
    const selectedDay = date.toLocaleString("en-us", { weekday: "long" });
    setSelectedDate(date);
    try {
      axios
        .get(`/availableSlot/${id}/${selectedDay}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setAvailability(response.data.availability);
          } else {
            toast.error(response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section style={{ marginTop: "50px", marginBottom: "80px" }}>
        <Box sx={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
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
                        width: "250px",
                        height: "250px",
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
                      sx={{ textAlign: "center", fontWeight: 500 }}
                    >
                      {doctor?.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center", fontWeight: 500 }}
                    >
                      {doctor?.qualification}
                    </Typography>
                  </CardContent>
                </Card>
                <Box display={"flex"} justifyContent={"center"} mt={5}>
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ borderRadius: 3 }}
                    onClick={fetchIsPlanIsPresent}
                  >
                    Book Now
                  </Button>
                  <StyledModal
                    open={open}
                    onClose={(e) => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      width={400}
                      // height={"100vh"}
                      bgcolor={"background.default"}
                      color={"text.primary"}
                      p={3}
                      borderRadius={5}
                    >
                      <Typography
                        variant="h6"
                        color="gray"
                        textAlign="center"
                        marginBottom={3}
                      >
                        Make your Appointment
                      </Typography>
                      {availableDays.length === 0 ? (
                        <Box>Not available</Box>
                      ) : (
                        <Box>
                          <Box></Box>
                          <form onSubmit={handleAppointment}>
                            <Box>
                              <Typography textAlign={"center"}>
                                Available Date
                              </Typography>
                              <Box ml={4}>
                                <Calendar
                                  tileDisabled={tileDisabled}
                                  tileClassName={tileClassName}
                                  onChange={handleDateChange}
                                />
                                {selectedDate && (
                                  <Typography>
                                    You selected: {selectedDate.toDateString()}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                            {selectedDate && (
                              <Box className="mb-4 text-center">
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Select a time:
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedTime}
                                    label="select a day"
                                    onChange={(e) =>
                                      setSelectedTime(e.target.value)
                                    }
                                    size="small"
                                  >
                                    <MenuItem>--Select a time--</MenuItem>
                                    {availability &&
                                      availability.time.map((times) => (
                                        <MenuItem
                                          key={times.start}
                                          value={times._id}
                                        >
                                          {moment(times.start).format(" h:mm ")}{" "}
                                          To
                                          {moment(times.end).format(" h:mm ")}
                                        </MenuItem>
                                      ))}
                                  </Select>
                                </FormControl>
                              </Box>
                            )}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                mt: 5,
                              }}
                            >
                              <Button
                                // className="bg-white  hover:bg-[#194569] text-black font-bold py-2 px-20 rounded-lg"
                                type="submit"
                                disabled={!selectedDate || !selectedTime}
                              >
                                Continue
                              </Button>
                            </Box>
                          </form>
                        </Box>
                      )}

                      <Box
                        sx={{ display: "flex", justifyContent: "end", mt: 5 }}
                      >
                        <Button onClick={(e) => setOpen(false)}>Close</Button>
                      </Box>
                    </Box>
                  </StyledModal>
                </Box>
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
                  <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
                    <Typography variant="h6" sx={{ fontSize: 18 }}>
                      Qualification
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 18 }}>
                      {" "}
                      {doctor?.qualification}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
                    <Typography variant="h6" sx={{ fontSize: 18 }}>
                      Languages Spoken
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 18 }}>
                      {doctor?.language}
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
                  <Box sx={{ flex: "0 0 50%" }}>
                    <Typography variant="h6" sx={{ fontSize: 18 }}>
                      Specialization
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 18 }}>
                      {doctor?.specialization}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: "0 0 50%" }}>
                    <Typography variant="h6" sx={{ fontSize: 18 }}>
                      Experience
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 18 }}>
                      {doctor?.experience}
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
                  <Box sx={{ flex: "0 0 100%", maxWidth: "100%" }}>
                    <Box mt={"10px"}>
                      <Typography variant="h6" sx={{ fontSize: 18 }}>
                        About
                      </Typography>
                      <Typography variant="body1" sx={{ fontSize: 18 }}>
                        {doctor?.about}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </section>
    </>
  );
};

export default DoctorProfilePage;
