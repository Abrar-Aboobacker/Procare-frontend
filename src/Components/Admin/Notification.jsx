import {
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/SideBar";
import { TabContext, TabPanel } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
import axios from "../../axios/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../../redux/AdminSlice";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {admin}= useSelector((state)=>state.admin)

  const [value, setValue] = useState("0");
  // const [admin, setAdmin] = useState([]);
  const [notification, setNotification] = useState([]);
  const [seenNotification, setseenNotification] = useState([]);
  const handleChange = (event, value) => {
    setValue(value);
  };

  // useEffect(() => {
  //   try {
  //     dispatch(showLoading());
  //     axios
  //       .post(
  //         "/admin/adminInfo",
  //         { admintoken: localStorage.getItem("admintoken") },
  //         {
  //           headers: {
  //             Authorization: "Bearer " + localStorage.getItem("admintoken"),
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         if (response.data.success) {
  //           setAdmin(response.data.data);
  //         } else {
  //           dispatch(hideLoading());
  //           console.log("here");
  //           toast.error("please login first");
  //           navigate("/admin_login");
  //           localStorage.clear();
  //         }
  //       });
  //     dispatch(hideLoading());
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(hideLoading());
  //     navigate("/admin_login");
  //     localStorage.clear();
  //   }
  // }, []);
  const getAllnotification = async () => {
    const response = await axios.get("/admin/getAllnotification", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
      },
    });

    if (response.data.success) {
      setNotification(response.data.adminNotifications);
      setseenNotification(response.data.adminSeenNotification);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    getAllnotification();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "admin/markAllNotification",
        {
          adminId: admin._id,
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
        setAdmin(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "admin/deleteNotification",
        {
          adminId: admin._id,
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
        setAdmin(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("something went wrong");
    }
  };
  const paperStyle = { width: "100%", margin: "20px auto", border: "none" };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <TabContext value={value}>
            <Paper elevation={0} style={paperStyle}>
              <Box display={"flex"} justifyContent={"space-around"}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                >
                  <Tab value="0" label="Unread" />

                  <Tab value="1" label="Read" />
                </Tabs>
              </Box>
              <TabPanel
                sx={{ padding: 0, marginTop: "0", borderRadius: 5 }}
                value="0"
              >
                <Box display={"flex"} justifyContent={"end"}>
                  <Button onClick={handleMarkAllRead}>Mark All Read</Button>
                </Box>
                {notification.length !== 0 ? (
                  notification.map((notificationMgs) => (
                    <Box sx={{ cursor: "pointer" }}>
                      <Box
                        onClick={() => navigate(notificationMgs.onClickPath)}
                      >
                        {notificationMgs.message}
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{display:"flex",justifyContent:'center',marginY:15}}>
                    <Typography variant="h6"sx={{fontSize:30}}>
                      Notification Empty
                    </Typography>
                  </Box>
                )}
              </TabPanel>
              <TabPanel
                sx={{ padding: 0, marginTop: "0", borderRadius: 5 }}
                value="1"
              >
                <Box display={"flex"} justifyContent={"end"}>
                  <Button onClick={handleDelete}>Delete All</Button>
                </Box>
                {seenNotification.length !==0 ? (
                  seenNotification.map((notificationMgs) => (
                    <Box sx={{ cursor: "pointer" }}>
                      <Box
                        onClick={() => navigate(notificationMgs.onClickPath)}
                      >
                        {notificationMgs.message}
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{display:"flex",justifyContent:'center',marginY:15}}>
                  <Typography variant="h6"sx={{fontSize:30}}>
                    Notification Empty
                  </Typography>
                </Box>
                )}
              </TabPanel>
            </Paper>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default Notification;
