import React, { useState } from 'react'
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
import { toast } from 'react-hot-toast';
import axios from '../../axios/axios';
import { useNavigate } from 'react-router-dom';

const DoctorSignUp = () => {
  const navigate = useNavigate()
  // const [value,setvalue]=useState({
  //   name:"",
  //   email:"",
  //   phone:null,
  //   password:"",
  //   cpassword:""
  // })
  const [name , setName]=useState("")
  const [email , setEmail]=useState("")
  const [phone , setPhone]=useState("")
  const [password , setPassword]=useState("")
  const [cpassword , setcpassword]=useState("")
  const [about , setAbout]=useState("")
  const [filez,setFile] = useState(null);
 
  // console.log(filez+"ehaaaaa");
  const toBase64 = filez => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(filez);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
}).catch((err)=>{
  console.log(err)
})
  // const fileType=['application/pdf'];
  // const handleFileChange=(e)=>{
  //   let selectedFile=e.target.files[0];
  //   // if(selectedFile){
  //   //   if(selectedFile&&fileType.includes(selectedFile.type)){
  //   //     let reader = new FileReader();
  //   //         reader.readAsDataURL(selectedFile);
  //   //         reader.onloadend = (e) =>{
  //   //           // console.log(e.target.result + "ith enthaaaaa");
  //   //           setFile(e.target.result);     
  //   //         }
  //   //   }
  //   //   else{
  //   //     setFile(null);
  //   //     // setPdfFileError('Please select valid pdf file');
  //   //   }
  //   // }
  //   // else{
  //   //   console.log('select your file');
  //   // }
  //   setFile(e.target.files[0])
  // }
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setvalue((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  const handleSignup = async (e)=>{
    e.preventDefault();
    if(
      // value.name===""||
      // value.password===""||
      // value.phone===""||
      // value.email===""
      name===""
    ){
      toast.error("All fields required");
    }else{
    try {
      const imgBase = await toBase64(filez)
      console.log(imgBase+"podaaaaaaaa");
      const response = await axios.post("/doctor/doctor_signup",{
        // value,file:imgBase
        name:name,
        email:email,
        password:password,
        cpassword:cpassword,
        phone:phone,
        file:imgBase,
        about:about
      })
      if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem("token", response.data.data)
        navigate('/login')
      }else{
        console.log("heree");
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error("something went wrong" )
    }
  }
  }


  return (
    <div>
    <form action="">
      <Box
        sx={{
          backgroundColor: "#F5FCFF",
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: 0,
          padding: 3,
          height:"80vh",
          borderRadius: 5,
          boxShadow: "5px 5px 10px #ccc ",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc ",
          },
        }}
      >
        <Typography variant="h4" padding={3} textAlign="center">
          Signup
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"text"}
              name="name"
              value={name}
              size="small"
              onChange={(e)=>setName(e.target.value)}
              // onChange={handleChange}
              label="Full Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              name='email'
              type={"email"}
              size="small"
              onChange={(e)=>setEmail(e.target.value)}
              // onChange={handleChange}
              value={email}
              label="email"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              name='phone'
              size="small"
              value={phone}
              // onChange={handleChange}
              onChange={(e)=>setPhone(e.target.value)}
              type={"tel"}
              label="Phone No"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              focused
              margin="normal"
              // accept= 'image/*'
              type="file"
              size="small"
              onChange={(e)=>setFile(e.target.files[0])}
              label="upload your Certificate"
              variant="outlined"
            /> 
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              value={password}
              // onChange={handleChange}
              onChange={(e)=>setPassword(e.target.value)}
              type={"password"}
              name="password"
              size="small"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"password"}
              name='cpassword'
              size="small"
              // value={value.cpassword}
              // onChange={handleChange}
              value={cpassword}
              onChange={(e)=>setcpassword(e.target.value)}
              label="Confirm Password"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              multiline
               maxRows={5}
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"text"}
              value={about}
              onChange={(e)=>setAbout(e.target.value)}
              label="Write About Your Self"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={handleSignup}
          color="warning"
          sx={{ marginTop: 3, borderRadius: 3 }}>
          SignUp
        </Button>
      </Box>
    </form>
  </div>
  )
}

export default DoctorSignUp
