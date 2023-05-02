import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from "../AdminSidebar/SideBar";
import axios from "../../axios/axios";
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
const Users = () => {
  const dispatch = useDispatch()
  const [user,setUser]=useState([])
  const [refresh, setRefresh] = useState(false);
  const getUser =async () =>{
    try {
      const response = await axios.get("admin/getAllUsers",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
      })
      if(response.data.success){
        setUser(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
   useEffect(() => {
    getUser();
  }, [refresh]);
  const BlockHandler =  async (userId)=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/admin/BlockingUser",
        {
          userId: userId
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
        setUser(response.data.data)
        setRefresh(!refresh);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  }
  const unBlockHadler = async (userId)=>{
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/admin/unBlockingUser",
        {
          userId: userId
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
        setUser(response.data.data)
        setRefresh(!refresh);
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
             User List
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                {user && user.length > 0 ? (
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone No</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user&& user.map((value) => (
                        <TableRow key={value._id}>
                          <TableCell>{`${value.fName }  ${value.lName}`}</TableCell>
                          <TableCell>{value.email}</TableCell>
                          <TableCell>{value?.phone}</TableCell>
                          <TableCell>
                            { value.isActive==true?
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
                      Currently there is no Users
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

export default Users
