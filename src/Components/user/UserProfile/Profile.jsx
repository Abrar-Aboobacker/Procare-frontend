import { Avatar, Box, Card, Typography } from '@mui/material'
import React from 'react'

const Profile = () => {
  return (
    <>
      <Card elevation={1}  sx={{display:'flex',justifyContent:'space-around',alignItems:'center',width:600,height:200,mt:5}}>
        <Box >
        <Avatar sx={{height:150,width:150}}  src="/static/images/avatar/1.jpg" />
        </Box>
        <Box>
            <Typography>
                abrar Aboobacker
            </Typography>
        </Box>
      </Card>
      <Box>
        <Typography>
            Personal Information
        </Typography>
      </Box>
    </>
  )
}

export default Profile
