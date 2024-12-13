import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile, sendEmailVerification } from 'firebase/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  // Fetch current user info when the component mounts
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.displayName || '');
      setEmailVerified(currentUser.emailVerified);
      setLoading(false);
    } else {
      navigate('/login');
    }
  }, [auth, navigate]);

  const handleUpdateProfile = async () => {
    if (!name) {
      alert('Name is required!');
      return;
    }

    try {
      // Update display name
      await updateProfile(auth.currentUser, { displayName: name });
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      alert('Verification email sent!');
    } catch (error) {
      alert('Error sending verification email: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={user.email}
            disabled // Make email field read-only
            readOnly
          />
        </div>
        <div>
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      </form>

      <div>
        <p>Email Verified: {emailVerified ? 'Yes' : 'No'}</p>
        {!emailVerified && (
          <button onClick={handleVerifyEmail}>Verify Email</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
