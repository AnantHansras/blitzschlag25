import React from "react";
import Home from "./Home";
import Footer from "../Components/Footer";
import Team from "./Team";
import Sponsor from "./Sponsor";
import CampusEmbassador from "./CampusEmbassador";
import EventImg from "../Assets/eventbg.jpg";
import "../css files/animation.css";

// EventL Component
const EventL = () => {
  return (
    <div
      className="h-screen w-full bg-cover bg-center boxAnimation"
      style={{
        backgroundImage: `url(${EventImg})`,
      }}
    >
      <div
        style={{ fontFamily: '"Amarante", serif' }}
        className="h-full w-full flex items-center justify-center bg-black bg-opacity-50 text-white text-center px-4"
      >
        <h1 className="text-lg md:text-8xl font-bold">Events</h1>
      </div>
    </div>
  );
};

// LandingPage Component
const LandingPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Home Section */}
      <div className="h-screen w-full boxAnimation">
        <Home />
      </div>

      {/* Event Section */}
      <div className="h-screen w-full animated-box">
        <EventL />
      </div>

      {/* Sponsor Section */}
      <div className="h-screen w-full boxAnimation">
        <Sponsor />
      </div>

      {/* Campus Ambassador Section */}
      <div className="h-screen w-full boxAnimation">
        <CampusEmbassador />
      </div>

      {/* Team Section */}
      <div className="h-screen w-full boxAnimation">
        <Team />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
