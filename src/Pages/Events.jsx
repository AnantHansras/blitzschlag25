// import React, { useState } from "react";
// import EventCard from '../Components/EventCard.jsx'
// const eventsData = {
//   flagship: [
//     {
//       image: "https://via.placeholder.com/150",
//       name: "BATTLE OF BANDS",
//       description: "The ultimate showdown of musical prowess! A battle where raw talent collides with dazzling vitality. Witness local bands duke it out over the coveted title of Best Band on Campus, as they unleash their original compositions and captivate the audience with their musical mastery"
//     },
//     {
//       image: "https://via.placeholder.com/150",
//       name: "PANACHE",
//       description: "The fashion competition of BLITZSCHLAG is a platform for fashionistas to push boundaries, challenge perceptions, and redefine the very essence of beauty. Expect innovative designs, breathtaking performances, and a celebration of creativity like no other."
//     }
//   ],
//   club: [
//     {
//       image: "https://via.placeholder.com/150",
//       name: "Sargam(Classical Music & Dance Club)",
//       description: "A Standalone instrument playing competition. where participants must choose a song to play on their instrument and they will be judged on the basis of their technicalities and resemblance. Melodic and percussion instruments will be judged separately."
//     },
//     {
//       image: "https://via.placeholder.com/150",
//       name: "Voice Choice(Classical Music and Dance Club)",
//       description: "Music is the shorthand of emotion. It has the ability to take people out of themselves for a few hours. Classical Music & Dance Club is delighted to announce Voice Choice, a Solo Singing Competition. It is a perennial event which enjoys immense participation from all across the country. So put your best foot forward, and immerse yourself in the phantom sphere of Blitzschlag."
//     }
//   ],
//   attractions: [
//     {
//       image: "https://via.placeholder.com/150",
//       name: "Treasure Hunt",
//       description: "Treasure hunt is a game in which each team attempts to be the first in finding something that has been hidden all across the campus using clues. Guessing, the first clue leads to the next spot as the game continues, and the final clue leads to the ultimate hidden treasure. The winning team will be awarded with alluring rewards. The game for the Sherlocks amongst the crowd, Treasure Hunt is for all the Mystery solvers out there."
//     },
//     {
//       image: "https://via.placeholder.com/150",
//       name: "Blind Maze",
//       description: "Ever get lost in some new neighbourhood or while exploring some new areas in campus, what helps in that situation? THAT’S RIGHT! GOOGLE MAPS!! Lets explore this feeling of lost and found in this fun competition of BLIND MAZE!!"
//     }
//   ],
//   fun: [
//     {
//       image: "https://via.placeholder.com/150",
//       name: "Golgappa",
//       description: "Indulge in our Golgappa Eating Challenge – showcase speed and precision with this beloved South Asian street food. Join the fun, devouring these small, ﬂavourful puris within a set me."
//     },
//     {
//       image: "https://via.placeholder.com/150",
//       name: "Bolti Band",
//       description: "A fun and engaging event to participate in duos where one will be whispering some funny phrases and the receiver has to decode it, while listening to their favourite music!"
//     }
//   ]
// };

// const Events = () => {
//   const [activeTab, setActiveTab] = useState("flagship");

//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-bold text-center mb-8">Events</h1>

//       <div className="flex justify-center space-x-4 mb-6">
//         {Object.keys(eventsData).map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-md font-medium ${
//               activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
//             } hover:bg-blue-500 hover:text-white focus:outline-none`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/_/g, " ")}
//           </button>
//         ))}
//       </div>

//       <div>
//         {eventsData[activeTab].map((event, index) => (
//           <EventCard
//             key={index}
//             image={event.image}
//             eventName={event.name}
//             eventDescription={event.description}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Events;

import React, { useState } from "react";
import EventCard from '../Components/EventCard.jsx'
const eventsData = {
  flagship: [
    {
      name: "BATTLE OF BANDS",
      description: "The ultimate showdown of musical prowess! A battle where raw talent collides with dazzling vitality. Witness local bands duke it out over the coveted title of Best Band on Campus, as they unleash their original compositions and captivate the audience with their musical mastery"
    },
    {
      name: "PANACHE",
      description: "The fashion competition of BLITZSCHLAG is a platform for fashionistas to push boundaries, challenge perceptions, and redefine the very essence of beauty. Expect innovative designs, breathtaking performances, and a celebration of creativity like no other."
    }
  ],
  club: [
    {
      name: "Sargam(Classical Music & Dance Club)",
      description: "A Standalone instrument playing competition. where participants must choose a song to play on their instrument and they will be judged on the basis of their technicalities and resemblance. Melodic and percussion instruments will be judged separately."
    },
    {
      name: "Voice Choice(Classical Music and Dance Club)",
      description: "Music is the shorthand of emotion. It has the ability to take people out of themselves for a few hours. Classical Music & Dance Club is delighted to announce Voice Choice, a Solo Singing Competition. It is a perennial event which enjoys immense participation from all across the country. So put your best foot forward, and immerse yourself in the phantom sphere of Blitzschlag."
    }
  ],
  attractions: [
    {
      name: "Treasure Hunt",
      description: "Treasure hunt is a game in which each team attempts to be the first in finding something that has been hidden all across the campus using clues. Guessing, the first clue leads to the next spot as the game continues, and the final clue leads to the ultimate hidden treasure. The winning team will be awarded with alluring rewards. The game for the Sherlocks amongst the crowd, Treasure Hunt is for all the Mystery solvers out there."
    },
    {
      name: "Blind Maze",
      description: "Ever get lost in some new neighbourhood or while exploring some new areas in campus, what helps in that situation? THAT’S RIGHT! GOOGLE MAPS!! Lets explore this feeling of lost and found in this fun competition of BLIND MAZE!!"
    }
  ],
  fun: [
    {
      name: "Golgappa",
      description: "Indulge in our Golgappa Eating Challenge – showcase speed and precision with this beloved South Asian street food. Join the fun, devouring these small, ﬂavourful puris within a set me."
    },
    {
      name: "Bolti Band",
      description: "A fun and engaging event to participate in duos where one will be whispering some funny phrases and the receiver has to decode it, while listening to their favourite music!"
    }
  ]
};

const Events = () => {
  const [activeTab, setActiveTab] = useState("flagship");

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Events</h1>

      <div className="flex justify-center space-x-4 mb-6">
        {Object.keys(eventsData).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"
            } hover:bg-blue-500 hover:text-white focus:outline-none`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div>
        {eventsData[activeTab].map((event, index) => (
          <EventCard
            key={index}
            eventName={event.name}
            eventDescription={event.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;

