import { Box, Paper, styled, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/SideBar";
import GroupsIcon from '@mui/icons-material/Groups';
import axios from "../../axios/axios"
import { toast } from "react-hot-toast";
const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const Dashboard = () => {
  const [patients, setPatients] = useState("");
  const [doctors, setDoctors] = useState("");
  const [totalAppointments, setTotalAppointments] = useState("");
  const [salesReport, setSalesReport] = useState([]);
  useEffect(() => {
    axios
      .get("/admin/getAdminDashboardDetails", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result.success) {
          setPatients(result.totalPatients);
          setDoctors(result.totalDoctors);
          setTotalAppointments(result.totalAppointments);
          setSalesReport(result.salesReport);
        } else {
          toast.error(result.message);
        }
      });
  },[]);
  return (
    <>
     <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       <Box>
        <Typography variant="h4" sx={{ml:10,mt:5}}>Dashboard</Typography>
        <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",mt:5}}>
          <Box sx={{display:'flex',alignContent:"center", backgroundColor:'#dbdbdb',px:7,py:4,borderRadius:8,":hover":{backgroundColor:'#f2d8e7'},my:5}}>
            <Box>
          <GroupsIcon sx={{fontSize:70,ml:-6}}/>
          </Box>
          <Box sx={{ml:5}}>
          <Typography variant="h5" sx={{fontWeight:500}}>Total Users</Typography>
          <Typography variant="h6" align={'center'}>{patients}</Typography>
          </Box>
          </Box>
          <Box sx={{display:'flex',alignContent:"center", backgroundColor:'#dbdbdb',px:7,py:4,borderRadius:8,":hover":{backgroundColor:'#f2d8e7'},my:5}}>
            <Box>
          <GroupsIcon sx={{fontSize:70,ml:-6}}/>
          </Box>
          <Box sx={{ml:5}}>
          <Typography variant="h5" sx={{fontWeight:500}}>Total Doctors</Typography>
          <Typography variant="h6" align={'center'}>{doctors}</Typography>
          </Box>
          </Box>
          <Box sx={{display:'flex',alignContent:"center", backgroundColor:'#dbdbdb',px:7,py:4,borderRadius:8,":hover":{backgroundColor:'#f2d8e7'},my:5}}>
            <Box>
          <GroupsIcon sx={{fontSize:70,ml:-6}}/>
          </Box>
          <Box sx={{ml:5}}>
          <Typography variant="h5" sx={{fontWeight:500}}>Total Appointments</Typography>
          <Typography variant="h6" align={'center'}>{totalAppointments}</Typography>
          </Box>
          </Box>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <TableContainer stickyHeader aria-label="sticky table">
                {salesReport && salesReport.length > 0 ? (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>Month</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Sales</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                       {salesReport&& salesReport.map((value) => ( 
                         <TableRow key={value._id}
                         >
                         <TableCell>{value.month}</TableCell>
                          <TableCell>{value.year}</TableCell>
                          <TableCell>{value?.totalsales}</TableCell>
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
              </TableContainer>
            </TableContainer>
          </Paper>
       </Box>
      </Box>
      </Box>
    </>
  );
};

export default Dashboard;
