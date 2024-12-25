import { React, useState, useEffect } from "react";
import { read, auth, write } from "../scripts/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import the toast function
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import { FaCalendar } from "react-icons/fa";

const SingleComponent = ({
  eventpath,
  eventName,
  eventDescription,
  eventCategory,
  eventDay,
  eventTime,
  eventPrize,
  eventRules,
  eventVenue,
}) => {
  const user = auth.currentUser;
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  // Fetch the list of users already registered for the event
  useEffect(() => {
    if (!eventpath || !user?.uid) return; // Make sure eventpath and user UID are valid

    const fetchEventData = async () => {
      const eventDocPath = `events/${eventpath}`; // Full path to the event document
      const eventData = await read(eventDocPath); // Reading event data from Firebase
      if (eventData && eventData.registeredUsers) {
        // Check if the user is in the registeredUsers array
        const isUserRegistered = eventData.registeredUsers.some(
          (uid) => uid === user.uid
        );
        setRegisteredUsers(eventData.registeredUsers);
        setIsRegistered(isUserRegistered); // Update registration status
      }
    };

    fetchEventData();
  }, [eventpath, user?.uid]); // Re-run when eventpath or user UID changes

  const checkUserLogin = () => {
    if (!user) {
      toast.error("Please log in first.", { autoClose: 5000 }); // Toast for login alert
      navigate("/Auth");
      return false;
    }
    return true;
  };

  // Register User for the event
  const handleRegister = async () => {
    if (!checkUserLogin()) return;

    if (!isRegistered) {
      const updatedUsers = [...registeredUsers, user.uid];

      // Fetch the existing joinedSingleEvent array for the user
      const userDoc = await read(`users/${user.uid}`);
      const existingJoinedEvents = Array.isArray(userDoc?.joinedSingleEvent)
        ? userDoc.joinedSingleEvent
        : []; // Ensure it's an array

      const updatedUserJoinedEvents = [...existingJoinedEvents, eventpath];

      // Update the event's registered users
      const eventDocPath = `events/${eventpath}`; // Full path to the event document
      await write(
        eventDocPath,
        { registeredUsers: updatedUsers },
        { merge: true }
      ); // Use merge to avoid overwriting

      // Update the user's joinedSingleEvent array
      await write(
        `users/${user.uid}`,
        { joinedSingleEvent: updatedUserJoinedEvents },
        { merge: true }
      );

      setRegisteredUsers(updatedUsers);
      setIsRegistered(true);
      toast.success("Successfully registered!", { autoClose: 5000 }); // Toast for success
    } else {
      toast.info("You are already registered for this event.", {
        autoClose: 5000,
      }); // Toast for already registered
    }
  };

  // Unregister User from the event
  const handleUnregister = async () => {
    if (!checkUserLogin()) return;

    if (isRegistered) {
      const updatedUsers = registeredUsers.filter((uid) => uid !== user.uid);
      const updatedUserJoinedEvents = (user?.joinedSingleEvent || []).filter(
        (event) => event !== eventpath
      );

      // Update the event's registered users
      const eventDocPath = `events/${eventpath}`; // Full path to the event document
      await write(eventDocPath, { registeredUsers: updatedUsers });

      // Update the user's joinedSingleEvent
      await write(`users/${user.uid}`, {
        joinedSingleEvent: updatedUserJoinedEvents,
      });

      setRegisteredUsers(updatedUsers);
      setIsRegistered(false);
      toast.success("Successfully unregistered!", { autoClose: 5000 }); // Toast for success
    } else {
      toast.info("You are not registered for this event.", { autoClose: 5000 }); // Toast for not registered
    }
  };
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const openOverlay = () => setIsOverlayOpen(true);
  const closeOverlay = () => setIsOverlayOpen(false);
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  return (
    // <div className="flex border rounded-lg shadow-md max-w-3xl mx-auto overflow-hidden">
    //     <div className="flex-2 p-6">
    //         <h2 className="text-2xl font-bold mb-4">{eventName}</h2>
    //         <p className="text-gray-600 mb-6">{eventDescription}</p>
    //         <div>
    //             <button
    //                 onClick={handleRegister}
    //                 disabled={isRegistered}
    //                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-400">
    //                 {isRegistered ? "Already Registered" : "Register"}
    //             </button>
    //             {isRegistered && (
    //                 <button
    //                     onClick={handleUnregister}
    //                     className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none">
    //                     Unregister
    //                 </button>
    //             )}
    //         </div>
    //     </div>
    // </div>
    <>
      {/* Card */}
      <div className="flex flex-col bg-white bg-opacity-5 border-2 border-white/30 rounded-lg w-64 h-80 overflow-hidden cursor-pointer transition-all  hover:scale-105 duration-300">
        <div className="p-6 flex flex-col h-full">
          {/* Event Name */}
          <h1 className="text-2xl font-bold text-white mb-4">{eventName}</h1>

          {/* Club Name */}
          <h4 className="text-xl flex font-medium gap-x-2 text-gray-400 mb-3">
            <FaCalendar className="translate-y-1" /> {eventDay}
            {eventCategory && (
              <span className="ml-auto inline-flex items-center rounded-2xl bg-gray-400 px-3 text-xs font-medium text-gray-800 ring-1 ring-gray-500/10 ring-inset">
                {eventCategory}
              </span>
            )}
          </h4>

          {/* Description (First 14 lines) */}
          <p
            className="text-gray-400 text-justify mb-4 flex-1 overflow-y-auto"
            style={{ lineHeight: "1.6" }}
          >
            {truncateText(eventDescription, 14)}
          </p>

          {/* Button to View Details */}
          <button
            onClick={openOverlay}
            className="px-0 py-2 bg-transparent border-2 border-blue-400 text-white rounded-2xl hover:bg-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
          >
            View Details
          </button>
        </div>
      </div>

      {isOverlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
          <div className="bg-gray-800 text-white rounded-lg shadow-xl w-screen h-screen p-6 relative overflow-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              onClick={closeOverlay}
              aria-label="Close overlay"
            >
              &times;
            </button>

            {/* Event Content */}
            <div className="flex flex-col md:flex-row items-start h-full">
              {/* Event Details Section */}
              <div className="w-full flex flex-col">
                {/* Event Name */}
                <div className="flex">
                  <h1 className="text-4xl font-bold text-pink-400 mb-4">
                    {eventName}
                  </h1>
                  {/* Action Buttons */}
                  <div className="flex space-x-4 ml-7 mt-1">
                    <button
                      onClick={handleRegister}
                      disabled={isRegistered}
                      className="px-4 bg-blue-600 h-10 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-500"
                    >
                      {isRegistered ? "Already Registered" : "Register"}
                    </button>
                    {isRegistered && (
                      <button
                        onClick={handleUnregister}
                        className="px-4 bg-red-600 h-10 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
                      >
                        Unregister
                      </button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-300 mb-4">{eventDescription}</p>

                <div className="flex gap-x-7">
                  {/* Venue */}
                  <div className="mb-4 flex">
                    <h2 className="text-xl font-semibold text-white">
                      Venue :
                    </h2>
                    <p className="text-gray-400 mt-1 ml-3">{eventVenue}</p>
                  </div>

                  {/* Date & Time */}
                  <div className="mb-4 flex">
                    <h2 className="text-xl font-semibold text-white">
                      Date & Time :
                    </h2>
                    <p className="text-gray-400 mt-1 ml-3">{eventTime}</p>
                  </div>
                </div>

                {/* Rules */}
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white">Rules</h2>
                  <div className="flex flex-col space-y-2">
                    {eventRules.map((rule, index) => (
                      <div key={index} className="flex items-start">
                        <span className="mr-2 font-bold text-gray-600">
                          {index + 1}.
                        </span>
                        <div className="text-gray-400">{rule}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prize Section */}
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Prize for Winner
                  </h2>
                  <p className="text-gray-400">{eventPrize}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleComponent;
