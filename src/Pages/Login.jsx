import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ email: '', password: '', general: '' }); // Store error messages for inputs
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Check if the user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/profile'); // Redirect to profile page if user is already logged in
      } else {
        setLoading(false); // Set loading to false once the user state is checked
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, [auth, navigate]);

  const signWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate('/profile'); // Redirect on successful login
      })
      .catch((error) => {
        alert(`Google Sign-In Error: ${error.message}`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ email: '', password: '', general: '' }); // Reset error messages before submitting

    if (!email.includes('@')) {
      setError((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert('Login Successful');
        console.log(userCredential.user);
        navigate('/profile'); // Redirect on successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = '';

        // Handling specific Firebase errors
        if (errorCode === 'auth/user-not-found') {
          errorMessage = 'No user found with this email address';
          setError((prev) => ({ ...prev, email: errorMessage }));
        } else if (errorCode === 'auth/wrong-password') {
          errorMessage = 'Incorrect password';
          setError((prev) => ({ ...prev, password: errorMessage }));
        } else if (errorCode === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
          setError((prev) => ({ ...prev, email: errorMessage }));
        } else {
          errorMessage = 'Login failed. Please try again later.';
          setError((prev) => ({ ...prev, general: errorMessage }));
        }
      });
  };

  // If still loading (checking auth), show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!error.email} // Highlight input field if error exists
            helperText={error.email} // Show error message below input field
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={!!error.password} // Highlight input field if error exists
            helperText={error.password} // Show error message below input field
          />
          {error.general && (
            <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
              {error.general}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>

        <Box mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={signWithGoogle}
            sx={{ mb: 2 }}
          >
            Sign in with Google
          </Button>
        </Box>

        <Box>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" color="textSecondary">
              Don't have an account? Sign up
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
