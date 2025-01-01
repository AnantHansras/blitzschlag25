import React, { useState, useEffect } from "react";
import { getAuth, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import app from "../../firebase"; // Your Firebase initialization file
import { useNavigate } from "react-router-dom";
import profilebg from '../Assets/profilebg.jpg';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [name, setName] = useState(""); // State for name
  const [joinedTeamEvents, setJoinedTeamEvents] = useState([]); // State for team events
  const [eventsLoading, setEventsLoading] = useState(true); // Loading state for events
  const [profileImage, setProfileImage] = useState(""); // State for profile image URL
  const navigate = useNavigate();
  const auth = getAuth(app);

  // Check authentication and load user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setEmailVerified(currentUser.emailVerified);
        setName(currentUser.displayName || "");
        fetchProfileImage(currentUser.uid); // Fetch the profile image based on user ID
        fetchProfileData(currentUser.uid);
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [auth, navigate]);

  // Fetch profile photo from Robohash API
  const fetchProfileImage = async (uid) => {
    const avatarUrl = `https://robohash.org/${uid}.png`;  // Using user ID as the unique identifier
    setProfileImage(avatarUrl);
  };

  const fetchProfileData = async (uid) => {
    try {
      const response = await fetch('http://localhost:5000/blitzschlag-25/us-central1/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
    // Process the team events and extract necessary details
    const teamsDetails = data.teamsDetails.map((team) => ({
      teamName: team.teamName,
      eventPath: team.eventPath,
      teamMembers: team.memberNames,
    }));

    // Set the joined team events in the state
    setName(data.userData.userName);
    setJoinedTeamEvents(teamsDetails);
    setEventsLoading(false); // Stop loading after the data is fetched
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
      navigate("/login"); // Redirect after logout
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
          {/* Profile Image */}
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

      {/* Right Column: Timeline (spans 2 columns on larger screens) */}
      <div className="sm:col-span-2 flex justify-center items-center bg-lightcoral p-4 sm:p-8">
        <div className="w-full">
          <h2 className="text-xl font-semibold">Joined Team Events</h2>
          {eventsLoading ? (
            <p>Loading your team events...</p>
          ) : joinedTeamEvents.length === 0 ? (
            <p>You haven't joined any team events yet.</p>
          ) : (
            <table className="min-w-full border border-gray-200 mt-2">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Event Path</th>
                  <th className="border border-gray-300 p-2">Team Name</th>
                  <th className="border border-gray-300 p-2">Team Members</th>
                </tr>
              </thead>
              <tbody>
                {joinedTeamEvents.map((event, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{event.eventPath}</td>
                    <td className="border border-gray-300 p-2">{event.teamName}</td>
                    <td className="border border-gray-300 p-2">
                      {event.teamMembers.length === 0
                        ? "No members"
                        : event.teamMembers.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
