import {
  Avatar,
  Box,
  Button,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import axios from "../../../axios/axios";
import { baseURL } from "../../../constants/constant";
import robot from "../../../Assets/robot.gif";
import { useSelector } from "react-redux";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Picker from "emoji-picker-react";
import "./UserChat.css";
const UserChat = () => {
  const { user } = useSelector((state) => state.user);
  const [doctorLists, setDoctorLists] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    console.log(currentChat);
    axios
      .get("/getChatContacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          setDoctorLists(response.data.data);
        }
      });
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };
  const handleSendMessage = async (message) => {
    alert(message)
  };
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = ( emoji) => {
    console.log(emoji);
    setMsg((prevInput) => prevInput + emoji.emoji);
    setShowEmojiPicker(false)
  };
  const sendChat = (event)=>{
    event.preventDefault();
    if(msg.length>0){
        handleSendMessage(msg)
        setMsg('')
    }
  }
  return (
    <>
      <Navbar />
      <Box>
        <Box sx={{ display: { xs: "block", sm: "flex" } }}>
          <Box sx={{ mt: 5, ml: 3, mb: 2 }}>
            <Profile />
          </Box>
          <Box sx={{ mt: 5, ml: 3, mb: 2, width: "70%" }}>
            <div>
              <Grid container>
                <Divider />
                {/* <Grid item xs={12}>
                    <Box sx={{display:"flex",justifyContent:'center',gap: "2.25rem",}}>
                  <Typography variant="h5" className="header-message">
                    {doctorLists[0]?.name}
                  </Typography>
                  <Avatar
                            alt="Remy Sharp"
                            src={ `${baseURL}${doctorLists[0]?.profile}`}
                          />
                  </Box>
                </Grid> */}
              </Grid>
              <Grid
                container
                component={Paper}
                sx={{ width: "100%", height: "600px" }}
              >
                <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
                  <List>
                    <ListItem button key="RemySharp">
                      <ListItemIcon>
                        <Avatar
                          alt="Remy Sharp"
                          src="https://material-ui.com/static/images/avatar/1.jpg"
                        />
                      </ListItemIcon>
                      <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                  </List>
                  <Divider />
                  <Grid item xs={12} style={{ padding: "10px" }}>
                    <TextField
                      id="outlined-basic-email"
                      label="Search"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Divider />
                  <List>
                    {doctorLists.map((doctor, index) => (
                      <ListItem
                        button
                        onClick={() => changeCurrentChat(index, doctor)}
                        key={index}
                        sx={{
                          backgroundColor:
                            index === currentSelected ? "#e1e3e6" : "white",
                          ":hover": {
                            backgroundColor:
                              index === currentSelected ? "white" : "#e1e3e6",
                          },
                        }}
                      >
                        <ListItemIcon>
                          <Avatar
                            alt="Remy Sharp"
                            src={`${baseURL}${doctor?.profile}`}
                          />
                        </ListItemIcon>
                        <ListItemText primary={doctor.name}></ListItemText>
                        <ListItemText
                          //   secondary="online"
                          align="right"
                        ></ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={9}>
                  <Divider />
                  <Box sx={{ display: "flex", gap: "2.25rem", m: 2 }}>
                    {currentChat === undefined ? (
                      <Box></Box>
                    ) : (
                      <>
                        <Avatar src={`${baseURL}${currentChat?.profile}`} />
                        <Typography variant="h5" className="header-message">
                          {currentChat?.name}
                        </Typography>
                      </>
                    )}
                    {/* <Avatar
                      
                      src={`${baseURL}${currentChat?.profile}`}
                    /> */}
                  </Box>
                  <Divider />
                  <List sx={{  height:currentChat ===undefined? "550px":"420px", overflowY: "auto" }}>
                    {currentChat === undefined ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img
                          style={{height: "350px" }}
                          src={robot}
                          alt="Robot"
                        />
                        <Typography>
                          welcome{" "}
                          <Box sx={{ fontWeight: 500 }} component="span">
                            {user?.fName} {user?.lName}!
                          </Box>
                        </Typography>
                        <Typography>
                          Please Select Your Doctor to Start Chat
                        </Typography>
                      </Box>
                    ) : (
                      <>
                        <ListItem key="1">
                          <Grid container>
                            <Grid item xs={12}>
                              <ListItemText
                                align="right"
                                primary="Hey man, What's up ?"
                              ></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align="right"
                                secondary="09:30"
                              ></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem key="2">
                          <Grid container>
                            <Grid item xs={12}>
                              <ListItemText
                                align="left"
                                primary="Hey, Iam Good! What about you ?"
                              ></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align="left"
                                secondary="09:31"
                              ></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>
                        <ListItem key="3">
                          <Grid container>
                            <Grid item xs={12}>
                              <ListItemText
                                align="right"
                                primary="Cool. i am good, let's catch up!"
                              ></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                              <ListItemText
                                align="right"
                                secondary="10:30"
                              ></ListItemText>
                            </Grid>
                          </Grid>
                        </ListItem>
                      </>
                    )}
                  </List>
                  <Divider />
                  {currentChat === undefined?(
                    <Box></Box>
                  ):(
                    <form onSubmit={(e)=>sendChat(e)}>
                    <Grid container style={{ padding: "20px" }}>
                      <Box sx={{ mt: 1, mr: 1, position: "relative" }}>
                        <SentimentSatisfiedAltIcon
                          sx={{ mt: 1 }}
                          onClick={handleEmojiPickerHideShow}
                        />
                        {showEmojiPicker && (
                            <Box sx={{position: "absolute",
                                top: "-500px"}}>
                          <Picker onEmojiClick={handleEmojiClick} />
                          </Box>
                        )}
                      </Box>
                      <Grid xs={10}>
                        <TextField
                          id="outlined-basic-email"
                          label="Type Something"
                          fullWidth
                          value={msg}
                          onChange={(e) => setMsg(e.target.value)}
                        />
                      </Grid>
                      <Grid xs={1} align="right">
                        <Button
                        name="submit"
                        type="submit"
                          sx={{
                            backgroundColor: "#e6e6e6",
                            mt: 1,
                            ml: 1,
                            borderRadius: 2,
                            ":hover": {
                              color: "#e6e6e6",
                              backgroundColor: "#1976d2",
                            },
                          }}
                          color="primary"
                          aria-label="add"
                        >
                          <SendIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  )}
                 
                </Grid>
              </Grid>
            </div>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UserChat;
