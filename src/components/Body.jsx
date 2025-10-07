import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
const Body = () => {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const userData=useSelector((store)=>store.user);
  const fetchUser=async()=>{
    try{
        const res= await axios.get(BASE_URL+"/profile/view",{
          withCredentials:true,
        })
        dispatch(addUser(res.data))
    }
    catch(err){
      if(err.status===401){

        navigate("/login")
      }
      console.error(err)
    }
  }

  useEffect(()=>{
    if(!userData){

      fetchUser();
    }
  },[]);
  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Body