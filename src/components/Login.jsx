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
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("dikeshchouhan@gmail.com");
  const [password, setPassword] = useState("dikesh@2002");
  const [isLoginForm, setLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-600 p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-base-100 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn backdrop-blur-md border border-white/20">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent text-white text-center py-6 sm:py-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold drop-shadow-lg tracking-wide">
            {isLoginForm ? "Welcome Back ✨" : "Join Our Family 🎉"}
          </h2>
          <p className="text-sm sm:text-base mt-1 opacity-90">
            {isLoginForm
              ? "Login to continue your journey"
              : "Create an account to get started"}
          </p>
        </div>

        {/* Body */}
        <div className="card-body p-5 sm:p-7 space-y-4">
          {!isLoginForm && (
            <>
              <label className="form-control w-full">
                <span className="label-text font-semibold text-base">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="input input-bordered border-accent focus:border-primary w-full text-sm sm:text-base"
                  placeholder="Enter first name"
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text font-semibold text-base">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  className="input input-bordered border-accent focus:border-primary w-full text-sm sm:text-base"
                  placeholder="Enter last name"
                />
              </label>
            </>
          )}

          <label className="form-control w-full">
            <span className="label-text font-semibold text-base">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered border-accent focus:border-primary w-full text-sm sm:text-base"
              placeholder="Enter your email"
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text font-semibold text-base">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered border-accent focus:border-primary w-full text-sm sm:text-base"
              placeholder="Enter your password"
            />
          </label>

          {error && (
            <p className="text-red-500 text-center text-sm sm:text-base font-semibold mt-2">
              ⚠️ {error}
            </p>
          )}

          <div className="card-actions justify-center mt-4">
            <button
              className={`btn w-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-primary to-accent hover:scale-[1.05] transition-transform duration-300 ${
                loading ? "loading" : ""
              }`}
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={loading}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>

          <div className="divider text-sm sm:text-base opacity-60">or</div>

          <p
            onClick={() => setLoginForm((prev) => !prev)}
            className="text-center text-sm sm:text-base text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition-colors duration-200"
          >
            {isLoginForm
              ? "🌟 New user? Sign up here"
              : "🔑 Already have an account? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
