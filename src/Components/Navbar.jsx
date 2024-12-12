import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo Section */}
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          <Link to="/" onClick={() => setIsNavOpen(false)}>Logo</Link>
        </div>

        {/* Center Tabs for Desktop */}
        <div className="hidden md:flex items-center gap-x-6">
          <Link className="hover:text-blue-500 text-gray-700 dark:text-gray-200" to="/">Home</Link>
          <Link className="hover:text-blue-500 text-gray-700 dark:text-gray-200" to="/event">Events</Link>
          <Link className="hover:text-blue-500 text-gray-700 dark:text-gray-200" to="/sponsor">Sponsors</Link>
          <Link className="hover:text-blue-500 text-gray-700 dark:text-gray-200" to="/schedule">Schedule</Link>
        </div>

        {/* Hamburger Icon for All Devices */}
        <div
          className="cursor-pointer text-gray-900 dark:text-white text-2xl"
          onClick={toggleNav}
        >
          {isNavOpen ? '✖' : '☰'}
        </div>
      </div>

      {/* Hamburger Menu Content */}
      {isNavOpen && (
        <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 py-4 space-y-2">
          <Link
            className="text-gray-900 dark:text-white py-2 hover:text-blue-500"
            to="/"
            onClick={() => setIsNavOpen(false)}
          >
            Home
          </Link>
          <Link
            className="text-gray-900 dark:text-white py-2 hover:text-blue-500"
            to="/about"
            onClick={() => setIsNavOpen(false)}
          >
            About
          </Link>
          <Link
            className="text-gray-900 dark:text-white py-2 hover:text-blue-500"
            to="/event"
            onClick={() => setIsNavOpen(false)}
          >
            Events
          </Link>
          <Link
            className="text-gray-900 dark:text-white py-2 hover:text-blue-500"
            to="/sponsor"
            onClick={() => setIsNavOpen(false)}
          >
            Sponsors
          </Link>
          <Link
            className="text-gray-900 dark:text-white py-2 hover:text-blue-500"
            to="/schedule"
            onClick={() => setIsNavOpen(false)}
          >
            Schedule
          </Link>
          <Link
            className="text-gray-900 dark:text-white py-2 hover:text-blue-500"
            to="/login"
            onClick={() => setIsNavOpen(false)}
          >
            Login
          </Link>
          <Link
            className="text-gray-900 dark:text-white py-2 hover:text-blue-500"
            to="/profile"
            onClick={() => setIsNavOpen(false)}
          >
            Profile
          </Link>
          <Link
            className="text-gray-900 dark:text-white py-2 hover:text-blue-500"
            to="/campus_embassador"
            onClick={() => setIsNavOpen(false)}
          >
            Campus Ambassador
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
