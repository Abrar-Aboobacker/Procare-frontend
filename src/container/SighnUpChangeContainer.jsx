import { TabContext, TabPanel } from '@mui/lab';
import { Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import DoctorSignUp from '../Components/signup/DoctorSignUp\'';
import UserSignUp from '../Components/signup/UserSignUp';

const SighnUpChangeContainer = () => {
  const [value, setValue]=useState(0)
  const handleChange = (event, value) => {
      setValue(value);
    };
    const paperStyle = { width:500, margin:"20px auto", border:"none"}
return (
<TabContext  value={value} >  
<Paper  style={paperStyle}>
  <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example" sx={{justifyContent:"space-around"}}>
  <Tab  value="0" label="Patient" />

  <Tab value="1" label="Doctor" />
</Tabs>
  <TabPanel sx={{padding:0, marginTop:0, borderRadius:5,}} value="0"><UserSignUp/></TabPanel>

  <TabPanel sx={{padding:0, marginTop:0, borderRadius:5,}} value="1"><DoctorSignUp/></TabPanel>
  </Paper>
  </TabContext>

)
}

export default SighnUpChangeContainer

