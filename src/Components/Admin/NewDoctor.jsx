import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/SideBar";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "../../axios/axios";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const NewDoctor = () => {
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const [doctor, setDoctor] = useState([]);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();
  const getDoctor = async () => {
    try {
      const response = await axios.get(
        "/admin/getNewDoctors",
        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
          },
        }
      );

      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);
  const acceptHandler = async (doctorId) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/admin/approvingDoctor",
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
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const modalHandler = (userId) => {
    setSelectedUserId(userId);
    setOpen(true);
  };
  const rejectHandler = async (doctorId) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/admin/rejectDoctor",
        { doctorId: doctorId,reason: reason },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("admintoken"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
            New Doctors List
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
                        <TableCell>Status</TableCell>
                        <TableCell>Document</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {doctor.map((value) => (
                        <TableRow key={value._id}>
                          <TableCell>{value.name}</TableCell>
                          <TableCell>{value.email}</TableCell>
                          <TableCell>{value?.phone}</TableCell>
                          <TableCell>{value?.isActive}</TableCell>
                          <TableCell>
                            <Link to={`http://localhost:3001/${value.file}`}>
                              link to document
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="success"
                              sx={{ marginRight: 2 }}
                              onClick={() => acceptHandler(value._id)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              sx={{ marginRight: 2 }}
                              onClick={() => modalHandler(value._id)}
                              // onClick={(e) => setOpen(true)}
                            >
                              Reject
                            </Button>
                            <StyledModal
                              open={open}
                              onClose={(e) => setOpen(false)}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box
                                width={400}
                                height={280}
                                bgcolor={"background.default"}
                                color={"text.primary"}
                                p={3}
                                borderRadius={5}
                              >
                                <Typography
                                  variant="h6"
                                  color="gray"
                                  textAlign="center"
                                  marginBottom={3}
                                >
                                  what is the reason for the application
                                  rejection
                                </Typography>
                                <TextField
                                  type="text"
                                  value={reason}
                                  onChange={(e) => setReason(e.target.value)}
                                  fullWidth
                                  size="small"
                                  sx={{ backgroundColor: "white" }}
                                  label="enter reason"
                                  variant="outlined"
                                />
                                <Box
                                  display={"flex"}
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                  marginTop={3}
                                >
                                  <Button
                                    variant="contained"
                                    color="inherit"
                                    onClick={() => {
                                      rejectHandler(selectedUserId);
                                      setSelectedUserId(null);
                                      setOpen(false);
                                    }}
                                  >
                                    Submit
                                  </Button>
                                </Box>
                              </Box>
                            </StyledModal>
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

export default NewDoctor;
