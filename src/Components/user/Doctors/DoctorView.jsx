import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import profile from'../../../Assets/PngItem_4554771.png'
import axios from'../../../axios/axios'
import clsx from 'clsx'
import useLazyLoad from '../../../lazy load/useLazyLoad'
import { LoadingPosts } from '../../../lazy load/LoadingPosts'
import Pagination from './Pagination'

const DoctorView = () => {
  const [doctor,setDoctor]=useState([])
  const  [currentPage,setCurrentPage]=useState(1)
  const [postsPerPage,setPostsPerPage]=useState(5)
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
    <Box sx={{display:'flex',flexWrap:'wrap',gap:5}}>
        {currentDoctors.map((value)=>(
          
          <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="340"
          image={profile}
          sx={{borderRadius:45}}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {value.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {value.about}
          </Typography>
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
