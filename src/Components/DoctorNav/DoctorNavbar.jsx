import {
    AppBar,
    Box,
    Button,
    Drawer,
    Menu,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import IconButton from "@mui/material/IconButton";
  import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { setDoctor } from "../../redux/DoctorSlice";
const DoctorNavbar = () => { 
  const dispatch = useDispatch()
  const navigate = useNavigate()
      const [open, setOpen] = useState(false);                                                                                                                                                                                                                                  
      const handleCloseDrawer = () => {
        setOpen(false);
      };
      const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setDoctor(null))
        // navigate("/Doctor_login")
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
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
              >
                <Button onClick={() => setOpen(true)}>
                  <MenuIcon sx={{ color: "#000000" }} />
                </Button>
                <Drawer anchor="left" open={open} onClose={handleCloseDrawer}>
                  <Box
                    role="presentation"
                    onClick={handleCloseDrawer}
                    onKeyDown={handleCloseDrawer}
                    marginTop={4}
                    marginLeft={2}
                    gap={333}
                    sx={{ width: 200 }}
                  >
                    <Typography variant="h6" margin={2}>
                      Doctors
                    </Typography>
                    <Typography variant="h6" margin={2}>
                      Notification
                    </Typography>
                    <Typography variant="h6" margin={2}>
                      About Us
                    </Typography>
                    <Typography>hy</Typography>
                    <Typography>hy</Typography>
                  </Box>
                </Drawer>
              </IconButton>
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
                  display: { sm: "flex", xs: "none" },
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
