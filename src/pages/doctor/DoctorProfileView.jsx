import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Tab,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ProfileEdit from "../../Components/DoctorProfile/ProfileEdit";
import DoctorShedule from "../../Components/DoctorProfile/DoctorShedule";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "../../axios/axios";
import { baseURL } from "../../constants/constant";
import { setDoctor } from "../../redux/DoctorSlice";
import DoctorAppointmentList from "./../../Components/DoctorProfile/DoctorAppointmentList";
import DoctorAppointmentHistory from "../../Components/DoctorProfile/DoctorAppointmentHistory";
const DoctorProfileView = () => {
  const { doctor } = useSelector((state) => state.doctor);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [image, setImage] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  const handlePicUpload = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/doctor/doctorProfilePicUpload",
        { profile: image },
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
  return (
    <>
      <Box>
        <Box sx={{ display: { xs: "block", sm: "flex" } }}>
          <Box sx={{ mt: 5, ml: 3 }}>
            <Card
              elevation={2}
              sx={{
                maxWidth: 400,
                width: 400,
                backgroundColor: "#eff2f7",
                pt: 5,
              }}
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
                    sx={{ height: 200, width: 200, objectFit: "unset" }}
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `${baseURL}${doctor?.profile}
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
                    Update Profile
                    {/* <CameraAlt sx={{ marginLeft: 2, color: "white" }} />{" "} */}
                  </Button>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    textAlign={"center"}
                  >
                   Dr.{doctor?.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      typography: "body1",
                      justifyContent: "center",
                    }}
                  >
                    <TabContext value={value}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                          onChange={handleChange}
                          aria-label="lab API tabs example"
                        >
                          <Tab
                            sx={{
                              ml: "28%",
                              mt: 3,
                              fontWeight: 500,
                              fontSize: 20,
                            }}
                            label="EDIT PROFILE"
                            value="1"
                          />
                        </TabList>
                        <TabList onChange={handleChange}>
                          <Tab
                            sx={{
                              ml: "28%",
                              mt: 3,
                              fontWeight: 500,
                              fontSize: 20,
                            }}
                            label="SCHEDULE"
                            value="2"
                          />
                        </TabList>
                        <TabList onChange={handleChange}>
                          <Tab
                            sx={{
                              ml: "27%",
                              mt: 3,
                              fontWeight: 500,
                              fontSize: 20,
                            }}
                            label=" APPOINTMENTS"
                            value="3"
                          />
                        </TabList>
                      </Box>
                    </TabContext>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box>
            <TabContext value={value}>
              <TabPanel value="1">
                <ProfileEdit />
              </TabPanel>
              <TabPanel value="2">
                <DoctorShedule />
              </TabPanel>
              <TabPanel value="3">
                <DoctorAppointmentList />
              </TabPanel>
              <TabPanel >
                <DoctorAppointmentHistory/>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DoctorProfileView;
