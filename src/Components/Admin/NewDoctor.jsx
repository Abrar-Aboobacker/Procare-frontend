import React, { useEffect, useState } from 'react'
import Sidebar from "../AdminSidebar/SideBar";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/axios'
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { setAdmin } from '../../redux/AdminSlice';
import Tables from '../Tables';









const NewDoctor = () => {
    const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const [doctor,setDoctor]=useState('')

console.log(doctor)
  //table 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


const getDoctor = async () => {
   try {
      const response = await axios.get('/admin/getNewDoctors', {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('admintoken')}`
         }
      });
      
      if (response.data.success) {
         setDoctor(response.data.data)
      }
   } catch (error) {
      console.log(error);
   }
};

useEffect(() => {
   getDoctor();
}, []);

  return (
    <>
       <Box sx={{ display: 'flex' }}>
      <Sidebar />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant='h5' sx={{marginBottom:5,fontWeight:500}}>
          New Doctors List
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
             <TableCell>
              Full Name
             </TableCell>
             <TableCell>
              Email
             </TableCell>
             <TableCell>
              Phone No
             </TableCell>
             <TableCell>
              Document
             </TableCell>
             <TableCell>
              Action
             </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctor&& doctor.map((value)=>{
              return(
              <TableRow key={doctor.id}>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.email}</TableCell>
                <TableCell>{value?.phone}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell><Button variant="contained" color='success' sx={{marginRight:2}} >Accept</Button><Button variant="contained" color='error' sx={{marginRight:2}}>Reject</Button></TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
       
      </Box>
      </Box>
    </>
  )
}

export default NewDoctor
