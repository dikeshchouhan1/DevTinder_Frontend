import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

 const handleLogout = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
    if (res.status === 200) {
      dispatch(removeUser());
      navigate("/login");
    } else {
      console.error("Logout failed:", res);
    }
  } catch (err) {
    console.error("Logout error:", err);
  }
};


  return (
    <nav className="w-full bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-400 shadow-lg backdrop-blur-md fixed top-0 left-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="font-extrabold text-xl sm:text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-cyan-400 cursor-pointer py-1 px-2 rounded-lg"
        >
          DevTinder
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <span className="font-semibold text-white">Hi, {user.firstName}</span>
              <div className="dropdown dropdown-end relative">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar ring-2 ring-pink-500 ring-offset-2 hover:ring-indigo-500 transition-all"
                >
                  <div className="w-10 h-10 rounded-full">
                    <img
                      alt="user photo"
                      src={user.photoUrl || "/default-avatar.png"}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white dark:bg-slate-900/80 rounded-2xl shadow-xl absolute right-0 mt-3 w-56 p-3 z-30 border border-white/20"
                >
                  <li>
                    <Link to="/aichat" className="flex justify-between items-center">
                      AI Chat
                      <span className="badge badge-secondary">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" >
                      Profile
                      
                    </Link>
                  </li>
                  <li>
                    <Link to="/connections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests">Requests</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-lg px-3 py-2 font-semibold transition hover:scale-[1.03]"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-lg font-semibold hover:scale-[1.03] transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiX className="w-7 h-7 text-white" />
            ) : (
              <HiMenu className="w-7 h-7 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900/90 w-full px-4 py-4 border-t border-white/20 shadow-lg backdrop-blur-md">
          {user ? (
            <div className="flex flex-col gap-3">
              <Link to="/aichat" className="px-3 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800 transition">
                AI Chat
              </Link>
              <Link to="/profile" className="px-3 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800 transition">
                Profile
              </Link>
              <Link to="/connections" className="px-3 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800 transition">
                Connections
              </Link>
              <Link to="/requests" className="px-3 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800 transition">
                Requests
              </Link>
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-lg font-semibold hover:scale-[1.03] transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-indigo-500 text-white rounded-lg font-semibold hover:scale-[1.03] transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
