import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import logo from "../Assets/blitz_logo.png";
import { auth } from "../../firebase"; // Assuming you have a firebase.js file where auth is initialized
import "../css files/navbar.css";

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
    <div className="absolute w-full bg-[#C4C4C430] z-50 rounded-b-3xl py-3">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src={logo}
              alt="Blitz Logo"
              className="h-20 ml-3 absolute top-0"
            />
          </Link>
        </div>

        {/* Main Navigation (Visible in PC) */}
        <div
          className="hidden font-normal text-2xl text-[#D3D3D3] lg:flex justify-between items-center gap-x-7"
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
            <span
              className="px-4 py-2 hover:text-white hover:font-bold transition-all duration-200 cursor-pointer"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </span>
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
        <div
          onClick={toggleDrawer}
          className="cursor-pointer text-2xl px-4"
        >
          <FaBars />
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
        size={280}
      >
        <div className="flex flex-col items-left p-10 bg-black bg-opacity-80 h-full overflow-y-scroll">
          <Link
            to="/"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            About
          </Link>
          <Link
            to="/sponsor"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            Sponsor
          </Link>
          <Link
            to="/our_team"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            Our Team
          </Link>
          <Link
            to="/schedule"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            Schedule
          </Link>
          {user && (
            <Link
              to="/profile"
              className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
              onClick={toggleDrawer}
            >
              Profile
            </Link>
          )}
          <Link
            to="/campus_embassador"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            Campus Embassador
          </Link>
          <Link
            to="/pronites"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            ProNites
          </Link>
          <Link
            to="/model3d"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            3D Model
          </Link>
          <Link
            to="/pass"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
            Pass
          </Link>
          {!user ? (
            <>
              <Link
                to="/signup"
                className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
                onClick={toggleDrawer}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
                onClick={toggleDrawer}
              >
                Login
              </Link>
            </>
          ) : null}
          <Link
            to="/event"
            className="px-4 py-2 mb-4 text-xl hover:text-indigo-400"
            onClick={toggleDrawer}
          >
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

export default Navbar;
