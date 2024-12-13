import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile, sendEmailVerification, signOut } from 'firebase/auth';
import { TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Fetch current user info when the component mounts
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.displayName || '');
      setEmailVerified(currentUser.emailVerified);
      setLoading(false);
    } else {
      navigate('/login');
    }

    // Listen for sign-out event in other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'authState' && e.newValue === 'loggedOut') {
        signOut(auth).then(() => {
          console.log('User logged out from another tab');
          navigate('/login');
        }).catch((error) => {
          console.error('Error logging out: ', error);
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [auth, navigate]);

  const handleUpdateProfile = async () => {
    if (!name) {
      setError('Name is required!');
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName: name });
      alert('Profile updated successfully');
    } catch (error) {
      setError('Error updating profile: ' + error.message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      alert('Verification email sent!');
    } catch (error) {
      setError('Error sending verification email: ' + error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.setItem('authState', 'loggedOut');
      console.log('User logged out');
      navigate('/login');
    }).catch((error) => {
      setError('Error logging out: ' + error.message);
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '80%', maxWidth: 600, margin: '0 auto', paddingTop: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Profile Page
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={(e) => e.preventDefault()}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={user.email}
          disabled
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateProfile}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Update Profile
        </Button>
      </form>

      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Typography variant="body1">Email Verified: {emailVerified ? 'Yes' : 'No'}</Typography>
        {!emailVerified && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleVerifyEmail}
            sx={{ marginTop: 1 }}
          >
            Verify Email
          </Button>
        )}
      </Box>

      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
