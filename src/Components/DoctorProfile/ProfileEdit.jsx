import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { setDoctor } from "../../redux/DoctorSlice";
import axios from "../../axios/axios"
import { toast } from "react-hot-toast";
const ProfileEdit = () => {
    const { doctor } = useSelector((state) => state.doctor);
    const dispatch= useDispatch()
    const [value, setvalue] = useState({
        name: doctor ? doctor.name : "",
        email: doctor ? doctor?.email : "",
        phone: doctor ? doctor?.phone : null,
        about: doctor ? doctor?.about : "",
        specialization: doctor ? doctor?.specialization : "",
        experience: doctor ? doctor?.experience : null,
        feesPerCunsaltation: doctor ? doctor?.feesPerCunsaltation : null,
        qualification: doctor ? doctor?.qualification : "",
        language: doctor ? doctor?.language : "",
      });
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
  return (
    <>
      <form>
        <Box
          sx={{
            backgroundColor: "#eff2f7",
            // display: "flex",
            flexWrap:'wrap',
            // flexDirection: "col",
            // maxWidth: 450,
            width:{ xs:"90%",sm:"96%"},
            // height: "100%",
            height: {xs:"80%",sm:"80%",md:"90%",lg:"85%",xl:"80%"},
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            padding: 3,
            borderRadius: 5,
            // height:"70vh",
            boxShadow: "5px 5px 10px #ccc ",
            ":hover": {
              boxShadow: "10px 10px 20px #ccc ",
            },
          }}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            Personal information
          </Typography>
          <Box>
             <TextField
                  sx={{
                    backgroundColor: "white",
                    mx:{xs:5,sm:8,md:8},
                    marginRight:3,
                  }}
                  margin="normal"
                  type={"text"}
                  name="name"
                  value={value.name}
                  onChange={handleChange}
                  size="small"
                  label="Full Name"
                  variant="outlined"
                />
                <TextField
                  sx={{ backgroundColor: "white", mx:{xs:5,sm:8,md:8}, }}
                  margin="normal"
                  name="email"
                  type={"email"}
                  size="small"
                  onChange={handleChange}
                  value={value.email}
                  label="email"
                  variant="outlined"
                />
                 <TextField
                  sx={{ backgroundColor: "white", 
                  // marginLeft:3,marginRight:3
                  mx:{xs:5,sm:8,md:8}, 
                }}
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
                  sx={{
                    backgroundColor: "white",
                    // marginRight:3,
                    mx:{xs:5,sm:8,md:8},
                  }}
                  margin="normal"
                  type={"text"}
                  name="language"
                  value={value.language}
                  onChange={handleChange}
                  size="small"
                  label="Full Name"
                  variant="outlined"
                />
                <TextField
                  multiline
                  size="small"
                  name="about"
                  maxRows={5}
                  sx={{ backgroundColor: "white", 
                  width: 300,
                  mx:{xs:2,sm:8,md:8},
                 }}
                  margin="normal"
                  // type={"text"}
                  value={value.about}
                //   // value={value.about}
                  onChange={handleChange}
                  //   onChange={(e)=>setAbout(e.target.value)}
                  label="Write About Your Self"
                  variant="outlined"
                />
          </Box>
          <Typography variant="h4" padding={3} textAlign="center">
            Profosional information
          </Typography>
          <Box sx={{ display: "flex",
            flexWrap:'wrap',}}>
                         <TextField
                  sx={{
                    backgroundColor: "white",
                    // marginLeft: "10",
                    // marginRight: 5,
                    mx:{xs:5,sm:8,md:8},
                  }}
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
                    // marginLeft: "10",
                    // marginRight: 5,
                    mx:{xs:5,sm:8,md:8},
                  }}
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
                    // marginLeft: "10",
                    // marginRight: 5,
                    mx:{xs:5,sm:8,md:8},
                  }}
                  margin="normal"
                  type={"number"}
                  name="feesPerCunsaltation"
                //   value={value.feesPerCunsaltation}
                  size="small"
                //   // onChange={(e)=>setName(e.target.value)}
                //   onChange={handleChange}
                  label="Fees per consaltation"
                  variant="outlined"
                />
                <TextField
                  sx={{
                    backgroundColor: "white",
                    // marginLeft: "10",
                    // marginRight: 5,
                    mx:{xs:5,sm:8,md:8},
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
          </Box>
          <Box sx={{display:'flex',justifyContent:'center',mt:4}}>
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
      </form>
    </>
  );
};

export default ProfileEdit;
