import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from '../../axios/axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const PlanView = () => {
  const [plan,setPlan]=useState([])
  const navigate = useNavigate()

  const initPayment = (data,price)=>{
    const options ={
      key: 'rzp_test_c9LwPhNzbwNWJ6',
      amount:data.amount,
      currency:data.currency,
      name:'Procare Eclinic',
      description:"Test Transaction",
      image:'https:/your-logo-url.png',
      order_id:data.id,
      handler:async(response)=>{
        try {
          const res = await axios.post("/paymentVerify",{response,price},{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("usertoken"),
            }
         })
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      },prefill: {
            name: 'YOUR_CUSTOMER_NAME', 
            email: 'YOUR_CUSTOMER_EMAIL',
          },
          notes: {
            address: 'YOUR_CUSTOMER_ADDRESS',
          },
          theme: {
            color: '#F37254',
          },
    }
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  const getPlan =async () =>{
    try {
      const response = await axios.get("/getAllPlans",{
      })
      if(response.data.success){
        setPlan(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPlan()
  }, []);
  const handlePayment = async(price) =>{
  //  console.log(price);
    try {
      const response = await axios.post ("/planOrder",price,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("usertoken"),
        }
     })
      if(response.data.success){
        initPayment(response.data.data,price)
      }else{
        toast.error(response.data.message)
        navigate('/user_login')
      }

    } catch (error) {
      toast.error("You Need to Login first")
      navigate('/user_login')
      // console.log(error);
    }
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 500, mt: 10,fontSize:{xs:'20px',sm:"35px"} }}>
          Find A Plan That's good for you
        </Typography>
      </Box>
      {/* <hr
        style={{ width: "25%", marginLeft: 560, marginTop: 20, borderWidth: 2 }}
      /> */}

      <Box marginTop={5}>
        <Box sx={{display:"flex",justifyContent:'center',flexWrap:'wrap',gap:5}}>
          {plan.map((value)=>(
              <Card elevation={5} sx={{width:{xs:"95%"},maxWidth:400,marginBottom:{xs:5,sm:5}}}>
              <CardContent >
                  <Box textAlign={"center"}>
                <Typography  variant="h5" sx={{fontWeight:500,mb:2,color:'#FD810F'}} >
                  {value.name}
                </Typography>
                <Typography variant="body2" color="text.secondary"sx={{fontSize:18}}>
                  {value.sessions} Sessions
                </Typography>
                </Box>
                <Box textAlign={'center'} marginTop={5}>
                  <Typography variant="h6" sx={{fontSize:25,fontWeight:500,color:'#FD810F'}}>
                      What is Included
                  </Typography>
                  <Typography variant="subtitle1" sx={{fontSize:15,fontWeight:500}}>
                  {value.benefits}
                  </Typography>
                </Box>
                <Box textAlign={'center'} marginTop={5}>
                  <Typography variant="h3" sx={{fontWeight:500,color:'#2c5a8f',mt:5}}>
                   ₹ {value.price}
                  </Typography>
                  <Typography >
                    price per session: ₹{value.price/value.sessions}
                  </Typography>
                </Box>
                <CardActions sx={{display:"flex",justifyContent:'center'}}>
                <Button onClick={()=>handlePayment(value)} variant="contained" sx={{mt:5}} color="warning">Buy Now</Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default PlanView;
