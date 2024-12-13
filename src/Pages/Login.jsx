import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to check auth status
  const navigate = useNavigate(); // Hook moved inside the component
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
    if (!email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Login Successful");
        console.log(userCredential.user);
        navigate('/profile'); // Redirect on successful login
      })
      .catch((error) => {
        alert(`Login Error: ${error.message}`);
      });
  };

  // If still loading (checking auth), show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          required
          id="email"
          placeholder="example@mail.com"
          type="email"
          className="mt-2 border-2 border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="pwd">Password</label>
        <br />
        <input
          required
          id="pwd"
          placeholder="********"
          type="password"
          className="mt-2 border-2 border-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="border-2 p-2 border-black mt-1">
          Sign In
        </button>
        <br />
      </form>
      <button onClick={signWithGoogle} className="border-2 p-2 border-black mt-1">Sign in with Google</button>
      <br />
      <Link to="/signup">Sign up</Link>
    </div>
  );
};

export default Login;
