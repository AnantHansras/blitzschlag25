import React, { useState } from "react";
import { read, auth, write } from '../scripts/firebase';
import { useNavigate } from 'react-router-dom';
import SingleComponent from "../Components/single";
import TeamComponent from "../Components/team";
import eventsData from '../scripts/eventData';
import { toast } from 'react-toastify';

const Events = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [activeTab, setActiveTab] = useState("flagship");
  const [teamCode, setTeamCode] = useState("");

  const checkUserLogin = () => {
    if (!user) {
      toast.error("Please log in first.", { autoClose: 5000 });
      navigate('/Auth');
      return false;
    }
    return true;
  };

  const handleJoinTeam = async () => {
    if (!checkUserLogin()) return;

    if (!teamCode) {
      toast.error("Invalid Team Code", { autoClose: 5000 });
      return;
    }

    const teamDoc = await read(`teams/${teamCode}`);
    if (!teamDoc) {
      toast.error("Team not found", { autoClose: 5000 });
      return;
    }

    const eventPath = teamDoc.event;
    if (!eventPath) {
      toast.error("Event data for this team is missing.", { autoClose: 5000 });
      return;
    }

    const eventDoc = await read(`events/${eventPath}`);
    if (!eventDoc) {
      toast.error("Event data is missing or incomplete.", { autoClose: 5000 });
      return;
    }

    const maxTeamSize = eventDoc.maxTeamSize;

    const userDoc = await read(`users/${user.uid}`);
    const registeredEvents = Array.isArray(userDoc?.joinedTeamsEvent) ? userDoc.joinedTeamsEvent : [];

    if (registeredEvents.some(event => event.eventpath === eventPath)) {
      toast.info("You have already joined a team for this event.", { autoClose: 5000 });
      return;
    }

    if (teamDoc.members.includes(user.uid)) {
      toast.info("You are already a member of this team.", { autoClose: 5000 });
      return;
    }

    if (teamDoc.members.length >= maxTeamSize) {
      toast.error("This team is full.", { autoClose: 5000 });
      return;
    }

    await write(
      `teams/${teamCode}`,
      {
        members: [...teamDoc.members, user.uid],
      },
      { merge: true }
    );

    await write(
      `users/${user.uid}`,
      {
        joinedTeamsEvent: [...registeredEvents, { eventpath: eventPath, teamCode }],
      },
      { merge: true }
    );

    toast.success("Successfully joined the team!", { autoClose: 5000 });
  };

  return (
    <div className="p-6 bg-[#0b0d10] text-white min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-12">Events</h1>
      <div className="mb-8 flex justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleJoinTeam();
          }}
          className="flex space-x-4"
        >
          <input
            type="text"
            placeholder="Enter Team Code"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            className="w-80 p-3 bg-[#1b1f24] border border-[#2c2f34] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Join Team
          </button>
        </form>
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        {Object.keys(eventsData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-[#1b1f24] text-gray-400 hover:bg-blue-400 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {eventsData[activeTab].map((event, index) => (
          event.type === "singleEvent" ? (
            <SingleComponent
              key={index}
              eventName={event.name}
              eventDescription={event.description}
              eventpath={event.eventPath}
              eventCategory = {event.category}
              eventDay={event.day}
              eventTime={event.time}
              eventPrize={event.prize}
              eventRules={event.rules}
              eventVenue={event.venue}
            />
          ) : (
            <TeamComponent
              key={index}
              eventName={event.name}
              eventDescription={event.description}
              eventpath={event.eventPath}
              eventCategory = {event.category}
              eventDay={event.day}
              eventTime={event.time}
              eventPrize={event.prize}
              eventRules={event.rules}
              eventVenue={event.venue}
            />
          )
        ))}
      </div>
    </div>
  );
};

export default Events;
