import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/AdminSidebar/SideBar'
import axios from '../../axios/axios'
import { toast } from 'react-hot-toast'
import moment from 'moment'
const AppointmentHistory = () => {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
      const [appointments, setAppointments] = useState([]);
      useEffect(() => {
        axios
          .get(`/admin/getAllAppointments`,  {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
            },
          })
          .then((response) => {
            if (response.data.success) {
              setAppointments(response.data.appointments);
            //   setCurrentPage(response.data.currentPage);
            //   setTotalPages(response.data.totalPages);
            } else {
              toast.error(response.data.error);
            }
          });
      }, []);
  return (
    <>
       <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
            Appointment List
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                {appointments && appointments.length > 0 ? (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>Doctor Name</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell>Appoitment Date</TableCell>
                        <TableCell>Appoitment Time</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointments.map((value) => (
                        <TableRow 
                        key={value?._id}
                        >
                          <TableCell>{value?.doctor?.name}</TableCell>
                          <TableCell>{value?.client?.fName}</TableCell>
                          <TableCell>{moment(value.date).format("DD-MM-YYYY")}</TableCell>
                          <TableCell>{value?.time}</TableCell> 
                          <TableCell>{value?.status}</TableCell> 
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
  )
}

export default AppointmentHistory
