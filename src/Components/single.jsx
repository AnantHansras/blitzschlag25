import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase'; // Import the auth module
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged to listen to auth state changes

const SingleComponent = ({ event }) => {
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null); // Store the UID here

  // Fetch the current user's UID when the component mounts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid); // Set UID when the user is logged in
      } else {
        toast.error("User not logged in.");
      }
    });

    return () => unsubscribe(); // Clean up on component unmount
  }, []);

  const handleRegister = async () => {
    if (loading) return; // Prevent multiple submissions

    if (!uid) {
      toast.error('User is not logged in.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('${import.meta.env.VITE_API_BASE_URL}/joinevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          eventPath: event.eventPath,
        }),
      });

      const data = await response.json();

      // Check if the server response contains a "not verified" message
      if (!response.ok) {
        if (data.message && data.message.includes("email is not verified")) {
          toast.error(data.message); // This should now show the correct error message
        } else {
          toast.error(data.message || 'Failed to register.');
        }
        return;
      }
      

      toast.success('Successfully registered for the event!');
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error('An error occurred while registering.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleRegister}
        disabled={loading}
        className={`w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4 ${loading && 'opacity-50'}`}
      >
        {loading ? 'Registering...' : 'Register for Event'}
      </button>
    </div>
  );
};

export default SingleComponent;
