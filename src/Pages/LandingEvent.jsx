import React from "react";
import eventbg from "../Assets/eventbg.jpg";

const LandingEvent = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${eventbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="flex justify-center items-center">
        <h1  style={{ fontFamily: '"Amarante", serif' }}
    className="text-center mx-auto w-fit text-7xl mt-20 mb-8 font-normal bg-gradient-to-r from-[#071182] via-[#00ffc3] to-[#ff5050] bg-clip-text text-transparent">Landing Event</h1>
      </div>
      <div className="event-lists mt-10 border ">
        <h2 className="text-4xl text-center mb-4">Upcoming Events</h2>
        <ul className="list-disc list-inside border">
          <li>Event 1</li>
          <li>Event 2</li>
          <li>Event 3</li>
          <li>Event 4</li>
        </ul>
      </div>
    </div>
  );
};

export default LandingEvent;
