import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {auth} from '../scripts/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [NavComponents, setNavComponents] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      {NavComponents ? (
        <div className="flex flex-col justify-center items-center">
          <Link to="/" onClick={() => setNavComponents(false)}>Home</Link>
          <Link to="/about" onClick={() => setNavComponents(false)}>About</Link>
          <Link to="/event" onClick={() => setNavComponents(false)}>Events</Link>
          <Link to="/sponsor" onClick={() => setNavComponents(false)}>Sponsors</Link>
          <Link to="/our_team" onClick={() => setNavComponents(false)}>Our Team</Link>
          <Link to="/schedule" onClick={() => setNavComponents(false)}>Schedule</Link>
          <Link to="/campus_embassador" onClick={() => setNavComponents(false)}>Campus Ambassador</Link>
        </div>
      ) : (
        <div className="flex justify-between">
          <div>
            <Link to="/">Logo</Link>
          </div>

          <div className="flex justify-between gap-x-3">
            <Link to="/sponsor">Sponsor</Link>
            <Link to="/event">Events</Link>
            {!user ? (
              <Link to="/login">Login</Link>
            ) : (
              <Link to='/' onClick={handleLogout}>
                Logout
              </Link>
            )}
            {user ? <Link to="/profile" onClick={() => setNavComponents(false)}>Profile</Link> : null}
            <Link to="/schedule">Schedule</Link>
          </div>

          <div onClick={() => setNavComponents(true)} className="cursor-pointer">
            Hamburger
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
