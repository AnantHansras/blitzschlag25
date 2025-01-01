import React, { useState, useEffect } from "react";
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase"; // Your Firebase initialization file
import { useNavigate } from "react-router-dom";
import profilebg from '../Assets/loginbg.jpg';
import eventData from "../data/eventData";
import { Tooltip } from "react-tooltip";
const Profile = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [name, setName] = useState("");
  const [eventsLoading, setEventsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [timelineEvents, setTimelineEvents] = useState({
    day1: [],
    day2: [],
    day3: [],
  });

  const handleCopyCode = (teamCode) => {
    navigator.clipboard.writeText(teamCode) // Copy to clipboard
      .then(() => {
        setCopiedCode(teamCode); // Update the copied code state
        setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);
        setName(currentUser.displayName || "");
        fetchProfileImage(currentUser.uid);
        fetchProfileData(currentUser.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchProfileImage = async (uid) => {
    const avatarUrl = `https://robohash.org/${uid}.png`;
    setProfileImage(avatarUrl);
  };

  const fetchProfileData = async (uid) => {
    try {
      const response = await fetch('http://localhost:5000/blitzschlag-25/us-central1/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid }),
      });

      const result = await response.json();
      if (response.ok) {
        setApiData(result.data);
      } else {
        console.error('Error fetching profile data:', result.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const setApiData = (data) => {
    const { userData, teamsDetails } = data;
    const { joinedEvents } = userData;
    const events = [];

    const groupedEvents = {
      day1: [],
      day2: [],
      day3: [],
    };

    joinedEvents.forEach((eventPath) => {
      const event = eventData[eventPath];
      if (event) {
        const eventDetails = {
          eventName: event.name,
          day: event.day,
          venue: event.venue,
          time: event.time,
          type: event.maxTeamSize > 1 ? 'team' : 'single',
        };

        if (event.maxTeamSize > 1) {
          const team = teamsDetails.find((team) => team.eventPath === eventPath);
          if (team) {
            eventDetails.teamName = team.teamName;
            eventDetails.teamMembers = team.memberNames;
            eventDetails.teamCode = team.teamCode;
          }
        }

        if (event.day === 1) groupedEvents.day1.push(eventDetails);
        if (event.day === 2) groupedEvents.day2.push(eventDetails);
        if (event.day === 3) groupedEvents.day3.push(eventDetails);
      }
    });

    setTimelineEvents(groupedEvents);
    setEventsLoading(false);
  };

  const handleVerifyEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        alert("Verification email sent! Check your inbox.");
      } catch (error) {
        console.error("Error sending verification email:", error.message);
        alert("Failed to send verification email.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
      alert("Failed to log out.");
    }
  };

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${profilebg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-screen p-5 pt-24"
    >
      {/* Left Column: Profile and Info */}
      <div className="flex flex-col justify-between bg-lightblue bg-black bg-opacity-80 p-6 sm:p-14 rounded-2xl">
        <div className="flex justify-center mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover bg-black"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-white text-sm sm:text-lg">No Photo</span>
            </div>
          )}
        </div>

        <div>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                disabled
                readOnly
                className="placeholder-white bg-transparent w-full p-3 mt-2 border-b-2 border-gray-300 outline-none text-white"
              />
            </div>

            <div>
              <input
                type="email"
                value={user.email || ""}
                disabled
                readOnly
                className="placeholder-white bg-transparent w-full p-3 mt-2 border-b-2 border-gray-300 outline-none text-white"
              />
            </div>

            <div className="mt-4">
              <p className="text-sm">Email Verified: {emailVerified ? "Yes" : "No"}</p>
              {!emailVerified && (
                <button
                  onClick={handleVerifyEmail}
                  className="w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4"
                >
                  Verify Email
                </button>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4"
          >
            Logout
          </button>
        </div>
      </div>

{/* Right Column: Timeline */}
    <div className="sm:col-span-2 flex flex-col justify-center items-center bg-black bg-opacity-80 rounded-2xl p-4">
      <h2 className="text-3xl mb-4 text-white">Event Timeline</h2>
      {eventsLoading ? (
        <p>Loading events...</p>
      ) : (
        <div className="relative w-full h-96 overflow-y-auto scroll-smooth"> {/* Smooth scrolling & fixed height */}
          {/* Vertical Line (Fixed on scroll) */}
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 border-l-2 border-white min-h-full"></div>

          {/* Timeline Events */}
          <div className="-mt-10 relative">
            <div className="absolute left-1/2 top-0 transform -translate-x-1/2 border-l-2 border-white min-h-full z-0"></div> {/* Fixed vertical line */}

            {Object.keys(timelineEvents)
              .filter((day) => timelineEvents[day].length > 0) // Only include non-empty days
              .map((day, index) => (
                <div key={index} className="relative z-10">
                  {/* Event Details */}
                  <div className="flex justify-center w-full">
                    {/* Event Content Box */}
                    <div
                      className="bg-black rounded-3xl text-white p-10 shadow-lg w-full max-w-md"
                      style={{
                        marginTop: `calc(${(index + 1) * 120}px - 20px)`, // Add dynamic margin based on index
                      }}
                    >
                      <h3 className="font-bold text-xl text-center mb-4">{`DAY ${index + 1}`}</h3>
                      {timelineEvents[day].map((event, idx) => (
                        <div key={idx} className="mt-4">
                          <h4 className="text-lg font-semibold">{event.eventName}</h4>
                          <div className="flex items-center mt-2">
                            {/* Location Pin Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-white mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18s8-6 8-10a8 8 0 10-16 0c0 4 8 10 8 10z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p>{`${event.venue}`}</p>
                          </div>
                          <div className="flex items-center mt-2">
                            {/* Clock Icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-5 h-5 text-white mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 110-20 10 10 0 010 20zm.5-10V5a.5.5 0 00-1 0v5a.5.5 0 00.5.5h5a.5.5 0 000-1h-4.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p>{`${event.time}`}</p>
                          </div>
                          {event.type === "team" ? (
                            <>
                              <p className="mt-2">{`${event.teamName}`}</p>
                              <button
                                data-tooltip-id={`team-code-tooltip-${event.teamCode}`}
                                data-tooltip-content={copiedCode === event.teamCode ? "Copied!" : "Copy"}
                                onClick={() => handleCopyCode(event.teamCode)}
                                className="w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-4"
                              >
                                Team Code: {event.teamCode}
                              </button>
                              <Tooltip id={`team-code-tooltip-${event.teamCode}`} place="top" type="dark" effect="solid" />
                              <p>{`Members: ${event.teamMembers.join(", ")}`}</p>
                            </>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;
