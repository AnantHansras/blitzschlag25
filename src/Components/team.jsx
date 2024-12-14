import { React, useState } from 'react';
import { read, auth, write } from '../scripts/firebase';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const TeamComponent = ({ eventpath }) => {
  const user = auth.currentUser;
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");

  const checkUserLogin = () => {
    if (!user) {
      alert("Please log in first.");
      navigate('/login'); // Use navigate to redirect to the login page
      return false;
    }
    return true;
  };

  const handleCreateTeam = async () => {
    if (!checkUserLogin()) return; // Check if the user is logged in

    if (!teamName) {
      alert("Invalid Team Name");
      return;
    }

    const userDoc = await read(`users/${user.uid}`);
    const registeredEvents = Array.isArray(userDoc?.joinedTeamsEvent) ? userDoc.joinedTeamsEvent : [];

    // Check if the user is already registered for the event
    if (registeredEvents.includes(eventpath)) {
      alert("Already Registered For this Event");
      return;
    }

    // Create a unique team code
    const newTeamCode = uuidv4();

    // Create the team document
    await write(`teams/${newTeamCode}`, {
      name: teamName,
      event: eventpath,
      members: [user.uid],
    });

    // Update the event document with the new team
    await write(`events/${eventpath}`, {
      registeredTeams: { [newTeamCode]: true }, // Add team to the event
    });

    // Update user document to track their registration in the event
    await write(`users/${user.uid}`, {
      joinedTeamsEvent: [...registeredEvents, eventpath], // Add event to the user's list
    });

    alert("Team created and registered successfully!");
  };

  const handleJoinTeam = async () => {
    if (!checkUserLogin()) return; // Check if the user is logged in

    if (!teamCode) {
      alert("Invalid Team Code");
      return;
    }

    // Check if the team exists
    const teamDoc = await read(`teams/${teamCode}`);
    if (!teamDoc) {
      alert("Team not found");
      return;
    }

    // Retrieve event data to check the max team size
    const eventDoc = await read(`events/${eventpath}`);
    if (!eventDoc || !eventDoc.maxTeamSize) {
      alert("Event data is missing or incomplete.");
      return;
    }

    const maxTeamSize = eventDoc.maxTeamSize;

    // Check if the user is already part of the team
    if (teamDoc.members.includes(user.uid)) {
      alert("You are already a member of this team");
      return;
    }

    // Check if the team has reached the max size
    if (teamDoc.members.length >= maxTeamSize) {
      alert("This team is full.");
      return;
    }

    // Add the user to the team's members
    await write(`teams/${teamCode}`, {
      members: [...teamDoc.members, user.uid],
    });

    // Update the user document to track the team registration
    const userDoc = await read(`users/${user.uid}`);
    const registeredEvents = Array.isArray(userDoc?.joinedTeamsEvent) ? userDoc.joinedTeamsEvent : [];
    if (!registeredEvents.includes(eventpath)) {
      await write(`users/${user.uid}`, {
        joinedTeamsEvent: [...registeredEvents, eventpath], // Add event to the user's list
      });
    }

    alert("Successfully joined the team!");
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateTeam(); }}>
        <input
          type="text"
          placeholder="Enter Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button type="submit">Create Team</button>
      </form>

      <form onSubmit={(e) => { e.preventDefault(); handleJoinTeam(); }}>
        <input
          type="text"
          placeholder="Enter Team Code"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
        />
        <button type="submit">Join Team</button>
      </form>
    </div>
  );
};

export default TeamComponent;
