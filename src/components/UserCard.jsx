import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFeed } from '../utils/feedSlice';
import Feed from './Feed';

const UserCard = ({user}) => {
  
    const {_id,firstName,lastName,photoUrl,age ,gender,about}=user;
    const dispatch=useDispatch();

    const handleSendRequest=async (status,userId)=>{
      try{
      const req=await axios.post(
        BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true}
      )
      dispatch(removeUserFeed(userId))
      }catch(err){

      }
    }

   
  return (
    <div><div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + "  "+ lastName}</h2>
    {age && gender && <p>{age +" "+ gender}</p>}
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={()=>{handleSendRequest("ignored",_id)}}>Ignore</button>
      <button className="btn btn-secondary"  onClick={()=>{handleSendRequest("interested",_id)}}>Intersted</button>
    </div>
  </div>
</div></div>
  )
}

export default UserCard