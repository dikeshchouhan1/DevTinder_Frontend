import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
  const [email, setemailId] = useState("dikeshchouhan@gmail.com");
  const [password, setPassword] = useState("dikesh@2002");

  const handleLogin =async()=>{
    try{
        const res =await axios.post(BASE_URL+"/login",{
           email,
            password,
        },{withCredentials:true})
     
        dispatch(addUser(res.data))
        navigate("/")
     
    }catch(err){
        console.log(err)
    }
  }
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center  ">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Eamil :{email}</legend>
              <input
                type="text"
                value={email}
                onChange={(e) => setemailId(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">password</legend>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary"
            onClick={handleLogin}
            >Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
