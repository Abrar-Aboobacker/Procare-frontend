import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../axios/axios'
import { setDoctor} from '../redux/DoctorSlice'
import { hideLoading, showLoading } from '../redux/alertsSlice'
const DoctorProtectedRoutes = (props) => {
const {doctor}=useSelector((state)=>state.doctor)
const dispatch = useDispatch()
const navigate = useNavigate()
// const getDoctor = async ()=>{
//    try {
//       dispatch(showLoading())
//       const response = await axios.post('/doctor/doctorInfo',{token:localStorage.getItem('tokken')},{
//          headers:{
//              Authorization: "Bearer " + localStorage.getItem("token")
//          }
//       })
//       dispatch(hideLoading())
//       if(response.data.success){
//          dispatch(setDoctor(response.data.data))
//       }else{
//          navigate("/login")
//          localStorage.clear()
//       }
//    } catch (error) {
//       dispatch(hideLoading())
//       navigate("/login")
//       localStorage.clear()
//    }
// }

//    useEffect(()=>{
//       if(!doctor){
//          getDoctor()
//       }
//    },[doctor,getDoctor])

 if(localStorage.getItem('token')){
    return props.children
 }else{
    return <Navigate to ='/doctor_login'/>
 }
}

export default DoctorProtectedRoutes
