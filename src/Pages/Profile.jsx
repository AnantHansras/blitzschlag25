import React, { useEffect, useState } from 'react';
import { getAuth, signOut, sendEmailVerification } from 'firebase/auth';
import app from '../../firebase'; // Your Firebase initialization file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [apiData, setApiData] = useState(null); // State to store API data
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  // Load user data on mount
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmailVerified(currentUser.emailVerified);

      // Fetch additional data from API
      fetchProfileData(currentUser.uid);
    }
  }, [auth]);

  const fetchProfileData = async (uid) => {
    try {
      const response = await fetch('http://localhost:5000/blitzschlag-25/us-central1/api/profile', {
        method: 'POST', // Use POST if your API requires it
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
      });

      const result = await response.json();
      if (response.ok) {
        setApiData(result.data); // Assuming API returns a 'data' field
      } else {
        console.error('Error fetching profile data:', result.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle email verification
  const handleVerifyEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        setMessage('Verification email sent! Check your inbox.');
      } catch (error) {
        console.error('Error sending verification email:', error.message);
        setMessage('Failed to send verification email.');
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setMessage('Logged out successfully.');
    } catch (error) {
      console.error('Error logging out:', error.message);
      setMessage('Failed to log out.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow-md w-96 mx-auto text-center text-black">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Email Verified:</strong>{' '}
          {emailVerified ? (
            <span className="text-green-600">Yes</span>
          ) : (
            <span className="text-red-600">No</span>
          )}
        </p>
        {apiData && (
          <>
            <p>
              <strong>Username:</strong> {apiData.userName}
            </p>
            <p>
              <strong>College Name:</strong> {apiData.collegeName || 'Not Provided'}
            </p>
            <p>
              <strong>Joined Events:</strong> {apiData.joinedEvents.join(', ') || 'None'}
            </p>
            <p>
              <strong>Joined Teams:</strong> {apiData.joinedTeams.join(', ') || 'None'}
            </p>
          </>
        )}
        {message && <p className="text-blue-600">{message}</p>}
      </div>
      {!emailVerified && (
        <button
          onClick={handleVerifyEmail}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-700"
        >
          Verify Email
        </button>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
