import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";

const PlanView = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 500, mt: 10 }}>
          Find A Plan That's good for you
        </Typography>
      </Box>
      <hr
        style={{ width: "25%", marginLeft: 560, marginTop: 20, borderWidth: 2 }}
      />

      <Box marginTop={5}>
        <Box sx={{display:"flex",justifyContent:'center',flexWrap:'wrap',gap:5}}>
          <Card elevation={2} sx={{width:400,marginBottom:20}}>
            <CardContent >
                <Box textAlign={"center"}>
              <Typography  variant="h5" sx={{fontWeight:500,mb:2,color:'#FD810F'}} >
                Explore
              </Typography>
              <Typography variant="body2" color="text.secondary"sx={{fontSize:18}}>
                3 Sessions
              </Typography>
              </Box>
              <Box textAlign={'center'} marginTop={5}>
                <Typography variant="h6" sx={{fontSize:25,fontWeight:500,color:'#FD810F'}}>
                    What is Included
                </Typography>
                <Typography variant="subtitle1" sx={{fontSize:15,fontWeight:500}}>
                Identify thought patterns, break negative thought loops & initiate positive ones
                </Typography>
              </Box>
              <Box textAlign={'center'} marginTop={5}>
                <Typography variant="h3" sx={{fontWeight:500,color:'#2c5a8f',mt:5}}>
                 ₹ 500
                </Typography>
              </Box>
              <CardActions sx={{display:"flex",justifyContent:'center'}}>
              <Button variant="contained" sx={{mt:5}} color="warning">Buy Now</Button>
              </CardActions>
            </CardContent>
          </Card>
         
          <Card elevation={2} sx={{width:400,marginBottom:20}}>
            <CardContent >
                <Box textAlign={"center"}>
              <Typography  variant="h5" sx={{fontWeight:500,mb:2,color:'#FD810F'}} >
                Explore
              </Typography>
              <Typography variant="body2" color="text.secondary"sx={{fontSize:18}}>
                3 Sessions
              </Typography>
              </Box>
              <Box textAlign={'center'} marginTop={5}>
                <Typography variant="h6" sx={{fontSize:25,fontWeight:500,color:'#FD810F'}}>
                    What is Included
                </Typography>
                <Typography variant="subtitle1" sx={{fontSize:15,fontWeight:500}}>
                Identify thought patterns, break negative thought loops & initiate positive ones
                </Typography>
              </Box>
              <Box textAlign={'center'} marginTop={5}>
                <Typography variant="h3" sx={{fontWeight:500,color:'#2c5a8f',mt:5}}>
                 ₹ 500
                </Typography>
              </Box>
              <CardActions sx={{display:"flex",justifyContent:'center'}}>
              <Button variant="contained" sx={{mt:5}} color="warning">Buy Now</Button>
              </CardActions>
            </CardContent>
          </Card>

          <Card elevation={2} sx={{width:400,marginBottom:20}}>
            <CardContent >
                <Box textAlign={"center"}>
              <Typography  variant="h5" sx={{fontWeight:500,mb:2,color:'#FD810F'}} >
                Explore
              </Typography>
              <Typography variant="body2" color="text.secondary"sx={{fontSize:18}}>
                3 Sessions
              </Typography>
              </Box>
              <Box textAlign={'center'} marginTop={5}>
                <Typography variant="h6" sx={{fontSize:25,fontWeight:500,color:'#FD810F'}}>
                    What is Included
                </Typography>
                <Typography variant="subtitle1" sx={{fontSize:15,fontWeight:500}}>
                Identify thought patterns, break negative thought loops & initiate positive ones
                </Typography>
              </Box>
              <Box textAlign={'center'} marginTop={5}>
                <Typography variant="h3" sx={{fontWeight:500,color:'#2c5a8f',mt:5}}>
                 ₹ 500
                </Typography>
              </Box>
              <CardActions sx={{display:"flex",justifyContent:'center'}}>
              <Button variant="contained" sx={{mt:5}} color="warning">Buy Now</Button>
              </CardActions>
            </CardContent>
          </Card>

        </Box>
      </Box>
    </>
  );
};

export default PlanView;
