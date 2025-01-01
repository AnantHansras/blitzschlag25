import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import app from '../../firebase'; // Import Firebase initialization
import loginbg from '../Assets/loginbg.jpg'; // Import the background image
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify functions
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const baseurl = "http://localhost:5000/blitzschlag-25/us-central1/api";

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [cpwd, setCpwd] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate(); // Initialize the navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (pwd !== cpwd) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
    setError('');

    // Initialize Firebase Authentication
    const auth = getAuth(app);
    setLoading(true); // Set loading to true when submitting

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
        toast.success(result.message || 'Sign up successful!');
        navigate('/profile'); // Navigate to the profile page
      } else {
        // If backend error, display the error message
        setError(result.message || 'Something went wrong. Please try again.');
        toast.error(result.message || 'Something went wrong. Please try again.');
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
      toast.error(errorMessage); // Show toast for error
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false after submission finishes
    }
  };

  return (
    <div
      className="bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginbg})`,
        height: '100vh', // Ensure it covers the full height of the screen
      }}
    >
      <div className="box-border flex flex-col justify-center items-center p-4 text-white">
        <div className="bg-black opacity-80 p-12 rounded-2xl flex flex-col justify-center shadow-xl min-w-96 mt-16">
          <form className="flex flex-col justify-center space-y-6" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold text-center">Sign Up</h2>

            <div>
              <input
                placeholder="Username"
                type="text"
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="placeholder-white bg-transparent w-full p-3  border-b-2 border-gray-300 outline-none text-white"
                required
              />
            </div>

            <div>
              <input
                placeholder="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder-white bg-transparent w-full p-3 border-b-2 border-gray-300 outline-none text-white"
                required
              />
            </div>

            <div>
              <input
                placeholder="Password"
                type="password"
                id="pwd"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="placeholder-white bg-transparent w-full p-3  border-b-2 border-gray-300 outline-none text-white"
                required
              />
            </div>

            <div>
              <input
                placeholder="Confirm Password"
                type="password"
                id="cpwd"
                value={cpwd}
                onChange={(e) => setCpwd(e.target.value)}
                className="placeholder-white bg-transparent w-full p-3 border-b-2 border-gray-300 outline-none text-white"
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              type="submit"
              className={`w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4 ${loading && 'opacity-50'}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-white text-center">
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/login')} // Navigate to login page
            >
              Login
            </span>
          </p>

        </div>
      </div>

      {/* Toast container for showing notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SignUp;
