import React, { useState } from 'react';
import Transition from '../transition';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase'; // Firebase initialization file
import loginbg from '../Assets/loginbg.jpg';
import { toast } from 'react-toastify'; // Import the toast function
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false); // For toggling forgot password
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility state

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

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/signinwithgoogle`, {
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

  const handleForgotPassword = async () => {
    setLoading(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
      setForgotPasswordMode(false); // Close the forgot password form
    } catch (error) {
      console.error('Error sending reset email:', error.message);
      toast.error('Failed to send password reset email. Please try again.');
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
        {forgotPasswordMode ? (
          // Forgot password form
          <div className="mt-4 mb-4 text-white">
            <h2 className="text-3xl mb-8 font-bold text-center">Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="placeholder-white bg-transparent w-full p-3 border-b-2 border-gray-300 outline-none"
            />
            <button
              onClick={handleForgotPassword}
              className="w-full mt-6 bg-transparent border-2 border-white text-white p-3 rounded-lg "
            >
              {loading ? 'Sending email...' : 'Send Reset Link'}
            </button>
            <p
              onClick={() => setForgotPasswordMode(false)}
              className="text-center text-blue-600 mt-2 cursor-pointer hover:underline"
            >
              Back to Login
            </p>
          </div>
        ) : (
          <>
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

              <div className="relative">
                <input
                  placeholder="Password"
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="placeholder-white bg-transparent w-full p-3 mt-2 border-b-2 border-gray-300 outline-none text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-5 text-white"
                >
                  {passwordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path strokeLinecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>

                  )}
                </button>
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
          </>
        )}

        {!forgotPasswordMode && (
          <p className="mt-6 text-white text-center">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        )}

        {!forgotPasswordMode && (
          <p
            onClick={() => setForgotPasswordMode(true)}
            className="mt-2 text-white text-center cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
        )}
      </div>
    </div>
  );
};

export default Transition(Login);
