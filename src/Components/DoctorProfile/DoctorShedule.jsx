import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from '../../axios/axios'
import { toast } from "react-hot-toast";
import moment from "moment";
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DoctorShedule = () => {
  const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [timings, setTimings] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get("/doctor/getScheduleDetails", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.success) {
          setSchedule(result.schedule);
          
        }
      });
  }, [refresh]);
  const modalHandler = () => {
    setOpen(true);
  };
  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };
  const handleTimingAdd = () => {
    setTimings([...timings, { startTime: "", endTime: "", slots: "" }]);
  };
  const handleTimingChange = (e, index, key) => {
    const updatedTimings = [...timings];
    updatedTimings[index][key] = e.target.value;
    setTimings(updatedTimings);
  };
  const handleTimingRemove = (indexToRemove) => {
    setTimings((prevTimings) =>
      prevTimings.filter((timing, index) => index !== indexToRemove)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let filled = true;
    for (let i = 0; i < timings.length; i++) {
      const slots = parseInt(timings[i].slots);
      if (
        timings[i].startTime === "" ||
        timings[i].endTime === "" ||
        isNaN(slots) ||
        slots < 0
      ) {
        filled = false;
      }
    }
    if (filled) {
      axios
        .post(
          "/doctor/updateDotorAvailability",
          { selectedDay, timings },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setTimings([]);
            setSelectedDay("");
            setRefresh(!refresh);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        });
    } else {
      toast.error("All fields are required");
    }
  };
  const deleteTimeFromDB = (timeId) => {
    axios
      .post(`/doctor/deleteScheduleTime?timingId=${timeId}`,{},{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      })
      .then((response) => {
        if (response.data.success) {
          setRefresh(!refresh);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      });
  };
  return (
    <>
      <Box sx={{width: {xs:"99%",sm:"96%",md:"100%",lg:"1000px",xl:"1000px"}, mb:3,my:{xs:5,sm:5,md:28,lg:5}}}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() => modalHandler()}
            variant="contained"
            // sx={{ backgroundColor: "white", color: "#FF90AB" }}
          >
            Add Schedule
          </Button>
        </Box>

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
              Enter your schedule
            </Typography>
            <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select a Day</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedDay}
                label="select a day"
                onChange={handleDayChange}
                size="small"
              >
                <MenuItem>Select a day</MenuItem>
                {daysOfWeek.map((day)=>(
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedDay &&(
              <Box>
                <Box sx={{display:'flex',mt:2,mb:2}}>
                  <Typography textAlign={'center'}>{selectedDay}</Typography>
                  <Button 
                  type="button"
                  onClick={handleTimingAdd}
                  >
                    Add timing
                  </Button>
                </Box>
                {timings.map((timing,index)=>(
                  <Box key={index} sx={{p:1,mb:3}}>
                    <TextField
                    type="time"
                    value={timing.startTime}
                    label="Start Time"
                    onChange={(e) =>
                      handleTimingChange(e, index, "startTime")
                    }
                    />
                     <TextField
                    type="time"
                    label="End Time"
                    value={timing.endTime}
                    onChange={(e) =>
                      handleTimingChange(e, index, "endTime")
                    }
                    />
                    <Box sx={{mt:4}}>
                    <TextField
                    type="number"
                    label="Slots"
                    value={timing.slots}
                    onChange={(e) =>
                      handleTimingChange(e, index, "slots")
                    }
                    />
                    <Button
                     type="button"
                     onClick={() => handleTimingRemove(index)}
                     >
                      Remove
                    </Button>
                    </Box>
                  </Box>
                ))}
                <Box sx={{display:'center',justifyContent:'center',mt:5}}>
                  <Button
                  type="submit"
                  >
                    save
                  </Button>
                </Box>
              </Box>
            )}
            </form>
          </Box>
        </StyledModal>
        <Box></Box>
        <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
          Your Schedule
        </Typography>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              {schedule.length > 0 ? (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell>Timing</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { schedule.map((schedule) => (
                  <TableRow //key={value._id}
                  >
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>{schedule.time.map((times)=>(
                      <Box sx={{p:1, display:'flex',justifyContent:'space-between'}}>
                        <span>
                        {moment(times.start).format(" h:mm a")}
                        </span>
                        <span>
                          to
                        </span>
                        <span>
                        {moment(times.end).format(" h:mm a")}
                        </span>
                        <span className="">slots: {times.slots}</span>
                                <Button sx={{color:"red"}}
                                  onClick={() => deleteTimeFromDB(times._id)}
                                >
                                  Remove
                                </Button>
                      </Box>
                    ))}
                    </TableCell>
                  </TableRow>
                   ))}  
                </TableBody>
              </>
               ) : ( 
              <Box display={"flex"} justifyContent={"center"}>
                <Typography fontWeight={400} variant="h6">
                  Currently there is no plans
                </Typography>
              </Box>
             )} 
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
};

export default DoctorShedule;
