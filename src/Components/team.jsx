import { React, useState } from 'react';
import { read, auth, write } from '../scripts/firebase';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { FaCalendar } from 'react-icons/fa';

const TeamComponent = ({ eventpath, eventName, eventDescription, eventCategory, eventDay,eventTime,eventPrize,eventRules,eventVenue}) => {
  const user = auth.currentUser;
  const navigate = useNavigate(); // Use useNavigate hook for navigation
  const [teamName, setTeamName] = useState("");

  const checkUserLogin = () => {
    if (!user) {
      toast.error("Please log in first.", { autoClose: 5000 }); // Toast for login error
      navigate('/Auth'); // Use navigate to redirect to the login page
      return false;
    }
    return true;
  };

  const handleCreateTeam = async () => {
    if (!checkUserLogin()) return; // Check if the user is logged in
  
    if (!teamName) {
      toast.error("Invalid Team Name", { autoClose: 5000 }); // Toast for invalid team name
      return;
    }
  
    const userDoc = await read(`users/${user.uid}`);
    const registeredEvents = Array.isArray(userDoc?.joinedTeamsEvent) ? userDoc.joinedTeamsEvent : [];
  
    // Check if the user is already registered for the event
    if (registeredEvents.some(event => event.eventpath === eventpath)) {
      toast.info("Already Registered For this Event", { autoClose: 5000 }); // Toast for already registered
      return;
    }
  
    // Generate a 6-character team code using UUID
    const generateTeamCode = () => {
      return uuidv4().split('-')[0]; // Take the first segment of the UUID
    };
  
    const newTeamCode = generateTeamCode();
  
    // 1. Read the existing event document
    const eventDoc = await read(`events/${eventpath}`);
    const existingTeams = Array.isArray(eventDoc?.registeredTeams) ? eventDoc.registeredTeams : [];
  
    // 2. Append the new team code to the registeredTeams array
    const updatedTeams = [...existingTeams, newTeamCode];
  
    // 3. Write the updated teams array back to the event document
    await write(`events/${eventpath}`, {
      registeredTeams: updatedTeams,
    });
  
    // 4. Create the team document
    await write(`teams/${newTeamCode}`, {
      name: teamName,
      event: eventpath,
      members: [user.uid],
    });
  
    // 5. Update user document to track their registration in the event
    await write(`users/${user.uid}`, {
      joinedTeamsEvent: [...registeredEvents, { eventpath, teamCode: newTeamCode }],
    });
  
    toast.success(`Team created successfully! Your Team Code: ${newTeamCode}`); // Toast for success
  };
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  
      const openOverlay = () => setIsOverlayOpen(true);
      const closeOverlay = () => setIsOverlayOpen(false);
      const truncateText = (text, wordLimit) => {
          const words = text.split(' ');
          if (words.length > wordLimit) {
              return words.slice(0, wordLimit).join(' ') + '...';
          }
          return text;
      };
  return (
    // <div className="flex border rounded-lg shadow-md max-w-3xl mx-auto overflow-hidden">
    //   <div className="flex-2 p-6">
    //     <h2 className="text-2xl font-bold mb-4">{eventName}</h2>
    //     <p className="text-gray-600 mb-6">{eventDescription}</p>
    //     <div>
    //       <form onSubmit={(e) => { e.preventDefault(); handleCreateTeam(); }}>
    //         <input
    //           type="text"
    //           placeholder="Enter Team Name"
    //           value={teamName}
    //           onChange={(e) => setTeamName(e.target.value)}
    //           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //         <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
    //           Create Team
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="flex flex-col bg-white bg-opacity-5 backdrop-blur-lg border-2 border-white/30 rounded-lg shadow-xl w-64 h-80 overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
                      <div className="p-6 flex flex-col h-full">
                          {/* Event Name */}
                          <h1 className="text-2xl font-bold text-white mb-4">{eventName}</h1>
      
                          {/* Club Name */}
                          <h4 className="text-xl flex font-medium gap-x-2 text-gray-400 mb-3"><FaCalendar className='translate-y-1'/> {eventDay}
                          {
                              eventCategory &&
                              <span className="ml-auto inline-flex items-center rounded-2xl bg-gray-400 px-3 text-xs font-medium text-gray-800 ring-1 ring-gray-500/10 ring-inset">
                                  {eventCategory}
                              </span>
                          }
                          </h4>
      
                          {/* Description (First 14 lines) */}
                          <p className="text-gray-400 text-justify mb-4 flex-1 overflow-y-auto" style={{ lineHeight: '1.6' }}>
                              {truncateText(eventDescription, 10)}
                          </p>
      
                          {/* Button to View Details */}
                          <button 
                              onClick={openOverlay}
                              className="px-0 py-2 bg-transparent border-2 border-blue-400 text-white rounded-2xl hover:bg-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300">
                              View Details
                          </button>
      
                      </div>
      </div>

      {/* Overlay */}
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
          <div className='flex flex-col'>
          <h1 className="text-4xl font-bold text-pink-400 mb-4">{eventName}</h1>
              {/* Action Buttons */}
                 <div >
          <form className='flex flex-row gap-x-4' onSubmit={(e) => { e.preventDefault(); handleCreateTeam(); }}>
            <input
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-30 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              Create Team
            </button>
          </form>
        </div>
          </div>
          
          {/* Description */}
          <p className="text-lg text-gray-300 mb-4">
            {eventDescription}
          </p>

            <div className='flex gap-x-7'>
                {/* Venue */}
          <div className="mb-4 flex">
            <h2 className="text-xl font-semibold text-white">Venue :</h2>
            <p className="text-gray-400 mt-1 ml-3">{eventVenue}</p>
          </div>

          {/* Date & Time */}
          <div className="mb-4 flex">
            <h2 className="text-xl font-semibold text-white">Date & Time :</h2>
            <p className="text-gray-400 mt-1 ml-3">{eventTime}</p>
          </div>
            </div>
          

          {/* Rules */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">Rules</h2>
            <div className="flex flex-col space-y-2">
              {eventRules.map((rule, index) => (
                <div key={index} className="flex items-start">
                  <span className="mr-2 font-bold text-gray-600">{index + 1}.</span>
                  <div className="text-gray-400">{rule}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Prize Section */}
          <div>
            <h2 className="text-xl font-semibold text-white">Prize for Winner</h2>
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

export default TeamComponent;
