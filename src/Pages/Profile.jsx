import Transition from "../transition";
import profileImg from "../../public/profile.webp"
import React, { useState, useEffect } from "react";
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase"; // Your Firebase initialization file
import { useNavigate } from "react-router-dom";
import profilebg from '../Assets/profilebg.jpg';
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
        fetchProfileData(currentUser.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);  
  
  const fetchProfileData = async (uid) => {
    try {
        const response = await fetch(`http://localhost:5000/blitzschlag-25/us-central1/api/profile?uid=${encodeURIComponent(uid)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
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
    setName(userData.userName);
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
  <div
    className="z-0"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.45)', // Adjust color and opacity here
      zIndex: 0,
    }}
  ></div>

  {/* Left Column: Profile and Info */}
  <div className="flex flex-col justify-between bg-transparent bg-opacity-80 px-8 py-8 rounded-2xl z-10">
    <p
      style={{ fontFamily: '"Amarante", serif' }}
      className="text-center text-7xl mb-8 font-normal bg-gradient-to-r from-[#071182] via-[#989898] to-[#50FFF0] bg-clip-text text-transparent"
    >
      PROFILE
    </p>

    <div className="flex justify-center">
      {profileImg ? (
        <img
          src={profileImg}
          alt="Profile"
          draggable="false"
          style={{ borderColor: 'rgba(130, 96, 89, 0.75)' }}
          className="w-48 h-48 border-8 object-cover bg-black bg-opacity-75"
        />
      ) : (
        <div className="w-28 h-28 sm:w-24 sm:h-24 bg-gray-300 flex items-center justify-center">
          <span className="w-36 h-36 sm:w-32 sm:h-32 border-8 border-black object-cover border-24 bg-white">No Photo</span>
        </div>
      )}
    </div>

    <p className="text-center">{name}</p>

    <div className="space-y-4">
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
      className="w-full bg-black bg-opacity-50 border-2 border-white text-white p-3 rounded-lg mt-4"
    >
      Logout
    </button>
  </div>

  {/* Right Column: Events */}
  <div className="sm:col-span-2 z-10 flex flex-col justify-center items-center p-4">
    <p
      style={{ fontFamily: '"Amarante", serif' }}
      className="text-center text-7xl mb-8 -mt-12 font-normal bg-gradient-to-r from-[#071182] via-[#989898] to-[#50FFF0] bg-clip-text text-transparent"
    >
      EVENTS
    </p>

    {eventsLoading ? (
      <p>Loading events...</p>
    ) : (
      <div
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 320px)", // Adjust based on available space for profile
        }}
        className="w-full space-y-6"
      >
        {Object.keys(timelineEvents).map((day, index) => (
          <div
            key={index}
            className="bg-black bg-opacity-50 rounded-xl border-white border-2 text-white p-6 w-full"
          >
            <h3
              style={{ fontFamily: '"Amarante", serif' }}
              className="font-bold text-xl text-center mb-4"
            >
              {`DAY ${index + 1}`}
            </h3>
            {timelineEvents[day].map((event, idx) => (
              <div key={idx} className="mt-4 border-b border-gray-700 pb-4 last:border-none">
                <h4 className="text-lg font-semibold mb-2">{event.eventName}</h4>
                <div className="flex items-center mb-2">
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
                  <p>{event.venue}</p>
                </div>
                <div className="flex items-center mb-2">
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
                  <p>{event.time}</p>
                </div>
                {event.type === "team" && (
                  <>
                    <p className="mt-2">{`Team Name: ${event.teamName}`}</p>
                    <button
                      data-tooltip-id={`team-code-tooltip-${event.teamCode}`}
                      data-tooltip-content={copiedCode === event.teamCode ? "Copied!" : "Copy"}
                      onClick={() => handleCopyCode(event.teamCode)}
                      className="w-full bg-transparent border-2 border-white text-white p-3 rounded-lg mt-2"
                    >
                      Team Code: {event.teamCode}
                    </button>
                    <Tooltip id={`team-code-tooltip-${event.teamCode}`} place="top" type="dark" effect="solid" />
                    <p className="mt-2">{`Members: ${event.teamMembers.join(", ")}`}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

  );
};

export default Transition(Profile);
