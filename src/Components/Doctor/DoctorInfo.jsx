import { Margin, Padding } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDoctor } from "../../redux/DoctorSlice";
import axios from '../../axios/axios'
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
const DoctorInfo = () => {
  const {doctor}=useSelector((state)=>state.doctor)
  const dispatch =useDispatch()
    const [value,setvalue]=useState({
          name:doctor? doctor.name:"",
          email:doctor? doctor?.email:"",
          phone:doctor? doctor?.phone: null,
          about:doctor? doctor?.about:"",
          specialization:doctor? doctor?.specialization:"",
          experience:doctor? doctor?.experience:null,
          feesPerCunsaltation:doctor? doctor?.feesPerCunsaltation:null,

        })
        const handleChange = (e) => {
  const { name, value } = e.target;
  console.log(value);
  setvalue((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    dispatch(showLoading())
    const response = await axios.post("/doctor/doctor_apply",{...value, token:localStorage.getItem('tokken')},{
               headers:{
                   Authorization: "Bearer " + localStorage.getItem("token")
               }
            })
    dispatch(hideLoading())
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      console.log("hereee");
      toast.error(response.data.message)
    }
  } catch (error) {
    dispatch(hideLoading())
    console.log(error);
    toast.error("something went wrong")
  }
}
  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flex={2}
        justifyContent="center"
        alignItems={"stretch"}
        sx={{ backgroundColor: "#E9FBFF"  }}
      >
        <Box sx={{ marginLeft: "4.25rem", marginTop: 5, marginRight: "4.25rem"}}>
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
              size="small"
              // onChange={(e)=>setName(e.target.value)}
              onChange={handleChange}
              value={value.name}
              label="Full Name"
              variant="outlined"
            />
            <TextField
              sx={{
                backgroundColor: "white",
                marginLeft: "10",
                marginRight: 5,
              }}
            
              margin="normal"
              type={"tel"}
              name="phone"
              size="small"
              // onChange={(e)=>setName(e.target.value)}
              onChange={handleChange}
              value={value.phone}
              label="Phone No"
              variant="outlined"
            />
          
            <TextField
              sx={{
                backgroundColor: "white",
                marginLeft: "10",
                marginRight: 5,
              }}
              margin="normal"
            //   fullWidth
              type={"email"}
              name="email"
              value={value.email}
              size="small"
              // onChange={(e)=>setName(e.target.value)}
              onChange={handleChange}
              label="Email"
              variant="outlined"
            />
          </Box>
          <TextField
            // fullWidth
            multiline
            size="small"
            name="about"
            maxRows={5}
            sx={{ backgroundColor: "white",width:"85%" }}
            margin="normal"
            // type={"text"}
            value={value.about}
            // value={value.about}
            onChange={handleChange}
            //   onChange={(e)=>setAbout(e.target.value)}
            label="Write About Your Self"
            variant="outlined"
          />
          <Typography variant="h5" fontWeight={400} sx={{ marginTop: 5 }}>
            Professional Information:
          </Typography>
          <Box>

          <TextField
            sx={{ backgroundColor: "white", marginLeft: "10", marginRight: 5 }}
            margin="normal"
            type={"text"}
            name="specialization"
            // value={name}
            size="small"
            // onChange={(e)=>setName(e.target.value)}
            onChange={handleChange}
            label="Specialization"
            variant="outlined"
            />
            <TextField
            sx={{ backgroundColor: "white", marginLeft: "10", marginRight: 5 }}
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
            sx={{ backgroundColor: "white", marginLeft: "10", marginRight: 5 }}
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
            {/* <TextField
            sx={{ backgroundColor: "white", marginLeft: "10", marginRight: 5 }}
            focused
            margin="normal"
            type={"datetime-local"}
            name="name"
            // value={name}
            size="small"
            // onChange={(e)=>setName(e.target.value)}
            // onChange={handleChange}
            label="Timing"
            variant="outlined"
            /> */}
            
            </Box>
            <Box>
            <TextField
              sx={{ backgroundColor: "white", marginLeft: "10", marginRight: 5 }}
              focused
              margin="normal"
              // accept= 'image/*'
              type="file"
              size="small"
            //   onChange={(e)=>setFile(e.target.files[0])}
              label="upload your Certificate"
              variant="outlined"
            /> 
            </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
    </>
  );
};

export default DoctorInfo;