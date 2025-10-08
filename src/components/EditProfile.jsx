
import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
const EditProfile = ({user}) => {
     const [firstName,setFirstName] = useState(user.firstName);
     const [lastName,setLastName] = useState(user.lastName);
     const [age,setAge] = useState(user.age);
     const [gender,setGender] = useState(user.gender);
     const [photoUrl,setphotoUrl] = useState(user.photoUrl);
     const [about,setAbout] = useState(user.about);
     const [error,setError] = useState("");
     const [tost,setTost] = useState(false);
     const dispatch=useDispatch();
     const saveProfile= async()=>{
      setError("")
      try{
        const res= await axios.patch(BASE_URL+"/profile/edit",{
          firstName,lastName,photoUrl,age,gender,about,
        },{withCredentials:true})
       dispatch(addUser(res?.data?.data))
       setTost(true)
      setTimeout(()=>{
        setTost(false)
       },3000)
      }catch(err){
        setError(err.response.data);
      }
     }
     
  return (
    <>
    <div className="flex justify-center my-10">
         <div className="flex justify-center mx-10 ">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center  ">Edit Profile</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo URL :</legend>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setphotoUrl(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary"
            onClick={saveProfile}
            >Save Profile</button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
    {tost &&(<div className="toast toast-top toast-center mt-5">

  <div className="alert alert-success">
    <span>Profle Saved successfully.</span>
  </div>
</div>)}
    </div>

    </>
  )
}

export default EditProfile