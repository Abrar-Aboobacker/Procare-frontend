import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { baseURL } from "../../../constants/constant";
const DoctorProfilePage = ({ id }) => {
  const [doctor, setDoctor] = useState(null);
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
  useEffect(() => {
    fetchDctorDetails();
  }, []);
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
                    maxWidth: 4450000000,
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
                      sx={{ textAlign: "center" }}
                    >
                      {doctor?.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {doctor?.qualification}
                    </Typography>
                  </CardContent>
                </Card>
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
                    <Typography>Qualification</Typography>
                    <Typography> {doctor?.qualification}</Typography>
                  </Box>
                  <Box sx={{ flex: "0 0 50%", maxWidth: "50%" }}>
                    <Typography>Languages Spoken</Typography>
                    <Typography>{doctor?.language}</Typography>
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
                    <Typography>Specialization</Typography>
                    <Typography>{doctor?.specialization}</Typography>
                  </Box>
                  <Box sx={{ flex: "0 0 50%" }}>
                    <Typography>Experience</Typography>
                    <Typography>{doctor?.experience}</Typography>
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
                    <Typography>Next Availability</Typography>
                    <Typography>
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
                      <Typography>About</Typography>
                      <Typography>{doctor?.about}</Typography>
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
