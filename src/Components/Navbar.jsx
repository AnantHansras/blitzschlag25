import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => {
  const [NavComponents, setNavComponents] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null); // For Menu anchor element

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Logo</Link>
        </Typography>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about" sx={{ marginRight: 2 }}>
            About
          </Button>
          <Button color="inherit" component={Link} to="/event" sx={{ marginRight: 2 }}>
            Events
          </Button>
          <Button color="inherit" component={Link} to="/sponsor" sx={{ marginRight: 2 }}>
            Sponsors
          </Button>
          <Button color="inherit" component={Link} to="/our_team" sx={{ marginRight: 2 }}>
            Our Team
          </Button>
          <Button color="inherit" component={Link} to="/schedule" sx={{ marginRight: 2 }}>
            Schedule
          </Button>
          
          {/* Conditional rendering for Login and Logout */}
          {!user ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
          {user && (
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          )}
        </Box>

        {/* Hamburger Menu for smaller screens */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => setNavComponents(false)}>
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
          </MenuItem>
          <MenuItem onClick={() => setNavComponents(false)}>
            <Link to="/about" style={{ textDecoration: 'none' }}>About</Link>
          </MenuItem>
          <MenuItem onClick={() => setNavComponents(false)}>
            <Link to="/event" style={{ textDecoration: 'none' }}>Events</Link>
          </MenuItem>
          <MenuItem onClick={() => setNavComponents(false)}>
            <Link to="/sponsor" style={{ textDecoration: 'none' }}>Sponsors</Link>
          </MenuItem>
          <MenuItem onClick={() => setNavComponents(false)}>
            <Link to="/our_team" style={{ textDecoration: 'none' }}>Our Team</Link>
          </MenuItem>
          <MenuItem onClick={() => setNavComponents(false)}>
            <Link to="/schedule" style={{ textDecoration: 'none' }}>Schedule</Link>
          </MenuItem>
          {!user ? (
            <MenuItem onClick={handleMenuClose}>
              <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            </MenuItem>
          ) : (
            <>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
