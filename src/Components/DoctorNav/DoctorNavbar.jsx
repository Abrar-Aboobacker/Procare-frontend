import {
    AppBar,
    Box,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React from "react";
import { Link} from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { setDoctor } from "../../redux/DoctorSlice";
const DoctorNavbar = () => { 
  const dispatch = useDispatch()
      const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setDoctor(null))
      };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{ backgroundColor: "#E9FBFF",position: "sticky" }}
          elevation={2}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  // display:{xs:'none',sm:'block'},
                  color: "#FD810F",
                  marginTop: 2.5,
                }}
                variant="h5"
              >
                ProCare
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "2.25rem",
                  marginRight: 3,
                }}
              >
               <Link to='/doctor_notification'>
                <Typography
                  sx={{ color: "black",mt:1,cursor:"pointer" }}
                  variant="h6"
                  component="div"
                  
                >
                   <NotificationsIcon/>
                </Typography>
                </Link>
                <Typography onClick={handleLogout} sx={{ color: "black",mt:1,cursor:"pointer", }}>
                  <LogoutIcon/>
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default DoctorNavbar
