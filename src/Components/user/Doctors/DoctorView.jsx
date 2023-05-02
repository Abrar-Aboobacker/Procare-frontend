import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import Pagination from "./Pagination";
import { baseURL } from "../../../constants/constant";
import { Link } from "react-router-dom";

const DoctorView = () => {
  const [doctor, setDoctor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [serachTerm, setSearchTerm] = useState("");
  const [showMore, setShowMore] = useState(false);
  const getDoctor = async () => {
    try {
      const response = await axios.get("/allDoctors", {});
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctor();
  }, []);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  // const currentDoctors = sortedDoctors.slice(firstPostIndex, lastPostIndex)
  const isTimeExpired = (time) => {
    if (!time || !time.start) return false; // If no start time, then not expired
    const startTime = new Date(time.start);
    const currentTime = new Date();
    return currentTime.getTime() > startTime.getTime();
  };
  const sortedDoctors = doctor.sort(
    (a, b) => new Date(a?.time?.start) - new Date(b?.time?.start)
  );
  // const filteredDoctors = currentDoctors.filter((value) => !isTimeExpired(value.time))
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filteredDoctors = sortedDoctors.filter((doctor) => {
    const isExpired = isTimeExpired(doctor.time);
    const matchesSearchTerm =
      doctor.name.toLowerCase().includes(serachTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(serachTerm.toLowerCase());
    return !isExpired && matchesSearchTerm;
  });

  const currentDoctors = filteredDoctors.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };
  return (
    <>
      <Box sx={{ backgroundColor: "#F0E9FF", height: 100,mt:{xs:14.5,sm:0} }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            type="search"
            size="small"
            label="search"
            margin="normal"
            onChange={handleSearchTermChange}
            sx={{ backgroundColor: "white", width: 500 }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        {currentDoctors.map((value) => (
          <Card
            elevation={2}
            sx={{ width: { xs: "95%", sm: 350 }, mt: { xs: 10 }, maxWidth: 400 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                marginTop: 5,
              }}
            >
              <Avatar
                sx={{
                  height: { xs: 120 },
                  width: { xs: 120 },
                  objectFit: "cover",
                }}
                src={`${baseURL}${value.profile}`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {value.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.qualification}
                </Typography>
              </CardContent>
            </Box>
            <CardContent>
              <Box>
                <Typography>{`${value?.about?.slice(0, 100)}...`}</Typography>
                <Typography>
                  {value?.time?.start &&
                    new Date(value.time.start).toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}{" "}
                  {value?.time?.start &&
                    new Date(value.time.start).toLocaleTimeString()}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Link to={`/doctor_details/${value._id}`}>
                <Button size="small">View Profile</Button>
              </Link>
              <Link to={`/doctor_appointment/${value._id}`} >
              <Button size="small">Book Now</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Box>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={doctor.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Box>
    </>
  );
};

export default DoctorView;
