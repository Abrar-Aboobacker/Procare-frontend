import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoctor } from "../../redux/DoctorSlice";
import axios from "../../axios/axios";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const DoctorInfo2 = () => {
    const { doctor } = useSelector((state) => state.doctor);
    const dispatch = useDispatch();
    const [value, setvalue] = useState({
      name: doctor ? doctor.name : "",
      email: doctor ? doctor?.email : "",
      phone: doctor ? doctor?.phone : null,
      about: doctor ? doctor?.about : "",
      specialization: doctor ? doctor?.specialization : "",
      experience: doctor ? doctor?.experience : null,
      feesPerCunsaltation: doctor ? doctor?.feesPerCunsaltation : null,
      qualification:doctor? doctor?.qualification:"",
      language:doctor? doctor?.language:""
    });
    const [filez, setFile] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(value);
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
          "/doctor/doctor_apply",
          { ...value, file: filez },
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.getItem("doctorwaitingtoken"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          console.log(response.data.data);
          dispatch(setDoctor(response.data.data));
          navigate("/doctor_waiting_page");
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
     <form action="" onSubmit={handleSubmit}>
      <Box>
        <Box
          sx={{
            backgroundColor: "#ffecf0",
            display: "flex",
            flexDirection: "column",
            maxWidth: 450,
            height: '100%',
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            marginTop: 10,
            padding: 3,
            borderRadius: 5,
            boxShadow: "5px 5px 10px #ccc ",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >
          <Typography variant="h5" fontWeight={400} padding={3} textAlign="center">
            Personal Information
          </Typography>
          <TextField
            fullWidth
            size="small"
            sx={{ backgroundColor: "white" }}
            margin="normal"
            type={"text"}
            label="Full Name"
            variant="outlined"
            onChange={handleChange}
            value={value.name}
          />
           <TextField
                sx={{
                  backgroundColor: "white",
                }}
                margin="normal"
                type={"tel"}
                fullWidth
                name="phone"
                size="small"
                onChange={handleChange}
                value={value.phone}
                label="Phone No"
                variant="outlined"
              />
               <TextField
                sx={{
                  backgroundColor: "white",
                }}
                margin="normal"
                  fullWidth
                type={"email"}
                name="email"
                value={value.email}
                size="small"
                // onChange={(e)=>setName(e.target.value)}
                onChange={handleChange}
                label="Email"
                variant="outlined"
              />
                <TextField
              fullWidth
              multiline
              size="small"
              name="about"
              maxRows={5}
              sx={{ backgroundColor: "white", width: "85%" }}
              margin="normal"
              type={"text"}
              value={value.about}
              onChange={handleChange}
              label="Write About Your Self"
              variant="outlined"
            />
             <Typography variant="h5" fontWeight={400} sx={{ marginTop: 5 }}>
              Professional Information
            </Typography>
            <TextField
                sx={{
                  backgroundColor: "white",
                }}
                fullWidth
                margin="normal"
                type={"text"}
                name="specialization"
                value={value.specialization}
                size="small"
                onChange={handleChange}
                label="Specialization"
                variant="outlined"
              />
              <TextField
                sx={{
                  backgroundColor: "white",
                }}
                fullWidth
                margin="normal"
                type={"number"}
                name="experience"
                value={value.experience}
                size="small"
                onChange={handleChange}
                label="Experince"
                variant="outlined"
              />
              <TextField
                sx={{
                  backgroundColor: "white",
                }}
                fullWidth
                margin="normal"
                type={"number"}
                name="feesPerCunsaltation"
                value={value.feesPerCunsaltation}
                size="small"
                onChange={handleChange}
                label="Fees per consaltation"
                variant="outlined"
              />
              <TextField
                sx={{
                  backgroundColor: "white",
                }}
                fullWidth
                margin="normal"
                type={"text"}
                name="qualification"
                value={value.qualification}
                size="small"
                onChange={handleChange}
                label="Your Qualification"
                variant="outlined"
              />
               <TextField
                sx={{
                  backgroundColor: "white",
                }}
                fullWidth
                margin="normal"
                type={"text"}
                name="language"
                value={value.language}
                size="small"
                onChange={handleChange}
                label="Language"
                variant="outlined"
              />
              <TextField
                sx={{
                  backgroundColor: "white",
                }}
                focused
                fullWidth
                margin="normal"
                type="file"
                size="small"
                name="filez"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                label="upload your Certificate"
                variant="outlined"
              />
                <Button
                type="submit"
                name="Submit"
                // onClick={handleSubmit}
                variant="contained"
                color="warning"
                sx={{ marginTop: 3, borderRadius: 3 }}
              >
                Submit
              </Button>
        </Box>
      </Box>
      </form>
    </>
  );
};

export default DoctorInfo2;
