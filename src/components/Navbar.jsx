import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
    const user=useSelector((store)=>store.user);
    const dispatch=useDispatch();
    const navtigate=useNavigate()
   const handleLogout= async()=>{
    try{
    await axios.post(BASE_URL+"/logout",{},{
      withCredentials:true
    })
    dispatch(removeUser())
    return navtigate("/login")
    }catch(err){

    }
   }
  return (
    <div>
         <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  { user&&(
  <div className="flex gap-2">

    <div className="dropdown dropdown-end mx-5 flex ">
        <p className='px-4 items-center mt-1'>welcome ,{user.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile"className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connections">Connctions</Link></li>
        <li><Link to="requests">Request</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
    )

}
    
</div>
    </div>
  )
}

export default Navbar