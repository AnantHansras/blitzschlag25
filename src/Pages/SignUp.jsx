import { React, useState, useEffect } from 'react';
import { app, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged } from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [loading, setLoading] = useState(true); // Loading state to check auth status
  const navigate = useNavigate(); // Correct placement inside the component

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

    // Validate password and confirmation
    if (pwd !== confirmPwd) {
      alert("Password and Confirm Password are not the same");
      return; // Stop execution if passwords do not match
    }
    if (pwd.length < 8) {
      alert("Password must be at least 8 characters long");
      return; // Stop execution if password is too short
    }

    try {
      // Check if an account already exists with the email
      const methods = await fetchSignInMethodsForEmail(auth, email);
    
      if (methods.length > 0) {
        // Email is already associated with an account
        alert("An account with this email already exists.");
      } else {
        // No account exists, create a new account
        const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
        const user = userCredential.user;
        alert("Account Created Successfully!");
        navigate("/"); // Redirect to home page after account creation
      }
    } catch (error) {
      console.error(error);
      alert("Error creating account: " + error.message); // Handle errors gracefully
    }
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
