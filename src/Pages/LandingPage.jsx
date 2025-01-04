import React from "react";
import Home from "./Home";
import Footer from "../Components/Footer";
import Team from "./Team";
import Sponsor from "./Sponsor";
import CampusEmbassador from "./CampusEmbassador";
import EventImg from "../Assets/eventbg.jpg";

// EventL Component
const EventL = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${EventImg})`,
      }}
    >
      <div
        style={{ fontFamily: '"Amarante", serif' }}
        className="h-full w-full flex items-center justify-center bg-black bg-opacity-50 text-white text-center px-4"
      >
        <h1 className="text-5xl md:text-8xl font-bold">Events</h1>
      </div>
    </div>
  );
};

// LandingPage Component
const LandingPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Home Section */}
      <div className="h-screen w-full">
        <Home />
      </div>

      {/* Event Section */}
      <EventL />

      {/* Sponsor Section */}
      <div className="h-screen w-full">
        <Sponsor />
      </div>

      {/* Campus Ambassador Section */}
      <div className="h-screen w-full">
        <CampusEmbassador />
      </div>

      {/* Team Section */}
      <div className="h-screen w-full">
        <Team />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
