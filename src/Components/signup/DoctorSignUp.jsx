// import React, { useEffect, useState } from 'react'
// import {
//     Box,
//     Button,
//     Grid,
//     TextField,
//     Typography,
//   } from "@mui/material";
// import { toast } from 'react-hot-toast';
// import axios from '../../axios/axios';
// import { useNavigate } from 'react-router-dom';
// import { DoctorSchema } from '../../validation/doctorsignupvalidation'; 
// import { Formik, useFormik } from 'formik';
// import { ValidationError } from 'yup';


// const DoctorSignUp = () => {
//   const navigate = useNavigate()
//   const [value,setvalue]=useState({
//     name:"",
//     email:"",
//     phone:null,
//     password:"",
//     cpassword:"",
//     about:""
//   })
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit,setIssubmit]=useState(false)
//   // const [name , setName]=useState("")
//   // const [email , setEmail]=useState("")
//   // const [phone , setPhone]=useState("")
//   // const [password , setPassword]=useState("")
//   // const [cpassword , setcpassword]=useState("")
//   // const [about , setAbout]=useState("")
//   const [filez,setFile] = useState(null);
 
//   // console.log(filez+"ehaaaaa");
//   const toBase64 = filez => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(filez);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
// }).catch((err)=>{
//   console.log(err)
// })
// // const formik =useFormik({
// //   initialValues:{
// //     name:"",
// //     email:"",
// //     phone:"",
// //     password:"",
// //     cpassword:"",
    
// //   },
// //   validationSchema:DoctorSchema,
// //   onSubmit:async (values,helpers)=>{
// //     console.log(values);
// //     try {
// //        alert(JSON.stringify(values, null, 2));
// //     } catch (error) {
// //       helpers.setErrors({submit:error.message})
// //     }
// //   }
// // })
// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setvalue((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
//   setIssubmit(true)
// };
 
//   const handleSignup = async (e)=>{
//     e.preventDefault();
//     setFormErrors(validate(value))
    
//     console.log(isSubmit+"ffff");
//     // let formData = {
//     //   name: name,
//     //   email: email,
//     //   phone: phone,
//     //   password: password,
//     //   cpassword:cpassword
//     // };
//     // const isValid = await DoctorSchema.isValid(formData);
//     // console.log(isValid);
//     // if( isSubmit=== true){
//       try {
//         // let formData = {
//         //   name: name,
//         //   email: email,
//         //   phone: phone,
//         //   password: password,
//         // };
//         // const isValid = await DoctorSchema.isValid(formData);
//         const imgBase = await toBase64(filez)
//       //  { for (const key in value.name) {
//       //     console.log(key);
//       // }}
//       //   console.log(value.name+55555555);
//         console.log(imgBase+"podaaaaaaaa");
//         const response = await axios.post("/doctor/doctor_signup",{
//           value,file:imgBase
//           // name:name,
//           // email:email,
//           // password:password,
//           // cpassword:cpassword,
//           // phone:phone,
//           // file:imgBase,
//           // about:about
//         })
//         if(response.data.success){
//           toast.success(response.data.message)
//           navigate('/login')
//         }else{
//           console.log("heree");
//           toast.error(response.data.message)
//         }
//       } catch (error) {
//         console.log(error);
//         toast("something went wrong" )
//       }
//     // }else{
//     //   // toast.error("something went wrong" )
//   // }
//   }
//   useEffect(()=>{
//     if(Object.keys(formErrors).length ===0&& isSubmit){
//      // console.log(formErrors);
//     }
//   },[formErrors])
//   const validate = (values)=>{
//     const errors ={}
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
//     if(!values.name){
//       errors.name="UserName is required"
//     }if(!values.email){
//       errors.email="Email is required"
//     }else if(!emailRegex.test(values.email)){
//       errors.email="please enter correct email format"
//     }
//     if(!values.phone){
//       errors.phone="Phone is required"
//     }if(!values.password){
//       errors.password="Password is required"
//     }else if(!passwordRegex.test(values.password)){
//       errors.password="One Uppercase, One Lowercase, One Number and One Special Case Character"
//     }if(!values.cpassword){
//       errors.cpassword="Conform password is required"
//     }else if(values.password != values.cpassword){
//       errors.cpassword ="password is not matching"
//     }if(!values.about){
//       errors.about="About is required"
//     }
//     return errors
//   }

//   return (
//     <div>
//     <form onSubmit={handleSignup}  action="">
//       <Box
//         sx={{
//           backgroundColor: "#F5FCFF",
//           display: "flex",
//           flexDirection: "column",
//           maxWidth: 500,
//           alignItems: "center",
//           justifyContent: "center",
//           margin: "auto",
//           marginTop: 0,
//           padding: 3,
//           height:"80vh",
//           borderRadius: 5,
//           boxShadow: "5px 5px 10px #ccc ",
//           ":hover": {
//             boxShadow: "10px 10px 20px #ccc ",
//           },
//         }}
//       >
//         <Typography variant="h4" padding={3} textAlign="center">
//           Signup
//         </Typography>
//         <Grid
//           container
//           rowSpacing={1}
//           columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//         >
//           <Grid item sm={6}>
//             <TextField
//               sx={{ backgroundColor: "white" }}
//               margin="normal"
//               type={"text"}
//               name="name"
//               value={value.name}
//               size="small"
//               error={formErrors.name}
//               helperText={formErrors.name}
//               // onChange={(e)=>setName(e.target.value)}
//               // onChange={formik.handleChange}
//               onChange={handleChange}
//               label="Full Name"
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item sm={6}>
//             <TextField
//               sx={{ backgroundColor: "white" }}
//               margin="normal"
//               name='email'
//               type={"email"}
//               size="small"
//               error={formErrors.email}
//               helperText={formErrors.email}
//               // onChange={(e)=>setEmail(e.target.value)}
//               onChange={handleChange}
//               // onChange={formik.handleChange}
//               value={value.email}
//               label="email"
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item sm={6}>
//             <TextField
//               sx={{ backgroundColor: "white" }}
//               margin="normal"
//               name='phone'
//               size="small"
//               value={value.phone}
//               onChange={handleChange}
//               error={formErrors.phone}
//               helperText={formErrors.phone}
//               // onChange={formik.handleChange}
//               // onChange={(e)=>setPhone(e.target.value)}
//               type={"tel"}
//               label="Phone No"
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item sm={6}>
//             <TextField
//               sx={{ backgroundColor: "white" }}
//               focused
//               margin="normal"
//               // accept= 'image/*'
//               type="file"
//               size="small"
//               onChange={(e)=>setFile(e.target.files[0])}
//               label="upload your Certificate"
//               variant="outlined"
//             /> 
//           </Grid>
//           <Grid item sm={6}>
//             <TextField
//               sx={{ backgroundColor: "white" }}
//               margin="normal"
//               value={value.password}
//               onChange={handleChange}
//               // onChange={(e)=>setPassword(e.target.value)}
//               type={"password"}
//               error={formErrors.password}
//               helperText={formErrors.password}
//               name="password"
//               size="small"
//               label="Password"
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item sm={6}>
//             <TextField
//               sx={{ backgroundColor: "white" }}
//               margin="normal"
//               type={"password"}
//               name='cpassword'
//               size="small"
//               value={value.cpasswordcpassword}
//               onChange={handleChange}
//               // value={formik.values.cpassword}
//               error={formErrors.cpassword}
//               helperText={formErrors.cpassword}
//               // onChange={(e)=>setcpassword(e.target.value)}
//               label="Confirm Password"
//               variant="outlined"
//             />
//           </Grid>
//           {/* <Grid item sm={12}>
//             <TextField
//               fullWidth
//               multiline
//                maxRows={5}
//               sx={{ backgroundColor: "white" }}
//               margin="normal"
//               type={"text"}
//               value={value.about}
//               onChange={handleChange}
//               error={formErrors.about}
//               helperText={formErrors.about}
//               // onChange={(e)=>setAbout(e.target.value)}
//               label="Write About Your Self"
//               variant="outlined"
//             />
//           </Grid> */}
//         </Grid>

//         <Button
//           variant="contained"
//           // onClick={handleSignup}
//           color="warning"
//           type = "submit"
//           sx={{ marginTop: 3, borderRadius: 3 }}>
//           SignUp
//         </Button>
//       </Box>
//     </form>
//   </div>
//   )
// }

// export default DoctorSignUp





import React, { useState } from 'react'
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
  } from "@mui/material";
import { toast } from 'react-hot-toast';
import axios from '../../axios/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/alertsSlice';

const DoctorSignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const [value,setvalue]=useState({
  //   name:"",
  //   email:"",
  //   phone:null,
  //   password:"",
  //   cpassword:""
  // })
  const [name , setName]=useState("")
  const [email , setEmail]=useState("")
  const [phone , setPhone]=useState("")
  const [password , setPassword]=useState("")
  const [cpassword , setcpassword]=useState("")
  const [about , setAbout]=useState("")
  const [filez,setFile] = useState(null);
 
  // console.log(filez+"ehaaaaa");
  const toBase64 = filez => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(filez);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
}).catch((err)=>{
  console.log(err)
})
  // const fileType=['application/pdf'];
  // const handleFileChange=(e)=>{
  //   let selectedFile=e.target.files[0];
  //   // if(selectedFile){
  //   //   if(selectedFile&&fileType.includes(selectedFile.type)){
  //   //     let reader = new FileReader();
  //   //         reader.readAsDataURL(selectedFile);
  //   //         reader.onloadend = (e) =>{
  //   //           // console.log(e.target.result + "ith enthaaaaa");
  //   //           setFile(e.target.result);     
  //   //         }
  //   //   }
  //   //   else{
  //   //     setFile(null);
  //   //     // setPdfFileError('Please select valid pdf file');
  //   //   }
  //   // }
  //   // else{
  //   //   console.log('select your file');
  //   // }
  //   setFile(e.target.files[0])
  // }
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setvalue((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };
  const handleSignup = async (e)=>{
    e.preventDefault();
    if(
      // value.name===""||
      // value.password===""||
      // value.phone===""||
      // value.email===""
      name===""
    ){
      toast.error("All fields required");
    }else{
    try {
      dispatch(showLoading())
      const imgBase = await toBase64(filez)
      console.log(imgBase+"podaaaaaaaa");
      const response = await axios.post("/doctor/doctor_signup",{
        // value,file:imgBase
        name:name,
        email:email,
        password:password,
        cpassword:cpassword,
        phone:phone,
        file:imgBase,
        about:about
      })
      dispatch(hideLoading())
      if(response.data.success){
        toast.success(response.data.message)
        navigate('/login')
      }else{
        console.log("heree");
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      toast.error("something went wrong" )
    }
  }
  }


  return (
    <div>
    <form action="">
      <Box
        sx={{
          backgroundColor: "#F5FCFF",
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          marginTop: 0,
          padding: 3,
          height:"80vh",
          borderRadius: 5,
          boxShadow: "5px 5px 10px #ccc ",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc ",
          },
        }}
      >
        <Typography variant="h4" padding={3} textAlign="center">
          Signup
        </Typography>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"text"}
              name="name"
              value={name}
              size="small"
              onChange={(e)=>setName(e.target.value)}
              // onChange={handleChange}
              label="Full Name"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              name='email'
              type={"email"}
              size="small"
              onChange={(e)=>setEmail(e.target.value)}
              // onChange={handleChange}
              value={email}
              label="email"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              name='phone'
              size="small"
              value={phone}
              // onChange={handleChange}
              onChange={(e)=>setPhone(e.target.value)}
              type={"tel"}
              label="Phone No"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              focused
              margin="normal"
              // accept= 'image/*'
              type="file"
              size="small"
              onChange={(e)=>setFile(e.target.files[0])}
              label="upload your Certificate"
              variant="outlined"
            /> 
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              value={password}
              // onChange={handleChange}
              onChange={(e)=>setPassword(e.target.value)}
              type={"password"}
              name="password"
              size="small"
              label="Password"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"password"}
              name='cpassword'
              size="small"
              // value={value.cpassword}
              // onChange={handleChange}
              value={cpassword}
              onChange={(e)=>setcpassword(e.target.value)}
              label="Confirm Password"
              variant="outlined"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              fullWidth
              multiline
               maxRows={5}
              sx={{ backgroundColor: "white" }}
              margin="normal"
              type={"text"}
              value={about}
              onChange={(e)=>setAbout(e.target.value)}
              label="Write About Your Self"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          onClick={handleSignup}
          color="warning"
          sx={{ marginTop: 3, borderRadius: 3 }}>
          SignUp
        </Button>
      </Box>
    </form>
  </div>
  )
}

export default DoctorSignUp