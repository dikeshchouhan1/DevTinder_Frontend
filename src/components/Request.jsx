import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Request = () => {
    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.request)
     
    const reviewsRequest=async(status,_id)=>{
        try{
          const res=await axios.post(BASE_URL+"/request/review/"+ status+"/"+_id,{},{
            withCredentials:true
          })
          dispatch(removeRequest(_id))
        }catch(err){

        }
    }




    const fetchRequest= async()=>{
        try{

            const res=await axios.get(BASE_URL+"/user/requests/received",{
                withCredentials:true
            })
            console.log(res.data.data)
            dispatch(addRequest(res.data.data))
        }catch(err){

        }
    }


    useEffect(()=>{
        fetchRequest()

    },[])

  if (!requests) return;
  if (requests.length === 0) return <h1 className='flex justify-center my-10'>No Connection Found</h1>;
  return (
    <div className=" text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections Requests</h1>
      {requests.map((request) => {
        const { _id,firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div 
          key={_id}
          className="flex m-4 p-4 justify-between items-center rounded-lg bg-base-300 w-1/3 mx-auto">
            <div>
              <img
                src={photoUrl}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4"> 
              <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
              { age && gender && <p>{age + " "+gender }</p>}
              <p>{about}</p>
            </div>
            <div><button className="btn btn-primary mx-2"  onClick={()=> reviewsRequest("rejected",request._id)}>Reject</button>
<button className="btn btn-secondary mx-2"   onClick={()=> reviewsRequest("accepted",request._id)}>Accept</button></div>
          </div>
        );
      })}
    </div>
  );
}

export default Request