import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/sidebar/Sidebar";
import { CameraAlt, Height, Padding } from "@mui/icons-material";
import { positions } from "@mui/system";
import axios from "../../axios/axios";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { setDoctor } from "../../redux/DoctorSlice";
import { baseURL } from "../../constants/constant";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DoctorProfile = () => {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const { doctor } = useSelector((state) => state.doctor);
  
  const [value, setvalue] = useState({
    name: doctor ? doctor.name : "",
    email: doctor ? doctor?.email : "",
    phone: doctor ? doctor?.phone : null,
    about: doctor ? doctor?.about : "",
    specialization: doctor ? doctor?.specialization : "",
    experience: doctor ? doctor?.experience : null,
    feesPerCunsaltation: doctor ? doctor?.feesPerCunsaltation : null,
    qualification: doctor ? doctor?.qualification : "",
  });
  const [image, setImage] = useState();
  const [startTime,setStartTime] = useState('');
  const [endTime,setEndTime] = useState('');
  const [slot,setSlot] = useState(null);
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // validate file
    if (!allowedExtensions.exec(selectedFile.name)) {
      toast.error("Please upload a PNG, JPG, or JPEG image.");
      setImage("");
      return;
    } else if (selectedFile.size > 1 * 1024 * 1024) {
      toast.error("Please upload a file smaller than 1MB.");
      setImage("");
      return;
    } else {
      setImage(selectedFile);
    }
  };
  const modalHandler = (userId) => {
    // setSelectedUserId(userId);
    setOpen(true);
  };

  // const getData=async()=>{
  //   try {
  //     const response = await axios.post("/doctor/doctorInfo",{},{
  //       headers:{
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       }
  //     })
  //       console.log(response.data)

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(()=>{
  //   getData()
  // },[])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setvalue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/doctor/doctorProfileEdit",
        { ...value },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setDoctor(response.data.data));
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
  const handlePicUpload = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/doctor/doctorProfilePicUpload",
        {  profile: image },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setDoctor(response.data.data));
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
  const slotSubmit = async (e) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/doctor/updateSlotTime",
        { startTime,endTime,slot },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setDoctor(response.data.data));
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
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <DrawerHeader />
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#E9FBFF",
              height: "100vh",
            }}
          >
            <Box sx={{ marginTop: 5 }}>
              <Card
                elevation={0}
                sx={{ maxWidth: 400, width: 400, backgroundColor: "#E9FBFF" }}
              >
                <label htmlFor="fileInput">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      sx={{ height: 200, width: 200 }}
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : `${baseURL}${doctor.profile}
            `
                      }
                    />
                  </Box>
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <Button
                      onClick={handlePicUpload}
                      variant="contained"
                      color="warning"
                      sx={{ marginBottom: 2 }}
                    >
                      Edit Profile
                      <CameraAlt sx={{ marginLeft: 2, color: "white" }} />{" "}
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h5" color="text.secondary">
                      {doctor?.name}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ marginLeft: "4.25rem", marginTop: 5, width: "100%" }}>
              <Typography variant="h5" fontWeight={400}>
                Personal Information
              </Typography>
              <Box>
                <TextField
                  sx={{
                    backgroundColor: "white",
                    marginLeft: "10",
                    marginRight: 5,
                  }}
                  margin="normal"
                  type={"text"}
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                  size="small"
                  // onChange={(e)=>setName(e.target.value)}
                  // onChange={handleChange}
                  label="Full Name"
                  variant="outlined"
                />
                <TextField
                  sx={{ backgroundColor: "white" }}
                  margin="normal"
                  name="email"
                  type={"email"}
                  size="small"
                  // onChange={(e)=>setEmail(e.target.value)}
                  onChange={handleChange}
                  value={value.email}
                  label="email"
                  variant="outlined"
                />
              </Box>
              <Box>
                <TextField
                  sx={{ backgroundColor: "white", marginRight: 5 }}
                  margin="normal"
                  name="phone"
                  size="small"
                  value={value.phone}
                  onChange={handleChange}
                  type="tel"
                  label="Phone No"
                  variant="outlined"
                />
                <TextField
                  // fullWidth
                  multiline
                  size="small"
                  name="about"
                  maxRows={5}
                  sx={{ backgroundColor: "white", width: 300 }}
                  margin="normal"
                  // type={"text"}
                  value={value.about}
                  // value={value.about}
                  onChange={handleChange}
                  //   onChange={(e)=>setAbout(e.target.value)}
                  label="Write About Your Self"
                  variant="outlined"
                />
              </Box>
              <Typography variant="h5" fontWeight={400}>
                Professional Information
              </Typography>
              <Box>
                <TextField
                  sx={{
                    backgroundColor: "white",
                    marginLeft: "10",
                    marginRight: 5,
                  }}
                  margin="normal"
                  type={"text"}
                  name="specialization"
                  value={value.specialization}
                  // value={name}
                  size="small"
                  // onChange={(e)=>setName(e.target.value)}
                  onChange={handleChange}
                  label="Specialization"
                  variant="outlined"
                />
                <TextField
                  sx={{
                    backgroundColor: "white",
                    marginLeft: "10",
                    marginRight: 5,
                  }}
                  margin="normal"
                  type={"number"}
                  name="experience"
                  value={value.experience}
                  size="small"
                  // onChange={(e)=>setName(e.target.value)}
                  onChange={handleChange}
                  label="Experince"
                  variant="outlined"
                />
                <TextField
                  sx={{
                    backgroundColor: "white",
                    marginLeft: "10",
                    marginRight: 5,
                  }}
                  margin="normal"
                  type={"number"}
                  name="feesPerCunsaltation"
                  value={value.feesPerCunsaltation}
                  size="small"
                  // onChange={(e)=>setName(e.target.value)}
                  onChange={handleChange}
                  label="Fees per consaltation"
                  variant="outlined"
                />
                <TextField
                  sx={{
                    backgroundColor: "white",
                    marginLeft: "10",
                    marginRight: 5,
                  }}
                  margin="normal"
                  type={"text"}
                  name="qualificaiton"
                  value={value.qualification}
                  size="small"
                  onChange={handleChange}
                  label="Qualification"
                  variant="outlined"
                />
                  <Box sx={{mt:5}}>
                <Button variant="contained" onClick={() => modalHandler(value._id)}>
                  Update your timing
                </Button>
                <StyledModal
                  open={open}
                  onClose={(e) => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    width={400}
                    height={380}
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
                      select your timing
                    </Typography>
                    <TextField
                      type="datetime-local"
                      name="startTime"
                      focused
                      margin="normal"
                      value={startTime}
                      onChange={(e)=>setStartTime(e.target.value)}                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      label="enter start time"
                      variant="outlined"
                    />
                    <TextField
                      type="datetime-local"
                      focused
                      name="endTime"
                      margin="normal"
                      value={endTime}
                      onChange={(e)=>setEndTime(e.target.value)}
                      fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      label="enter end time"
                      variant="outlined"
                    />
                    <TextField
                      type="number"
                      name="slot"
                      margin="normal"
                      value={slot}
                      onChange={(e)=>setSlot(e.target.value)}                     fullWidth
                      size="small"
                      sx={{ backgroundColor: "white" }}
                      label="enter number of slot"
                      variant="outlined"
                    />
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      marginTop={3}
                    >
                      <Button
                        variant="contained"
                        color="inherit"
                        onClick={() => {
                          slotSubmit(slot)
                          setOpen(null)
                          // setSelectedUserId(null);
                        
                        }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </StyledModal>
                </Box>
                <Typography>{doctor?.time?.slot}</Typography>
              </Box>
              <Box></Box>

              <Box
                sx={{ display: "flex", justifyContent: "center", width: "75%" }}
              >
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  variant="contained"
                  color="warning"
                  sx={{ marginTop: 3, borderRadius: 3 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DoctorProfile;
