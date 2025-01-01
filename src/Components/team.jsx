import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase"; // Import Firebase auth

const TeamComponent = ({ event }) => {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]); // This can be populated by fetching existing teams if needed
  const [uid, setUid] = useState(null);

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
      const response = await fetch('http://localhost:5000/blitzschlag-25/us-central1/api/createteam', {
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
      if (response.ok) {
        toast.success("Team created successfully!");
        setTeamName('');
      } else {
        toast.error(data.message || "Failed to create team.");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("An error occurred while creating the team.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async (teamCode) => {
    if (loading) return;

    if (!uid) {
      toast.error("User not logged in.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/jointeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          teamCode,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Successfully joined the team!");
      } else {
        toast.error(data.message || "Failed to join team.");
      }
    } catch (error) {
      console.error("Error joining team:", error);
      toast.error("An error occurred while joining the team.");
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
