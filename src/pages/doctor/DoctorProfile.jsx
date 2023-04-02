import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, styled, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Sidebar from '../../Components/sidebar/Sidebar'
import {CameraAlt, Height, Padding} from '@mui/icons-material';
import { positions } from '@mui/system';
import axios from '../../axios/axios'
import { red } from '@mui/material/colors';
import { useSelector } from 'react-redux';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DoctorProfile =  () => {
  const {doctor}=useSelector((state)=>state.doctor)
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
  return (
    <>
       <Box sx={{ display: 'flex' }}>
      <Sidebar/>
     
      <Box component="main" sx={{ flexGrow: 1, }}>
        <DrawerHeader />
        <Box sx={{display:'flex',backgroundColor:"#E9FBFF",height:"100vh"}}>
          <Box sx={{marginTop:5}}>
        <Card elevation={0} sx={{ maxWidth:400,width:400 ,backgroundColor:"#E9FBFF"  }}>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Avatar sx={{height:200,width:200}}  src="/broken-image.jpg" />
          </Box>
          
      <CardContent>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:2}}>
      <Button variant="contained" color='warning' sx={{marginBottom:2}}>Edit Profile<  CameraAlt sx={{marginLeft:2,color:'white'}}/> </Button>
          </Box>
       
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Typography variant="h5" color="text.secondary">
          {doctor?.name}
        </Typography>
          </Box>
        
      </CardContent>
    </Card>
    </Box>
   <Box sx={{marginLeft:"6.25rem",marginTop:5}}>
   <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
         
        >
          
          <Grid  item xs={6}>
            <TextField
              sx={{ backgroundColor: "white",marginLeft:"10"}}
              margin="normal"
              type={"text"}
              name="name"
              // value={name}
              size="small"
              // onChange={(e)=>setName(e.target.value)}
              // onChange={handleChange}
              label="Full Name"
              variant="outlined"
            />
          </Grid>
          <Grid  item xs={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              name='email'
              type={"email"}
              size="small"
              
              // onChange={(e)=>setEmail(e.target.value)}
              // onChange={handleChange}
              // value={email}
              label="email"
              variant="outlined"
            />
          </Grid>
          <Grid  item xs={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              name='phone'
              size="small"
              // value={phone}
              // onChange={handleChange}
              // onChange={(e)=>setPhone(e.target.value)}
              type="tel"
              label="Phone No"
              variant="outlined"
            />
          </Grid>
          <Grid  item xs={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              // accept= 'image/*'
            
              size="small"
              // onChange={(e)=>setFile(e.target.files[0])}
              label="upload your Certificate"
              variant="outlined"
            /> 
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              // value={password}
              // onChange={handleChange}
              // onChange={(e)=>setPassword(e.target.value)}
              type={"password"}
              name="password"
              size="small"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid  item xs={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"password"}
              name='cpassword'
              size="small"
              // value={value.cpassword}
              // onChange={handleChange}
              // value={cpassword}
              // onChange={(e)=>setcpassword(e.target.value)}
              label="Confirm Password"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Box sx={{display:"flex",justifyContent: 'center', width:"75%"}}>
          
        <Button
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
  )
}

export default DoctorProfile
