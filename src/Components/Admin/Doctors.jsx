import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/SideBar";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const Doctors = () => {
  const dispatch = useDispatch()
  const [doctor,setDoctor]=useState([])
  const [refresh, setRefresh] = useState(false);
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
  }, [refresh]);
  const BlockHandler =  async (doctorId)=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/admin/BlockingDoctor",
        {
          doctorId: doctorId
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setDoctor(response.data.data)
        setRefresh(!refresh)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  }
  const unBlockHadler = async (doctorId)=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/admin/unBlockingDoctor",
        {
          doctorId: doctorId
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setDoctor(response.data.data)
        setRefresh(!refresh)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  }
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
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {doctor&& doctor.map((value) => (
                        <TableRow key={value._id}>
                          <TableCell>{value.name}</TableCell>
                          <TableCell>{value.email}</TableCell>
                          <TableCell>{value?.phone}</TableCell>
                          <TableCell>{value.experience}</TableCell>
                          <TableCell>{value.isActive}</TableCell>
                          <TableCell>
                            { value.isActive==="Active"?
                            <Button
                            variant="contained"
                            color="error"
                            onClick={()=>BlockHandler(value._id)}
                          >
                            Block
                          </Button>
                            :
                            <Button
                            variant="contained"
                            color="success"
                            onClick={()=>unBlockHadler(value._id)}
                            
                          >
                            Unblock
                          </Button>
                           
                          }
                            
                          </TableCell>
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

