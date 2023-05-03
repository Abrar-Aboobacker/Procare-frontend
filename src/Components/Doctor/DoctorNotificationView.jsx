import { TabContext, TabPanel } from '@mui/lab'
import { Box, Button, Paper, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from '../../axios/axios'
import { toast } from 'react-hot-toast'
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import { useDispatch } from 'react-redux'
import { setDoctor } from '../../redux/DoctorSlice'
const DoctorNotificationView = () => {
    const paperStyle = { width: "100%", margin: "20px auto", border: "none" };
    const dispatch = useDispatch()
    const [value, setValue] = useState("0");
    const [notification, setNotification] = useState([]);
    const [seenNotification, setseenNotification] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const handleChange = (event, value) => {
        setValue(value);
      };
      const getAllnotification = async () => {
        const response = await axios.get("/doctor/getAllnotification", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        if (response.data.success) {
          setNotification(response.data.doctorNotifications);
          setseenNotification(response.data.doctorSeenNotification);
        } else {
          toast.error(response.data.message);
        }
      };
      useEffect(() => {
        getAllnotification();
      }, [refresh]);
      const handleMarkAllRead = async () => {
        try {
        //   dispatch(showLoading());
          const response = await axios.post(
            "doctor/markAllNotification",{},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
        //   dispatch(hideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
            dispatch(setDoctor(response.data.data));
            setRefresh(!refresh);
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
            "doctor/deleteNotification",{},
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          dispatch(hideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
           dispatch(setDoctor(response.data.data));
            setRefresh(!refresh);
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
                  <Button 
                  onClick={handleMarkAllRead}
                  >Mark All Read</Button>
                </Box>
                {notification?.length !== 0 ? (
                   notification.map((notificationMgs) => ( 
                    <>
                    <Box sx={{ cursor: "pointer"}}>
                      <Box
                      sx={{mb:2,display:'flex',justifyContent:'center',marginY:4}}
                        // onClick={() => navigate(notificationMgs.onClickPath)}
                      > <Typography>            
                     {notificationMgs.message}        
                     </Typography>
                      </Box>
                    </Box>
                    <Box></Box>
                    </>
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
                  <Button 
                  onClick={handleDelete}
                  >Delete All</Button>
                </Box>
                {seenNotification.length !==0 ? (
                 seenNotification.map((notificationMgs) => ( 
                    <Box sx={{ cursor: "pointer"}}>
                    <Box
                    sx={{mb:2,display:'flex',justifyContent:'center',marginY:4}}
                      // onClick={() => navigate(notificationMgs.onClickPath)}
                    > <Typography>            
                   {notificationMgs.message}        
                   </Typography>
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
      <section></section>
    </>
  )
}

export default DoctorNotificationView
