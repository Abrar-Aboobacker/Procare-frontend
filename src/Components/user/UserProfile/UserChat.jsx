import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState, useRef } from "react";
import Profile from "./Profile";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";
import { baseURL } from "../../../constants/constant";
import robot from "../../../Assets/robot.gif";
import { useSelector } from "react-redux";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Picker from "emoji-picker-react";
import axios from "../../../axios/axios";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import MenuIcon from "@mui/icons-material/Menu";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "end",
  justifyContent: "start",
  
});
const UserChat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [doctorLists, setDoctorLists] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const scrollRef = useRef();
  useEffect(() => {
    if (!localStorage.getItem("usertoken")) {
      navigate("/user_login");
      toast.error("You need to login first");
    }
  });
  useEffect(() => {
    if (user) {
      socket.current = io(baseURL);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);
  useEffect(() => {
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
  const getAllMessages = async () => {
    if (currentChat) {
      const response = await axios.post("/message/getAllMessages", {
        from: user._id,
        to: currentChat._id,
      });
      console.log(response);
      if (response.data.success) {
        setMessages(response.data.projectedMessages);
      }
    }
  };
  useEffect(() => {
    getAllMessages();
    // eslint-disable-next-line
  },[currentChat]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  const changeCurrentChat = (index, contact) => {
    setOpen(false)
    setCurrentSelected(index);
    handleChatChange(contact);
  };
  const handleSendMessage = async (msg) => {
    await axios.post("/message/addMessage", {
      from: user._id,
      to: currentChat._id,
      messages: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: user._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
      time: moment(Date().toLocaleString()).format("LLL"),
    });
    setMessages(msgs);
  };
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  const handleEmojiClick = (emoji) => {
    setMsg((prevInput) => prevInput + emoji.emoji);
    setShowEmojiPicker(false);
  };
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };
  return (
    <>
      <Navbar />
      <Box>
        <Box sx={{ display: { xs: "block", sm: "block", md: "flex" } }}>
          <Box sx={{ mt: 5, ml: 3, mb: 2 }}>
            <Profile />
          </Box>
          <Box
            sx={{
              mt: 5,
              ml: { xs: 1, sm: 3 },
              mb: 2,
              // mx:{xs:3},
              width: { xs: "99%", sm:"95%",md:"70%", },
              // display: "flex",
            }}
          >
            <div>
              <Grid
              xs={12}
                container
                component={Paper}
                sx={{
                  width: "100%",
                  height: { xs: "100%", sm: "600px" },
                  maxHeight: "600px",
                }}
              >
                <Grid
                  size="small"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 1, display: { xs: "block", sm: "none", } }}
                  xs={1}
                >
                  <Button id="drawer-container" onClick={() => setOpen(true)}>
                    <MenuIcon sx={{ color: "#000000" }} />
                  </Button>
                  <StyledModal
                    open={open}
                    onClose={(e) => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box
                      width={200}
                      height={480}
                      bgcolor={"background.default"}
                      color={"text.primary"}
                      p={3}
                      borderRadius={1}
                    >
                      <Typography variant="h5" sx={{p:2}}>
                        ChatList
                      </Typography>
                      <Grid
                    item
                    xs={12}
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
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
                    </Box>
                  </StyledModal>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={4}
                  md={4.5}
                  lg={3.5}
                  sx={{
                    borderRight: "1px solid #e0e0e0",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Divider />
                  <Grid
                    item
                    xs={12}
                    style={{
                      padding: "10px",
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
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
                <Grid item xs={10} sm={8} md={7.5} lg={8.5} >
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      gap: "2.25rem",
                      m: 2,
                      borderRight: "1px solid #e0e0e0",
                    }}
                  >
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
                  </Box>
                  <Divider />
                  <List
                    sx={{
                      height: currentChat === undefined ? "550px" : "420px",
                      overflowY: "auto",
                    }}
                  >
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
                          style={{ height: "350px" }}
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
                        {Array.isArray(messages) &&
                          messages.map((message) => {
                            return (
                              <ListItem key="1">
                                <Grid ref={scrollRef} key={uuidv4()} container>
                                  <Grid item xs={12}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: message.fromSelf
                                          ? "flex-end"
                                          : "flex-start",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          backgroundColor: message.fromSelf
                                            ? "#fcfbd4"
                                            : "#f2f2f2",
                                          pt: 1,
                                          pb: 1,
                                          pr: 3,
                                          pl: 3,
                                          borderRadius: 3,
                                        }}
                                      >
                                        {message.message}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <ListItemText
                                      align={
                                        message.fromSelf ? "right" : "left"
                                      }
                                      secondary={message.time}
                                    ></ListItemText>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            );
                          })}
                      </>
                    )}
                  </List>
                  <Divider />
                  {currentChat === undefined ? (
                    <Box></Box>
                  ) : (
                    <form onSubmit={(e) => sendChat(e)}>
                      <Grid container style={{ padding: "20px" }}>
                        <Box sx={{ mt: 1, mr: 1, position: "relative" }}>
                          <SentimentSatisfiedAltIcon
                            sx={{ mt: 1 }}
                            onClick={handleEmojiPickerHideShow}
                          />
                          {showEmojiPicker && (
                            <Box sx={{ position: "absolute", top: "-500px" }}>
                              <Picker onEmojiClick={handleEmojiClick} />
                            </Box>
                          )}
                        </Box>
                        <Grid xs={9} sm={10} md={8} lg={9} xl={10}>
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
                              backgroundColor: {xs:"#e6e6e6",sm:"unset",md:"#e6e6e6"},
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
