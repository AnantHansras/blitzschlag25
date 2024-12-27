import React from 'react';
import homeImage from '../Assets/blitz_home.png';
import insect from '../Assets/BlitzHome_insect.png';
import { VscPlayCircle } from "react-icons/vsc";
const Home = () => {
  return (
    <div className="h-screen bg-transparent relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url(${homeImage})`,
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        {/* Title with Insect */}
        <div className="relative inline-block">
          <h1
            className="text-5xl md:text-8xl tracking-wider font-normal text-[#FFFBFB] drop-shadow-lg"
            style={{
              fontFamily: "'Metal Mania', cursive",
              WebkitTextStroke: "3px #D4BF927D",
              WebkitTextFillColor: "#FFFBFB",
            }}
          >
            BLITZSCHLAG' 25
          </h1>
          {/* Insect Image */}
          <img
            src={insect}
            alt="Insect"
            className="absolute -top-28 left-[50%] md:left-[93%] w-16 md:w-28"
          />
        </div>

        {/* Date */}
        <p
          className="text-xl md:text-3xl tracking-normal font-normal text-[#C0AA67] "
          style={{
            fontFamily: "'Metal Mania', cursive",
            WebkitTextStroke: "0.5px #000000D1",
            WebkitTextFillColor: "#C0AA67",
            textShadow: "2px 2px 4px #000000",
          }}
        >
          6th - 9th February, 2025
        </p>

        {/* Subtitle */}
        <p className="mt-12 text-2xl md:text-4xl  font-medium text-white flex gap-x-4 ">
          <span className="bg-clip-text text-transparent pt-2 bg-[linear-gradient(224.46deg,_#724E2C_36.57%,_#F6B168_51.94%,_#5F3F24_73.6%,_#E68E23_117.23%,_#453B2E_130.33%)]" 
           style={{fontFamily: "'Aclonica', sans-serif"}}>
            Enter The Dreamland</span>
            <span className="text-[#C0AA67] text-5xl " ><VscPlayCircle /></span>
        </p>
      </div>
    </div>
  )
}

export default Home



