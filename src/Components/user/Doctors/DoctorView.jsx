import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import profile from'../../../Assets/PngItem_4554771.png'
import axios from'../../../axios/axios'
import Pagination from './Pagination'
import { baseURL } from '../../../constants/constant'

const DoctorView = () => {
  const [doctor,setDoctor]=useState([])
  const  [currentPage,setCurrentPage]=useState(1)
  const [postsPerPage,setPostsPerPage]=useState(6)
  const getDoctor =async () =>{
    try {
      const response = await axios.get("allDoctors",{
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
  }, []);
  const lastPostIndex = currentPage* postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentDoctors = doctor.slice(firstPostIndex,lastPostIndex)
 
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
    <Box sx={{display:'flex',justifyContent:'center',flexWrap:'wrap',gap:5}}>
        {currentDoctors.map((value)=>(
          
          <Card elevation={2} sx={{ width:{xs:400,sm:350},mt:{xs:10} ,maxWidth:400 }}>
            <Box sx={{display:'flex',justifyContent:'space-evenly',marginTop:5}}>
            <Avatar sx={{height:{xs:120},width:{xs:120}, objectFit: 'cover'}}  src={ `${baseURL}${value.profile}`} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {value.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {value.qualification}
          </Typography>
          
        </CardContent>
        </Box>
        <CardContent>
        <Box>
            <Typography>
            {value.about}
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small">View Profile</Button>
          <Button size="small">Book Now</Button>
        </CardActions>
      </Card>
        ))} 
                 
    </Box>
    <Box>
    <Pagination   postsPerPage={postsPerPage}
        totalPosts={doctor.length}
        paginate={paginate}
        currentPage={currentPage}/>
    </Box>
    </>
  )
}

export default DoctorView
