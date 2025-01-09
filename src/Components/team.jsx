import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase'; // Import Firebase auth

const TeamComponent = ({ event }) => {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(null); // Store the UID here

  // Fetch the current user's UID when the component mounts
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid); // Set UID when the user is logged in
    } else {
      toast.error("User not logged in.");
    }
  }, []);

  const handleCreateTeam = async () => {
    if (!teamName || loading) return;
  
    if (!uid) {
      toast.error("User not logged in.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/createteam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          eventPath: event.eventPath,
          teamName,
        }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        // Check if the error message indicates email is not verified
        if (data.message && data.message.toLowerCase().includes("email is not verified")) {
          toast.error("Your email is not verified. Please verify your email to create a team.");
        } else {
          toast.error(data.message || "Failed to create team.");
        }
      } else {
        toast.success("Team created successfully!");
        // Abhinav
        alert(data.code);
        setTeamName(''); // Clear the team name after success
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("An error occurred while creating the team.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h3>Create Team</h3>

      {/* Create Team Form */}
      <div>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Enter your team name"
          className="placeholder-white bg-transparent w-full p-3 mt-2 border-b-2 border-gray-300 outline-none text-white"
        />
        <button
          onClick={handleCreateTeam}
          disabled={loading}
          className={`w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4 ${loading && 'opacity-50'}`}
        >
          {loading ? "Creating Team..." : "Create Team"}
        </button>
      </div>
    </div>
  );
};

export default TeamComponent;
