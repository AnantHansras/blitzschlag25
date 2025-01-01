import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/blitz_logo.png'
import "../css files/navbar.css";

const Navbar = () => {
  const [NavComponents, setNavComponents] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="fixed w-full bg-[#C4C4C430] z-50 rounded-b-3xl py-3">
      

      {/* Navbar */}
      <div className="flex justify-between items-center">
       
        <div>
          <Link to="/"><img src={logo} alt="Blitz Logo" className="h-20 ml-3 absolute top-0" /></Link>
        </div>

        {/* Main Navigation (Visible in PC) */}
        <div className="hidden font-normal text-2xl text-[#D3D3D3] lg:flex justify-between item-center gap-x-7" 
        style={{ fontFamily: "'Jaro', sans-serif"}}>
          <div>
            <Link to="/sponsor" className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200">Sponsor</Link>
          </div>
          <div>
            <Link to="/event" className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200 ">Events</Link>
          </div>
          <div>
            {!user ? (
              <Link to="/login" className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200 ">
                Login
              </Link>
            ) : (
              <Link  className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200  " onClick={() => setShowLogoutModal(true)}>
                  Logout
              </Link>
            )}
          </div>
          <div>
            <Link to="/schedule" className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200 ">Schedule</Link>
          </div>
          
        </div>
        {user && (
              <Link to="/profile" className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200 "
                onClick={() => setNavComponents(false)}>
                Profile
              </Link>
            ) }

        {/* Hamburger Icon */}
        <div
          onClick={() => setNavComponents(true)}
          className="cursor-pointer text-2xl mr-3"
        >
          {NavComponents ? <FaTimes /> : <FaBars />}
        </div>

      </div>


      {NavComponents && (
        <div
          className={`overlay fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 bg-opacity-95 z-50 flex justify-evenly items-center ${
            isClosing ? "close" : "open"
          }`}
        >
          {/* Close Icon */}
          <button
            onClick={handleOverlayClose}
            className="absolute top-4 right-4 text-white text-3xl z-50"
          >
            <FaTimes />
          </button>

          {/* Navigation Links */}
          <div className="navComponent justify-center items-center w-fit">
            <ul className="flex flex-col w-fit justify-center items-center space-y-6">
              <li onClick={handleOverlayClose}>
                <Link to="/" className="px-4 py-2 rounded interactive-link">
                  Home
                </Link>
              </li>
              <li onClick={handleOverlayClose}>
                <Link to="/about" className="px-4 py-2 rounded interactive-link">
                  About
                </Link>
              </li>
              <li onClick={handleOverlayClose}>
                <Link to="/our_team" className="px-4 py-2 rounded interactive-link">
                  Our Team
                </Link>
              </li>
              <li onClick={handleOverlayClose}>
                <Link to="/campus_embassador" className="px-4 py-2 rounded interactive-link">
                  Embassador
                </Link>
              </li>
              <li onClick={handleOverlayClose}>
                <Link to="/pass" className="px-4 py-2 rounded interactive-link">
                  Pass
                </Link>
              </li>
              <li onClick={handleOverlayClose}>
                <Link to="/pronites" className="px-4 py-2 rounded interactive-link">
                  ProNites
                </Link>
              </li>
            </ul>
          </div>

          {/* Floating Image */}
          <div className="w-1/2 h-full relative hidden md:block">
            <img
              src="https://via.placeholder.com/300"
              alt="Overlay Visual"
              className="absolute right-10 top-1/4 w-3/4 max-w-sm animate-float"
            />
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;