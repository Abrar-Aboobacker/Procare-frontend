import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Sidebar from "../AdminSidebar/SideBar";
import axios from '../../axios/axios'
import { useFormik } from "formik";
import { pricingSchema } from "../../validation/pricingValidation";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertsSlice";
const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Pricing = () => {
    const dispatch = useDispatch()
  const drawerWidth = 240;
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const [open, setOpen] = useState(false);
  const [plan,setPlan]=useState('')
  const modalHandler = () => {
    setOpen(true);
  };
  const getPlan =async () =>{
    try {
      const response = await axios.get("admin/getAllPlans",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admintoken")}`,
        },
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
  const formik = useFormik({
    initialValues: {
      name: "",
      sessions: "",
      benefits: "",
      price: "",
    },
    validationSchema: pricingSchema,
    onSubmit: async (values, helpers) => {
        try {
            dispatch(showLoading())
          const response = await axios.post("/admin/addPlan", {
            values,
          });
          dispatch(hideLoading());
          if (response.data.success) {
            toast.success(response.data.message);
            setPlan(response.data.data)
            // navigate("/user_otp");
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
          helpers.setErrors({ submit: error.message });
          toast.error("something went wrong");
        }
        // console.log(values);
    },
  });
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Box display={"flex"} justifyContent={"end"}>
            <Button
              onClick={() => modalHandler()}
              variant="contained"
              sx={{ backgroundColor: "white", color: "#FF90AB" }}
            >
              Add a Plan
            </Button>
            <StyledModal
              open={open}
              onClose={(e) => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
                
              <Box
                width={400}
                height={450}
                bgcolor={"background.default"}
                color={"text.primary"}
                p={3}
                borderRadius={5}
              >
                <Typography
                  variant="h6"
                  color="gray"
                  textAlign="center"
                  marginBottom={3}
                >
                  Enter the plan
                </Typography>
               
                  <TextField
                    type="text"
                    fullWidth
                    name="name"
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Enter the plan name"
                    variant="outlined"
                    value={formik.values.name}
                    error={formik.errors.name}
                    helperText={formik.errors.name}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    type="number"
                    name="sessions"
                    //   value={reason}
                    //   onChange={(e) => setReason(e.target.value)}
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Enter the Number of session"
                    variant="outlined"
                    value={formik.values.sessions}
                    error={formik.errors.sessions}
                    helperText={formik.errors.sessions}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    type="text"
                    name="benefits"
                    fullWidth
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Enter the benefits"
                    variant="outlined"
                    value={formik.values.benefits}
                    error={formik.errors.benefits}
                    helperText={formik.errors.benefits}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    type="number"
                    fullWidth
                    name="price"
                    margin="normal"
                    size="small"
                    sx={{ backgroundColor: "white" }}
                    label="Enter the Pricing"
                    variant="outlined"
                    value={formik.values.price}
                    error={formik.errors.price}
                    helperText={formik.errors.price}
                    onChange={formik.handleChange}
                  />
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginTop={3}
                  >
                    <Button
                      variant="contained"
                      color="inherit"
                      type="submit"
                      name="submit"
                      onClick={
                        formik.handleSubmit

                        // setOpen(false);
                      }
                    >
                      Submit
                    </Button>
                  </Box>
              </Box>
           
            </StyledModal>
          </Box>
          <Box></Box>
          <Typography variant="h5" sx={{ marginBottom: 5, fontWeight: 500 }}>
            Plan Pricing
          </Typography>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                {plan && plan.length > 0 ? (
                <>
                  <TableHead>
                    <TableRow>
                      <TableCell>Plan Name</TableCell>
                      <TableCell>benefits</TableCell>
                      <TableCell>No of Sessions</TableCell>
                      <TableCell>Price</TableCell>
                      {/* <TableCell>Action</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plan&& plan.map((value) => (
                    <TableRow key={value._id}
                    >
                      <TableCell>
                        {value.name}
                      </TableCell>
                      <TableCell>{value.benefits}</TableCell>
                      <TableCell>{value?.sessions}</TableCell>
                      <TableCell>{value.price}</TableCell>
                      {/* <TableCell>
                            {doctor&& doctor.isActive==="active"?(
                            <Button
                            variant="contained"
                            color="error"
                          >
                            Block
                          </Button>
                            ):
                            <Button
                            variant="contained"
                            color="success"
                           
                            
                          >
                            Unblock
                          </Button>
                           
                          }
                            
                          </TableCell> */}
                    </TableRow>
                     ))} 
                  </TableBody>
                </>
                 ) : (
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography fontWeight={400} variant="h6">
                      Currently there is no plans
                    </Typography>
                  </Box>
                )} 
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Pricing;
