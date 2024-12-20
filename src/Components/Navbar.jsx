
import React, { useEffect, useState } from "react";
import { auth } from "../scripts/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import "../css files/navbar.css";

const Navbar = () => {
  const [NavComponents, setNavComponents] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Move useNavigate here

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/Auth"); // Use navigate directly here
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="text-white relative">
      {NavComponents && (
        <div
          className="overlay fixed inset-0 bg-gradient-to-br from-gray-800 via-black to-gray-900 bg-opacity-95 z-50 flex justify-between items-center animate-fadeIn"
          onClick={() => setNavComponents(false)}
        >
          {/* Close Icon */}
          <button
            onClick={() => setNavComponents(false)}
            className="absolute top-4 right-4 text-white text-3xl z-50"
          >
            <FaTimes />
          </button>

          {/* Navigation Links */}
          <div
            className="flex flex-col justify-center items-center w-1/2 space-y-6"
            onClick={(e) => e.stopPropagation()} // Prevent closing on clicking links
          >
            <Link to="/" onClick={() => setNavComponents(false)} className="interactive-link">
              Home
            </Link>
            <Link to="/about" onClick={() => setNavComponents(false)} className="interactive-link">
              About
            </Link>
            {/* <Link to="/event" onClick={() => setNavComponents(false)} className="interactive-link">
              Events
            </Link>
            <Link to="/sponsor" onClick={() => setNavComponents(false)} className="interactive-link">
              Sponsors
            </Link> */}
            <Link
              to="/our_team"
              onClick={() => setNavComponents(false)}
              className="interactive-link"
            >
              Our Team
            </Link>
            {/* <Link
              to="/schedule"
              onClick={() => setNavComponents(false)}
              className="interactive-link"
            >
              Schedule
            </Link> */}
            <Link
              to="/campus_embassador"
              onClick={() => setNavComponents(false)}
              className="interactive-link"
            >
              Campus Ambassador
            </Link>
            <Link to="/pass" onClick={() => setNavComponents(false)} className="interactive-link">
              Passes
            </Link>
            <Link to="/pronight" onClick={() => setNavComponents(false)} className="interactive-link">
              Pro Nights
            </Link>
          </div>

          {/* Floating Image */}
          <div className="w-1/2 h-full relative">
            <img
              src="https://via.placeholder.com/300" // Replace with your image URL
              alt="Overlay Visual"
              className="absolute right-10 top-1/4 w-3/4 max-w-sm animate-float"
            />
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="flex justify-between items-center px-4 py-3">
        <div>
          <Link to="/">Logo</Link>
        </div>

        {/* Main Navigation (Visible in PC) */}
        <ul className="hidden lg:flex justify-between gap-x-3 bg-black rounded-xl p-2">
          <li>
            <Link to="/sponsor" className="hover:bg-black px-4 py-2 rounded">
              Sponsor
            </Link>
          </li>
          <li>
            <Link to="/event" className="hover:bg-black px-4 py-2 rounded">
              Events
            </Link>
          </li>
          <li>
            {!user ? (
              <Link to="/Auth" className="hover:bg-black px-4 py-2 rounded">
                Login
              </Link>
            ) : (
              <Link
                to="/"
                onClick={handleLogout}
                className="px-4 py-2 rounded"
              >
                Logout
              </Link>
            )}
          </li>
          <li className="flex gap-x-4">
            {user ? (
              <Link
                to="/profile"
                onClick={() => setNavComponents(false)}
                className="px-4 py-2 rounded"
              >
                Profile
              </Link>
            ) : null}
            <Link
              to="/schedule"
              className="hover:bg-black px-4 py-2 rounded"
            >
              Schedule
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div
          onClick={() => setNavComponents((prev) => !prev)}
          className="cursor-pointer text-2xl"
        >
          {NavComponents ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;