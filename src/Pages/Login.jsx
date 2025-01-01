import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase'; // Firebase initialization file
import loginbg from '../Assets/loginbg.jpg';
import { toast } from 'react-toastify';  // Import the toast function
import 'react-toastify/dist/ReactToastify.css';  // Import toast CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log('User logged in:', user);
      alert('Login successful!');
      navigate('/profile'); // Navigate to profile on successful login
    } catch (error) {
      console.error('Error logging in:', error.message);

      let errorMessage = '';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format.';
          break;
        default:
          errorMessage = 'Failed to log in. Please try again.';
          break;
      }
      setError(errorMessage);

      // Show the error message as a toast
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('User logged in with Google:', user);

      const response = await fetch('http://localhost:5000/blitzschlag-25/us-central1/api/signinwithgoogle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          userName: user.displayName || 'Anonymous',
          email: user.email,
        }),
      });

      const contentType = response.headers.get('Content-Type');
      let data = null;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        throw new Error('Invalid response format from server');
      }

      if (response.ok && data.success !== false) {
        console.log('Backend response:', data);
        toast.success(data.message || 'Login with Google successful!');
        navigate('/profile'); // Navigate to profile on successful login
      } else {
        console.error('Backend error:', data);
        toast.error(data.message || 'Failed to sign in with Google.');
        setError(data.message || 'Failed to sign in with Google.');
      }
    } catch (error) {
      console.error('Error logging in with Google:', error.message);
      toast.error('Failed to log in with Google. Please try again.');
      setError('Failed to log in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
      className="box-border flex flex-col justify-center items-center p-4 text-black"
    >
      <div className="bg-black opacity-80 p-12 rounded-2xl flex flex-col justify-center shadow-xl min-w-96 mt-8">
        <form className="flex flex-col justify-center space-y-6" onSubmit={handleLogin}>
          <h2 className="text-3xl font-bold text-white text-center">Login</h2>

          <div>
            <input
              autoComplete="off"
              placeholder="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder-white bg-transparent w-full p-3 mt-2 border-b-2 border-gray-300 outline-none text-white"
              required
            />
          </div>

          <div>
            <input
              placeholder="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="placeholder-white bg-transparent w-full p-3 mt-2 border-b-2 border-gray-300 outline-none text-white"
              required
            />
          </div>

          <button
            className={`w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4 ${loading && 'opacity-50'}`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity=".25" />
                  <path d="M4 12a8 8 0 1 1 8 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>

        </form>

        <button
          className={`w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity=".25" />
                <path d="M4 12a8 8 0 1 1 8 8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Signing in with Google...
            </div>
          ) : (
            'Sign in with Google'
          )}
        </button>

        <p className="mt-6 text-white text-center">
          Don't have an account?{' '}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
