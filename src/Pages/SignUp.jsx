import React, { useState, useEffect } from 'react';
import { app, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged } from 'firebase/auth';
import { TextField, Button, Typography, Container, Box, Snackbar, Alert } from '@mui/material';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [confirmPwdError, setConfirmPwdError] = useState('');
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Redirect to the profile page if already logged in
        navigate('/profile');
      } else {
        setLoading(false); // Set loading to false once the user state is checked
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Reset error states before validation
    setEmailError('');
    setPwdError('');
    setConfirmPwdError('');

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Validate password and confirmation
    if (pwd !== confirmPwd) {
      setConfirmPwdError('Passwords do not match');
      return;
    }
    if (pwd.length < 8) {
      setPwdError('Password must be at least 8 characters long');
      return;
    }

    try {
      // Check if an account already exists with the email
      const methods = await fetchSignInMethodsForEmail(auth, email);
    
      if (methods.length > 0) {
        // Email is already associated with an account
        setEmailError('An account with this email already exists.');
        setOpenSnackbar(true);
        setSnackbarMessage('An account with this email already exists.');
      } else {
        // No account exists, create a new account
        const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
        const user = userCredential.user;
        setOpenSnackbar(true);
        setSnackbarMessage('Account Created Successfully!');
        navigate('/'); // Redirect to home page after account creation
      }
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
      setSnackbarMessage('Error creating account: ' + error.message); // Handle errors gracefully
    }
  };

  // If still loading (checking auth), show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h5" gutterBottom>
          Create Account
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            error={!!pwdError}
            helperText={pwdError}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            error={!!confirmPwdError}
            helperText={confirmPwdError}
            required
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Create Account
          </Button>
        </form>
      </Box>

      {/* Snackbar for custom alerts */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
