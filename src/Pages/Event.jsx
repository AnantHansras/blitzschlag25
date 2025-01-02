import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import eventData from "../data/eventData"; // Import your event data
import SingleComponent from "../Components/single"; // For single registration
import TeamComponent from "../Components/team"; // For team registration
import eventbg from "../Assets/eventbg.jpg"; // Import your background image
import { auth } from "../../firebase"; // Import auth from Firebase

// Drawer Component for Event Details
const Drawer = ({ show, onClose, eventDetails, uid }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 w-3/4 md:w-1/2 rounded-lg shadow-lg relative text-white p-8">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-2xl font-bold hover:text-red-600"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">{eventDetails.name}</h2>
        <p className="mb-4">{eventDetails.description}</p>
        <p>
          <strong>Venue:</strong> {eventDetails.venue}
        </p>
        <p>
          <strong>Max Team Size:</strong> {eventDetails.maxTeamSize}
        </p>
        <p>
          <strong>Category:</strong> {eventDetails.type}
        </p>

        {/* Render SingleComponent or TeamComponent based on maxTeamSize */}
        <div className="mt-6">
          {eventDetails.maxTeamSize === 1 ? (
            <SingleComponent event={eventDetails} uid={uid} />
          ) : (
            <TeamComponent event={eventDetails} uid={uid} />
          )}
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const [uid, setUid] = useState(null); // State for storing the UID
  const [activeTab, setActiveTab] = useState("flagship"); // Active tab for event category
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Store the selected event for the drawer
  const [teamCode, setTeamCode] = useState(""); // For capturing team code input
  const [loading, setLoading] = useState(false); // For loading state on Join Team action

  // Fetch the current user's UID from Firebase on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid); // Set the UID if the user is logged in
      } else {
        setUid(null); // If no user is logged in, set UID to null
      }
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  // Filter events by the selected category
  const filteredEvents = Object.values(eventData).filter(event => event.type === activeTab);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle Join Team action
  const handleJoinTeam = async () => {
    if (!uid) {
      toast.error("You must be logged in to join a team.");
      return;
    }
  
    if (!teamCode) {
      toast.error("Please enter a team code.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Send POST request with uid and teamCode to the API endpoint
      const response = await fetch('http://localhost:5000/blitzschlag-25/us-central1/api/jointeam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,      // Pass the uid of the user
          teamCode, // Pass the entered team code
        }),
      });
  
      const data = await response.json();
  
      // Handle response from the server
      if (!response.ok) {
        // Check for specific server messages
        if (data.message && data.message.includes("not verified")) {
          toast.error("Your email is not verified. Please verify your email to join a team.");
        } else if (data.message) {
          toast.error(data.message);
        } else {
          throw new Error("Failed to join the team. Please try again.");
        }
        return; // Early return if there's an error
      }
  
      // Success case
      toast.success(data.message || "Successfully joined the team!");
      setTeamCode(""); // Clear the team code input
    } catch (error) {
      // Handle API request errors
      console.error("Error while joining team:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };
  

  // Open the drawer with the selected event
  const openDrawer = (event) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  // Close the drawer
  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div
      className="p-8 min-h-screen text-white"
      style={{
        backgroundImage: `url(${eventbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Event Handling Section */}
      <div className="mb-8 p-6 bg-gray-900 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Event</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value)}
              placeholder="Enter Team Code"
              className="border-2 border-white bg-transparent text-white px-4 py-2 rounded-md w-full"
            />
          </div>
          <button
            onClick={handleJoinTeam}
            disabled={loading}
            className={`w-full md:w-auto bg-transparent border-2 border-white text-white p-3 rounded-lg ${loading && "opacity-50"}`}
          >
            {loading ? "Joining..." : "Join Team"}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        {["flagship", "club", "fun", "attraction"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 mx-2 rounded-md ${activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-600"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length === 0 ? (
          <p>No events available for this category.</p>
        ) : (
          filteredEvents.map((event, index) => (
            <div
              key={index}
              className="border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg bg-gray-700"
            >
              <img
                src={event.imgUrl}
                alt={event.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-sm text-gray-300 mb-4">
                {event.description.slice(0, 100)}...
              </p>

              <button
                onClick={() => openDrawer(event)}
                className="w-full bg-transparent border-2 border-white text-white p-3 rounded-lg"
              >
                View More
              </button>
            </div>
          ))
        )}
      </div>

      {/* Drawer for Event Details */}
      <Drawer
        show={drawerOpen}
        onClose={closeDrawer}
        eventDetails={selectedEvent || {}}
        uid={uid}
      />
    </div>
  );
};

export default Events;
