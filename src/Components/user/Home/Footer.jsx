import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#E9FBFF" }}>
        <Box sx={{ display: "flex", justifyContent: "space-around",flexWrap:'wrap' }}>
          <Box>
            <Typography
              sx={{ color: "#FD810F", fontSize: 35, fontWeight: 500, mt: 7,mr:{xs:7.5,sm:0} }}
            >
              Procare
            </Typography>
            <Typography
              sx={{ color: "#0D369F", fontSize: 15, fontWeight: 500 }}
            >
              Care like Pro
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{ color: "#0D369F", fontSize: 30, fontWeight: 600, mt:{xs:3,sm:7},ml:{xs:6,sm:0} }}
            >
              Quick Links
            </Typography>
            <List component="nav" aria-label="simple list" sx={{ml:{xs:5,sm:0}}}>
              <ListItem >
                <ListItemText primary="Doctors" />
              </ListItem>
              <ListItem >
                <ListItemText primary="Creators" />
              </ListItem>
              <ListItem >
                <ListItemText primary='About Us'/>
              </ListItem>
              <ListItem >
                <ListItemText primary='Services'/>
              </ListItem>
              <ListItem >
                <ListItemText primary='Booking'/>
              </ListItem>
            </List>
          </Box>
          <Box>
          <Typography
              sx={{ color: "#0D369F", fontSize: 30, fontWeight: 600, mt: 7 }}
            >
              Our Services
            </Typography>
            <List component="nav" aria-label="simple list">
              <ListItem >
                <ListItemText primary="Primary Care" />
              </ListItem>
              <ListItem >
                <ListItemText primary="Children's Care" />
              </ListItem>
              <ListItem >
                <ListItemText primary='Mental Care'/>
              </ListItem>
              <ListItem >
                <ListItemText primary='Urgent Care'/>
              </ListItem>
              <ListItem >
                <ListItemText primary='Lifestyle Care'/>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
