// import React, { useState } from "react";

// const EventCard = ({ image, eventName, eventDescription }) => {
//   const [teamName, setTeamName] = useState("");
//   const [teamCode, setTeamCode] = useState("");

//   const handleCreateTeam = () => {
//     alert(`Team '${teamName}' created successfully!`);
//     setTeamName(""); // Clear the input field after creating the team
//   };

//   const handleJoinTeam = () => {
//     alert(`Joined team with code: ${teamCode}`);
//     setTeamCode(""); // Clear the input field after joining the team
//   };

//   return (
//     <div className="flex border rounded-lg shadow-md max-w-3xl mx-auto overflow-hidden">
//       <div className="flex-1">
//         <img src={image} alt={eventName} className="w-full h-full object-cover" />
//       </div>
//       <div className="flex-2 p-6">
//         <h2 className="text-2xl font-bold mb-4">{eventName}</h2>
//         <p className="text-gray-600 mb-6">{eventDescription}</p>

//         <div className="space-y-4">
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               placeholder="Enter Team Name"
//               value={teamName}
//               onChange={(e) => setTeamName(e.target.value)}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={handleCreateTeam}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               Create Team
//             </button>
//           </div>
//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               placeholder="Enter Team Code"
//               value={teamCode}
//               onChange={(e) => setTeamCode(e.target.value)}
//               className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <button
//               onClick={handleJoinTeam}
//               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
//             >
//               Join Team
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;

import React, { useState } from "react";

const EventCard = ({ eventName, eventDescription }) => {
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");

  const handleCreateTeam = () => {
    alert(`Team '${teamName}' created successfully!`);
    setTeamName(""); // Clear the input field after creating the team
  };

  const handleJoinTeam = () => {
    alert(`Joined team with code: ${teamCode}`);
    setTeamCode(""); // Clear the input field after joining the team
  };

  return (
    <div className="flex border rounded-lg shadow-md max-w-3xl mx-auto overflow-hidden">
      <div className="flex-2 p-6">
        <h2 className="text-2xl font-bold mb-4">{eventName}</h2>
        <p className="text-gray-600 mb-6">{eventDescription}</p>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateTeam}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Create Team
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Team Code"
              value={teamCode}
              onChange={(e) => setTeamCode(e.target.value)}
              className="w-full px-2 py-1 border rounded-md focus:outline-none  focus:ring-green-500"
            />
            <button
              onClick={handleJoinTeam}
              className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700  focus:ring-green-500 focus:outline-none"
            >
              Join Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

