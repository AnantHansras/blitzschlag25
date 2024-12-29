import React, { useState, useEffect } from 'react';
import loginImg from '../Assets/loginbg.jpg';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { app, write, read } from '../scripts/firebase';
import { toast } from 'react-toastify';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    semail: '',
    spassword: '',
  });
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/profile');
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    const { name, semail, spassword } = formData;

    if (spassword.length < 8) {
      toast.error('Password must be at least 8 characters long', { autoClose: 5000 });
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, semail);
      if (methods.length > 0) {
        toast.error('An account with this email already exists.', { autoClose: 5000 });
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, semail, spassword);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      await write(`users/${user.uid}`, {
        email: user.email,
        name: name,
        joinedSingleEvent: {},
        joinedTeamsEvent: {},
      });

      toast.success('Account Created Successfully!', { autoClose: 5000 });
      navigate('/profile');
    } catch (error) {
      toast.error(`Error creating account: ${error.message}`, { autoClose: 5000 });
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address', { autoClose: 5000 });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login Successful', { autoClose: 5000 });
      navigate('/profile');
    } catch (error) {
      toast.error(`Login Error: ${error.message}`, { autoClose: 5000 });
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const methods = await fetchSignInMethodsForEmail(auth, user.email);
      if (methods.length > 0 && !methods.includes('google.com')) {
        toast.error(
          'This email is already registered with a different method. Please log in using that method.',
          { autoClose: 5000 }
        );
        return;
      }

      const userRef = await read(`users/${user.uid}`);
      if (!userRef) {
        await write(`users/${user.uid}`, {
          email: user.email,
          name: user.displayName || user.email.split('@')[0],
          joinedSingleEvent: {},
          joinedTeamsEvent: {},
        });
      }

      toast.success('Google Sign-In Successful', { autoClose: 5000 });
      navigate('/profile');
    } catch (error) {
      toast.error(`Google Sign-In Error: ${error.message}`, { autoClose: 5000 });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-75"
        style={{ backgroundImage: `url(${loginImg})` }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg shadow-lg overflow-hidden max-w-6xl w-full p-6">
        {/* Login Form */}
        <div className="p-8 bg-black bg-opacity-60 rounded-lg text-white flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-6">LOGIN</h2>
          <form onSubmit={handleEmailSignIn} className="space-y-6 w-full max-w-md">
            <div>
              <input
                id="email"
                name="email"
                className="placeholder:text-white w-full px-4 py-2 bg-transparent border-b-2 border-black rounded-none text-white focus:ring-2 focus:ring-blue-400"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Email Address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                className="placeholder:text-white w-full px-4 py-2 bg-transparent border-b-2 border-black rounded-none text-white focus:ring-2 focus:ring-blue-400"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-transparent border-2 rounded text-white font-semibold transition-transform transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="max-w-md w-full py-2 mt-4 bg-transparent border-2 rounded text-white font-medium transition-transform transform hover:scale-105"
          >
            Sign in with Google
          </button>
        </div>

        {/* Register Form */}
        <div className="p-8 bg-black bg-opacity-60 rounded-lg text-white flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold mb-6">REGISTER</h2>
          <form onSubmit={handleEmailSignUp} className="space-y-6 w-full max-w-md">
            <div>
              <input
                id="name"
                name="name"
                className="placeholder:text-white w-full px-4 py-2 bg-transparent border-b-2 border-black rounded-none text-white focus:ring-2 focus:ring-blue-400"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Name"
              />
            </div>
            <div>
              <input
                id="semail"
                name="semail"
                className="placeholder:text-white w-full px-4 py-2 bg-transparent border-b-2 border-black rounded-none text-white focus:ring-2 focus:ring-blue-400"
                type="email"
                value={formData.semail}
                onChange={handleInputChange}
                required
                placeholder="Email Address"
              />
            </div>
            <div>
              <input
                id="spassword"
                name="spassword"
                className="placeholder:text-white w-full px-4 py-2 bg-transparent border-b-2 border-black rounded-none text-white focus:ring-2 focus:ring-blue-400"
                type="password"
                value={formData.spassword}
                onChange={handleInputChange}
                required
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-transparent border-2 rounded text-white font-semibold transition-transform transform hover:scale-105"
            >
              Create Account
            </button>
          </form>
          <button
            onClick={handleGoogleSignIn}
            className="max-w-md w-full py-2 mt-4 bg-transparent border-2 rounded text-white font-medium transition-transform transform hover:scale-105"
          >
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
