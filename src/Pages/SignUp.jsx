import { React, useState, useEffect } from 'react';
import { app, auth, write } from '../scripts/firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged, updateProfile } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [name, setName] = useState(''); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/profile');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== confirmPwd) {
      alert("Password and Confirm Password are not the same");
      return;
    }
    if (pwd.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
    
      if (methods.length > 0) {
        alert("An account with this email already exists.");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
        const user = userCredential.user;
    
        // Update user profile with name
        await updateProfile(user, { displayName: name });
    
        alert("Account Created Successfully!");
    
        // Write user data to the database
        await write(`users/${user.uid}`, {
          email: user.email,
          name: name,
          joinedSingleEvent: {}, 
          joinedTeamsEvent: {},
        });
    
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already in use.");
      } else if (error.code === 'auth/weak-password') {
        alert("Password is too weak.");
      } else {
        alert("Error creating account: " + error.message);
      }
    }    
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          required
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
          type="password"
          required
          id="pwd"
          placeholder="********"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <br />
        <label htmlFor="confirmpwd">Confirm Password</label>
        <br />
        <input
          type="password"
          required
          id="confirmpwd"
          placeholder="********"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
        />
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignUp;
