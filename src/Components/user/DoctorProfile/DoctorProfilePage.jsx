import {
  Avatar,
  Box,
  Button,
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
                  >
                    Book Now
                  </Button>
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
