import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import logo from "../Assets/blitz_logo.png";
import { auth } from "../../firebase"; // Assuming you have a firebase.js file where auth is initialized
import "../css files/navbar.css";
import {
  FaHome,
  FaInfoCircle,
  FaUser,
  FaCalendarAlt,
  FaUsers,
  FaHandHoldingHeart,
  FaSignInAlt,
  FaSignOutAlt,
  FaTicketAlt,
  FaCubes,
  FaMusic,
} from "react-icons/fa";
import styled from "styled-components";
import { Check } from "lucide-react";

const Checkbox = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const handleChange = () => {
    setIsDrawerOpen(!isDrawerOpen); // Toggle drawer state
  };

  return (
    <StyledWrapper>
      <label className="hamburger">
        <input
          type="checkbox"
          checked={isDrawerOpen}
          onChange={handleChange} // Toggle state on change
        />
        <svg viewBox="0 0 32 32">
          <path
            className="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
          />
          <path className="line" d="M7 16 27 16" />
        </svg>
      </label>
    </StyledWrapper>
  );
};

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutModal(false);
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="absolute w-full z-50 bg-transparent py-3">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Blitz Logo"
              className="h-20 p-1 ml-3 absolute top-0"
            />
          </Link>
        </div>

        {/* Main Navigation (Visible in PC) */}
        <div
          className="hidden relative p-2 -top-3 font-normal text-2xl bg-[#C4C4C430] rounded-b-xl  text-[#D3D3D3] lg:flex justify-between items-center gap-x-7"
          style={{ fontFamily: "'Jaro', sans-serif" }}
        >
          <Link
            to="/sponsor"
            className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200"
          >
            Sponsor
          </Link>
          <Link
            to="/event"
            className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200"
          >
            Events
          </Link>
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200"
            >
              Login
            </Link>
          ) : (
            <></>
          )}
          {user && (
            <Link
              to="/profile"
              className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200"
            >
              Profile
            </Link>
          )}
          <Link
            to="/schedule"
            className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200"
          >
            Schedule
          </Link>
        </div>

        {/* Drawer Icon */}
        <div onClick={toggleDrawer} className="cursor-pointer text-2xl px-4">
          <Checkbox
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        </div>
      </div>

      {/* Drawer for Mobile Navigation */}
      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="right"
        style={{
          backgroundColor: "transparent", // Custom background color
        }}
        size={300}
      >
        <div className="flex flex-col items-left p-10 bg-black bg-opacity-100 h-full overflow-y-scroll">
          <Link
            to="/"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaHome className="mr-2" />
            Home
          </Link>
          <Link
            to="/about"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaInfoCircle className="mr-2" />
            About
          </Link>
          <Link
            to="/sponsor"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaHandHoldingHeart className="mr-2" />
            Sponsor
          </Link>
          <Link
            to="/our_team"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaUsers className="mr-2" />
            Our Team
          </Link>
          <Link
            to="/schedule"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaCalendarAlt className="mr-2" />
            Schedule
          </Link>
          {user && (
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
              onClick={toggleDrawer}
            >
              <FaUser className="mr-2" />
              Profile
            </Link>
          )}
          <Link
            to="/campus_embassador"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaUsers className="mr-2" />
            Embassador
          </Link>
          <Link
            to="/pronites"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaMusic className="mr-2" />
            ProNites
          </Link>
          <Link
            to="/pass"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaTicketAlt className="mr-2" />
            Pass
          </Link>
          {!user ? (
            <>
              <Link
                to="/signup"
                className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
                onClick={toggleDrawer}
              >
                <FaSignOutAlt className="mr-2" />
                Sign Up
              </Link>
              <Link
                to="/login"
                className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
                onClick={toggleDrawer}
              >
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            </>
          ) : null}
          <Link
            to="/event"
            className="flex items-center px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            <FaCalendarAlt className="mr-2" />
            Event
          </Link>
        </div>
      </Drawer>

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

const StyledWrapper = styled.div`
  .hamburger {
    cursor: pointer;
    display: inline-block;
    position: relative; /* Ensures proper stacking */
    z-index: 9999; /* Ensures it's above the navbar or drawer */
    width: 50px;
    height: 50px;
  }

  .hamburger input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Hides the checkbox but keeps it clickable */
    cursor: pointer;
    z-index: 9999; /* Ensures it's clickable */
  }

  .hamburger svg {
    width: 100%;
    height: 100%;
    z-index: 9999; /* Ensures the icon is visible above other elements */
    transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .line-top-bottom {
    stroke-dasharray: 12 63;
  }

  .hamburger input:checked + svg {
    transform: rotate(-45deg); /* Cross effect */
  }

  .hamburger input:checked + svg .line-top-bottom {
    stroke-dasharray: 20 300;
    stroke-dashoffset: -32.42;
  }
`;



export default Navbar;
