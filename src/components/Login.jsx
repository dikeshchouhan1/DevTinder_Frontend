import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstname] = useState("");
  const [lastName, seteLastname] = useState("");
  const [email, setemailId] = useState("dikeshchouhan@gmail.com");
  const [password, setPassword] = useState("dikesh@2002");
  const [isLoginForm, setLoginForm] = useState(true);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
   const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center  ">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => seteLastname(e.target.value)}
                    className="input"
                    placeholder="Type here"
                  />
                </fieldset>
              </>
            )}
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
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={ isLoginForm ? handleLogin: handleSignUp}>
             {
             isLoginForm ?"Login":"Sign Up"
            }
            </button>
          </div>
                <p 
                className="m-auto cursor-pointer py-2"
                onClick={()=>setLoginForm((value)=>!value)}
                >{isLoginForm ?"New User? SignUp here":"Existing user? Login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
