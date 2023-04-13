import {
  AppBar,
  Box,
  Button,
  Drawer,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
const {user} = useSelector((state)=>state.user)
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
console.log(user);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
        <AppBar
          sx={{ backgroundColor: "#E9FBFF",position: "sticky" }}
          elevation={0}
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
                gap: "1.25rem",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: { sm: "flex", xs: "none" },
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "2.25rem",
                  marginRight: 5,
                }}
              >
                <Link to={'/doctors'}>
                <Typography
                  sx={{ color: "#1959FD",cursor: "pointer"}}
                  variant="h6"
                  component="div"
                  // onClick={()=>navigate('/doctors')}
                >
                  Doctors
                </Typography>
                </Link>
                <Typography
                  sx={{ color: "#1959FD" }}
                  variant="h6"
                  component="div"
                >
                 About Us
                </Typography>
                <Typography
                  sx={{ color: "black" }}
                  variant="h6"
                  component="div"
                >
                   <NotificationsIcon/>
                </Typography>
                {/* <Typography sx={{color:'#1959FD'}} variant="h6" component="div" >
            Photos
          </Typography>
          <Typography sx={{color:'#1959FD'}} variant="h6" component="div" >
            Photos
          </Typography> */}
              </Box>
          {user&& user?(
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="black"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </Box>
          ):(<Box>
            <Typography onClick={handleMenu} sx={{color:'#1959FD'}}>Login</Typography>
            <Menu
                  id="menu-appba"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem  onClick={handleClose}><Link to={'/user_login'}>User Login</Link></MenuItem>
                  <MenuItem onClick={handleClose}><Link to={'/doctor_login'}>Doctor Login</Link></MenuItem>
                </Menu>
          </Box>
          )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
