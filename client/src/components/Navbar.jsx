import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const {user,setShowLogin,logout,credit}=useContext(AppContext)
  const navigate = useNavigate()
  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/" className="flex items-center gap-2">
    <img src={assets.logoNew} alt="logo" className="h-10 object-contain" />
    <span className="text-2xl font-bold text-black">
      ink2<span className="text-orange-500">Pic</span>
    </span>
  </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 
               rounded-full hover:scale-105 transition-all duration-500"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credit Left :{credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi,{user.name}</p>
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow"
                alt=""
              />
              <div
                className="absolute hidden group-hover:block
                    top-0 right-0 z-10 text-black rounded pt-12"
              >
                <ul className="list-none m-0 p-2 bg-white rounded-xl border border-gray-200 shadow-md text-sm text-gray-800 w-40">
                  <li
                    className="py-2 px-4 cursor-pointer hover:bg-gray-100 rounded-md transition-colors duration-200"
                    role="button"
                    tabIndex={0}
                    onClick={logout}
                  >
                    Log out
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p className="cursor-pointer">Pricing</p>
            <button onClick={()=>setShowLogin(true)}
            className="bg-zinc-800 hover:scale-105 transition-all
                duration-300 cursor-pointer text-white px-7 py-2 sm:px-10 text-sm rounded-full">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
