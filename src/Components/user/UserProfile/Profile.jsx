import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import { baseURL } from '../../../constants/constant';
import { TabContext,} from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../../axios/axios'
import { hideLoading, showLoading } from '../../../redux/alertsSlice';
import { toast } from 'react-hot-toast';
import { setUser } from '../../../redux/UserSlice';
const Profile = () => {
  const dispatch = useDispatch()
  const {user}=useSelector((state)=>state.user)
  const [image, setImage] = useState();
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    const allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // validate file
    if (!allowedExtensions.exec(selectedFile.name)) {
      toast.error("Please upload a PNG, JPG, or JPEG image.");
      setImage("");
      return;
    } else if (selectedFile.size > 1 * 1024 * 1024) {
      toast.error("Please upload a file smaller than 1MB.");
      setImage("");
      return;
    } else {
      setImage(selectedFile);
    }
  };
  const handlePicUpload = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/userProfilePicUpload",
        { profile: image },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("usertoken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        console.log("hereee");
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
            <Card
              elevation={2}
              sx={{
                maxWidth: 400,
                width: {xs:"98%",sm:400},
                backgroundColor: "#eff2f7",
                marginX:{xs:0,sm:20,md:0},
                pt: 5,
              }}
            >
              <label htmlFor="fileInput">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{ height: 200, width: 200, objectFit: "unset" }}
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `${baseURL}${user?.profile}
                    `
                    }
                  />
                </Box>
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <Button
                    onClick={handlePicUpload}
                    variant="contained"
                    color="warning"
                    sx={{ marginBottom: 2 }}
                  >
                    Update Profile
                    {/* <CameraAlt sx={{ marginLeft: 2, color: "white" }} />{" "} */}
                  </Button>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    textAlign={"center"}
                    mt={2}
                  >
                    {`${user?.fName} ${user?.lName}`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      typography: "body1",
                      justifyContent: "center",
                    }}
                  >
                    <TabContext >
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Box display={'flex'} justifyContent={'center'}>
                            <Link to={'/user_profile'}>
                          <Typography sx={{mt:5,fontSize:20,color:'black'}}>
                            EDIT PROFILE
                          </Typography>
                          </Link>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'}>
                            <Link to={'/user/Appointment'}>
                          <Typography sx={{mt:5,fontSize:20,color:'black'}}>
                            APPOINTMENTS
                          </Typography>
                          </Link>
                        </Box>
                        <Box display={'flex'} justifyContent={'center'}>
                            <Link to={'/user_chat'}>
                          <Typography sx={{mt:5,fontSize:20,color:'black'}}>
                            CHAT
                          </Typography>
                          </Link>
                        </Box>
                      </Box>
                    </TabContext>
                  </Box>
                </Box>
              </CardContent>
            </Card>
    </>
  )
}

export default Profile
