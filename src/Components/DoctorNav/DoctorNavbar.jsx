import {
    AppBar,
    Box,
    Button,
    Drawer,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import IconButton from "@mui/material/IconButton";
  import MenuIcon from "@mui/icons-material/Menu";
  
const DoctorNavbar = () => { 
      const [open, setOpen] = useState(false);                                                                                                                                                                                                                                  
      const handleCloseDrawer = () => {
        setOpen(false);
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
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default DoctorNavbar
