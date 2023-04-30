import { Avatar, Box, Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/axios'
import robot from "../../Assets/robot.gif";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import Picker from "emoji-picker-react";
import { baseURL } from '../../constants/constant';
import SendIcon from "@mui/icons-material/Send";

const DoctorChatPage = () => {
    const navigate  = useNavigate()
    const { doctor } = useSelector((state) => state.doctor);
    const [userLists, setUserList] = useState([]);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');
    const [messages,setMessages]=useState([])
    useEffect(() => {
      axios
        .get("/doctor/getChatContacts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            setUserList(response.data.data);
          }
        });
    }, []);
    const getAllMessages=async()=>{
      const response = await axios.post('/message/getAllMessages',{
          from:doctor._id,
          to:currentChat._id
      })
      console.log(response);
      if(response.data.success){
          setMessages(response.data.projectedMessages)
      }
    }
    useEffect(()=>{
      getAllMessages()
    },[currentChat])
    const handleChatChange = (chat) => {
      setCurrentChat(chat);
    };
    const changeCurrentChat = (index, contact) => {
      setCurrentSelected(index);
      handleChatChange(contact);
    };
    const handleSendMessage = async (message) => {
      await axios.post ('/message/addMessage',{
          from:doctor._id,
          to:currentChat._id,
          messages:msg
      })
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
                sx={{mt:2, width: "63.5rem", height: "600px" }}
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
                    {userLists.map((user, index) => (
                      <ListItem
                        button
                        onClick={() => changeCurrentChat(index, user)}
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
                            src={`${baseURL}${user?.profile}`}
                          />
                        </ListItemIcon>
                        <ListItemText primary={`${user.fName} ${user.lName}`}></ListItemText>
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
                        {`${currentChat.fName} ${currentChat.lName}`}
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
                            {/* {user?.fName} {user?.lName}! */}
                          </Box>
                        </Typography>
                        <Typography>
                          Please Select Your Doctor to Start Chat
                        </Typography>
                      </Box>
                    ) : (
                      <>
                      {
                       Array.isArray(messages) && messages.map((message)=>{
                        
                            return(
                                <ListItem key="1">
                                <Grid container>
                                  <Grid item xs={12}>
                                     <Box sx={{display:"flex",justifyContent:message.fromSelf?"flex-end":"flex-start"}}>
                                    <Typography sx={{backgroundColor:message.fromSelf?"#fcfbd4":'#f2f2f2',pt:1,pb:1,pr:3,pl:3,borderRadius:3}}>{message.message}</Typography> 
                                    </Box>
                                    {/* <Typography sx={{alignItems:"right"}}>{message.message}</Typography> */}
                                  </Grid>
                                  <Grid item xs={12}>
                                    <ListItemText
                                      align={message.fromSelf ? "right" : "left"}
                                      secondary={message.time}
                                    ></ListItemText>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            )
                        })
                      }
                       
                        {/* <ListItem key="2">
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
                        </ListItem> */}
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
    </>
  )
}

export default DoctorChatPage
