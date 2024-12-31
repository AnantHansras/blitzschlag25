import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import app from '../../firebase'; // Import Firebase initialization

const baseurl = "http://localhost:5000/blitzschlag-25/us-central1/api";

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize the navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (pwd !== cpwd) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    // Initialize Firebase Authentication
    const auth = getAuth(app);

    try {
      // Create user with email and password using Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
      const user = userCredential.user;

      // Prepare the data to send to the backend
      const userData = {
        email,
        password: pwd,
        userName,
        uid: user.uid, // Send the UID to Firestore
      };

      // Send user data to the backend for Firestore storage
      const response = await fetch(`${baseurl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        // If successful, set success message and navigate to profile
        setSuccess(result.message);
        alert('Sign up successful!'); // Show an alert box
        console.log(result);
        navigate('/profile'); // Navigate to the profile page
      } else {
        // If backend error, display the error message
        setError(result.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      // Handle Firebase errors (e.g., weak password, email already in use)
      const errorCode = err.code;

      let errorMessage = '';
      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email is already in use. Please try logging in or use a different email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format. Please provide a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use a stronger password.';
          break;
        default:
          errorMessage = 'Failed to sign up. Please try again later.';
          break;
      }

      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="bg-white box-border flex flex-col justify-center items-center p-4">
      <form className="flex flex-col justify-center w-80 text-black" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 mb-2"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2"
        />
        <label htmlFor="pwd">Password</label>
        <input
          type="password"
          id="pwd"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="border p-2 mb-2"
        />
        <label htmlFor="cpwd">Confirm Password</label>
        <input
          type="password"
          id="cpwd"
          value={cpwd}
          onChange={(e) => setCpwd(e.target.value)}
          className="border p-2 mb-2"
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button className="bg-blue-900 text-white p-2 mt-2" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
