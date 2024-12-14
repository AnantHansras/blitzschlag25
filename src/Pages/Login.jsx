import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { app,write } from '../scripts/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

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

  const signWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        await write(`users/${user.uid}`, {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
          joinedSingleEvent: {}, 
          joinedTeamsEvent: {}, 
        });
        navigate('/profile');
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
        navigate('/profile'); 
      })
      .catch((error) => {
        alert(`Login Error: ${error.message}`);
      });
  };

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
