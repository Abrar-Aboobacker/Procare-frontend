import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/SideBar";
import axios from "../../axios/axios";
const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const Doctors = () => {
  const [doctor,setDoctor]=useState([])
  const getDoctor =async () =>{
    try {
      const response = await axios.get("admin/getAllDoctors",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      })
      if(response.data.success){
        setDoctor(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getDoctor();
  }, []);
  const blockHandler =  ()=>{}
  return (
    <>
     <Box sx={{ display: 'flex' }}>
      <Sidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
             Doctors List
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                {doctor && doctor.length > 0 ? (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone No</TableCell>
                        <TableCell>Experience</TableCell>
                        {/* <TableCell>Action</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {doctor&& doctor.map((value) => (
                        <TableRow key={value._id}>
                          <TableCell>{value.name}</TableCell>
                          <TableCell>{value.email}</TableCell>
                          <TableCell>{value?.phone}</TableCell>
                          <TableCell>{value.experience}</TableCell>
                          {/* <TableCell>
                            {doctor&& doctor.isActive==="active"?(
                            <Button
                            variant="contained"
                            color="error"
                          >
                            Block
                          </Button>
                            ):
                            <Button
                            variant="contained"
                            color="success"
                           
                            
                          >
                            Unblock
                          </Button>
                           
                          }
                            
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </TableBody>
                  </>
                ) : (
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography fontWeight={400} variant="h6">
                      Currently there is no new application for doctor
                    </Typography>
                  </Box>
                )}
              </Table>
            </TableContainer>
          </Paper>
       
      </Box>
      </Box>
    </>
  );
};

export default Doctors;

