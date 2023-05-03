import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { toast } from "react-hot-toast";
import { hideLoading} from "../../../redux/alertsSlice";
import axios from "../../../axios/axios";
import moment from "moment";
const UserAppointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Appointments, setAppointments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      navigate("/user_login");
    }
  });
  useEffect(() => {
    // dispatch(showLoading());
    axios
      .get(`/getPendingAppointments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          dispatch(hideLoading());
          setAppointments(response.data.pendingAppointments);
        } else {
          toast.error(response.data.message);
        }
      });
  });
  useEffect(()=>{

  },[refresh])
  const cancelAppointment = (id) => {
    axios
      .post(
        "/cancelAppointment",
        { id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("usertoken"),
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setRefresh(!refresh);
        } else {
          toast.error(response.data.message);
        }
      });
  };
  return (
    <>
      <Navbar />
      <Box>
        <Box sx={{ display: { xs: "block", sm: "block",md:'flex'} }}>
          <Box sx={{ my:{xs:5,sm:5,md:21,lg:5}, ml: 3,  }}>
            <Profile />
          </Box>
          <Box sx={{ width: {xs:"100%",sm:"96%",md:"50%",lg:"64%",xl:"75%"}, ml: 2, mb:3 }}>
            <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500,mt:3 }}>
              New Appointments
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Link to={"/user/AppointmentHistory"}>
                <Typography
                  sx={{
                    mb: 2,
                    backgroundColor: "#516dc9",
                    color: "white",
                    borderRadius: 10,
                    pt: 1,
                    pb: 1,
                    pl: 2,
                    pr: 2,
                  }}
                >
                  History
                </Typography>
              </Link>
            </Box>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  {Appointments && Appointments.length > 0 ? (
                    <>
                      <TableHead>
                        <TableRow>
                          <TableCell>Doctor Name</TableCell>
                          <TableCell>Appointment Date</TableCell>
                          <TableCell>Appointment Time</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell sx={{ textAlign: "center" }}>
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Appointments.map((value) => (
                          <TableRow>
                            <TableCell>{value.doctor.name}</TableCell>
                            <TableCell>
                              {moment(value.date).format("DD-MM-YYYY")}
                            </TableCell>
                            <TableCell>{value.time}</TableCell>
                            <TableCell>{value.status}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex" }}>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  sx={{ marginRight: 2 }}
                                  onClick={() => cancelAppointment(value._id)}
                                >
                                  cancel
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  ) : (
                    <Box>
                      <Box display={"flex"} justifyContent={"center"}>
                        <Typography
                          fontWeight={400}
                          variant="h6"
                          textAlign={"center"}
                        >
                          Currently there is no new appointment check your
                          history
                        </Typography>
                      </Box>
                      <Box display={"flex"} justifyContent={"center"}>
                        <Link to="/user/AppointmentHistory">
                          <Typography
                            sx={{
                              mt: 3,
                              paddingY: 1,
                              paddingX: 3,
                              color: "white",
                              backgroundColor: "#a5aacc",
                            }}
                          >
                            History
                          </Typography>
                        </Link>
                      </Box>
                    </Box>
                  )}
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UserAppointment;
