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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr  px-4 py-8">
      <div className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/20 backdrop-blur-lg p-6 sm:p-8 md:p-10 animate-fadeIn transition-transform duration-300 hover:scale-[1.02]">
        
        {/* Header */}
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
            {isLoginForm ? "Welcome Back ✨" : "Create Account 🎉"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            {isLoginForm
              ? "Login to continue your journey"
              : "Join us and start exploring!"}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isLoginForm ? handleLogin() : handleSignUp();
          }}
          className="space-y-3 sm:space-y-4"
        >
          {!isLoginForm && (
            <>
              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="input input-bordered w-full border-indigo-300 focus:border-pink-400 rounded-lg py-2 px-3 text-xs sm:text-sm"
                  placeholder="Enter first name"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                  className="input input-bordered w-full border-indigo-300 focus:border-pink-400 rounded-lg py-2 px-3 text-xs sm:text-sm"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full border-indigo-300 focus:border-pink-400 rounded-lg py-2 px-3 text-xs sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full border-indigo-300 focus:border-pink-400 rounded-lg py-2 px-3 text-xs sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-center text-xs sm:text-sm font-semibold">
              ⚠️ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 sm:py-3 text-sm sm:text-base font-semibold rounded-xl shadow-lg transition-all duration-300 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 hover:scale-[1.03] hover:shadow-xl ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : isLoginForm ? "Login" : "Sign Up"}
          </button>

          <div className="text-center mt-3 sm:mt-4">
            <p
              onClick={() => setLoginForm((prev) => !prev)}
              className="text-xs sm:text-sm text-indigo-700 dark:text-indigo-400 font-semibold cursor-pointer hover:text-pink-500 transition-colors duration-300"
            >
              {isLoginForm
                ? "🌟 New here? Create an account"
                : "🔑 Already have an account? Login"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
