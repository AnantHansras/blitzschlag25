// import React from 'react';
// import teamImg from "../Assets/teams.jpg";

// const Team = () => {
//   return (
//     <div
//       className="h-screen w-full bg-cover bg-center"
//       style={{
//         backgroundImage: `url(${teamImg})`,
//       }}
//     >
//       {/* Optional: Add content inside */}
//       <div 
//         style={{ fontFamily: '"Amarante", serif' }}
//         className="h-full w-full flex items-center justify-center bg-black bg-opacity-50 text-white">
//         <h1 className="text-lg font-bold">Our Team</h1>
//       </div>
//     </div>
//   );
// };
import React from 'react'
import PageNA from '../Components/PageNA'
import Transition from '../transition'
const Team = () => {
  return (
    <div><PageNA/></div>
  )
}
export default Transition(Team);
