import React, { useEffect, useRef,useState } from "react";
import teamImg from "../Assets/teams.jpg";
import TeamCard from "../Components/TeamCard";

// Team Members' Images
import siddhantmohanty from "../Assets/monty.jpg";
import chestasoni from "../Assets/chestha.jpg";
import aayushsarraff from "../Assets/aayush.jpg";
import subhrajitroy from "../Assets/roy.jpg";
import jiteshyadav from "../Assets/jitesh.jpg";
import aryamansharma from "../Assets/arya.jpg";
import shravyabhamidipati from "../Assets/shravya.jpg";
import ishanhemnani from "../Assets/ishaan.jpg";
import shanirajput from "../Assets/shani.jpg";
import sachin from "../Assets/sachin.jpg";
import tusharsankhla from "../Assets/tushar.jpg";
import vinaybansal from "../Assets/vinay.png";
import yashasvigautam from "../Assets/yash.jpg";
import praveshnath from "../Assets/pravesh.jpg";
import rahulbairwa from "../Assets/rahul.jpg";
import anushkaagrahari from "../Assets/anushka.jpg";
import rajbilonia from "../Assets/raj.png";
import nitinkumar from "../Assets/nitin.jpg";
import ayushagarwal from "../Assets/aayushagr.jpg";
import nehaldave from "../Assets/nehal.jpg";
import amanamarnathtiwari from "../Assets/amantiwari.jpg";
import aditibajpai from "../Assets/aditi.png";
import rochitjain from "../Assets/rochit.jpg";
import anshshah from "../Assets/ansh.jpg";
import tanishagodha from "../Assets/tanisha.jpg";
import giriraj from "../Assets/giriraj.png";
import divyanshikushwah from "../Assets/divyanshi.jpg";


import vidit from "../Assets/vidit.png";
import krithik from "../Assets/krithik.png";
import jassi from "../Assets/jassi.png";
import mad from "../Assets/mad.png";
import rudra from "../Assets/rudra.png";
import ronak from "../Assets/ronak.png";
import ankit from "../Assets/ankit.png";

// Core Team Data
const core_team = [
  { name: "Siddhant Mohanty", position: "President", img: siddhantmohanty },
  { name: "Chesta Soni", position: "Vice President", img: chestasoni },
  { name: "Aayush Sarraff", position: "Cultural Secretary", img: aayushsarraff },
  { name: "Subhrajit Roy", position: "Cultural Secretary", img: subhrajitroy },
  { name: "Jitesh Yadav", position: "General Secretary", img: jiteshyadav },
  { name: "Aryaman Sharma", position: "General Secretary", img: aryamansharma },
  { name: "Shravya Bhamidipati", position: "General Secretary", img: shravyabhamidipati },
  { name: "Ishan Hemnani", position: "Technical Secretary", img: ishanhemnani },
  { name: "Shani Rajput", position: "Technical Secretary", img: shanirajput },
  { name: "Sachin", position: "Technical Secretary", img: sachin },
  { name: "Tushar Sankhla", position: "Logistics Secretary", img: tusharsankhla },
  { name: "Vinay Bansal", position: "Logistics Secretary", img: vinaybansal },
  { name: "Yashasvi Gautam", position: "Logistics Secretary", img: yashasvigautam },
  { name: "Pravesh Nath", position: "Finance Secretary", img: praveshnath },
  { name: "Rahul Bairwa", position: "Finance Secretary", img: rahulbairwa },
  { name: "Anushka Agrahari", position: "Mass & Media Secretary", img: anushkaagrahari },
  { name: "Raj Bilonia", position: "Mass & Media Secretary", img: rajbilonia },
  { name: "Nitin Kumar", position: "Mass & Media Secretary", img: nitinkumar },
  { name: "Ayush Agarwal", position: "Mass & Media Secretary", img: ayushagarwal },
  { name: "Nehal Dave", position: "Publicity Secretary", img: nehaldave },
  { name: "Aman Tiwari", position: "Publicity Secretary", img: amanamarnathtiwari },
  { name: "Aditi Bajpai", position: "Publicity Secretary", img: aditibajpai },
  { name: "Rochit Jain", position: "Marketing Secretary", img: rochitjain },
  { name: "Ansh Shah", position: "Marketing Secretary", img: anshshah },
  { name: "Tanisha Godha", position: "Marketing Secretary", img: tanishagodha },
  { name: "Giriraj", position: "Decor Secretary", img: giriraj },
  { name: "Divyanshi Kushwah", position: "Decor Secretary", img: divyanshikushwah },
];


const advisors_team = [
  {
    "name": "Krithik Mohan",
    "position": "Advisor to VP + Cultural Secretary",
    "img": krithik
  },
  {
    "name": "Jasneet Singh",
    "position": "Advisor to Logistics + Decor Secretary",
    "img": jassi
  },
  {
    "name": "Vidit Awasthi",
    "position": "Advisor to President",
    "img": vidit
  },
  {
    "name": "Madhvendra Singh",
    "position": "Advisor to Logistics + Decor Secretary",
    "img": mad
  },
  {
    "name": "Rudra Purohit",
    "position": "Advisor to Marketing Secretary",
    "img": rudra
  },
  {
    "name": "Ronak Gupta",
    "position": "Advisor to Technical Secretary",
    "img": ronak
  },
  {
    "name": "Ankit Sharma",
    "position": "Advisor to General Secretary + Operational Management",
    "img": ankit
  }
]


  const organizing_team = [{ name: "Rochit Jain", position: "Marketing Secretary", img: rochitjain },
    { name: "Ansh Shah", position: "Marketing Secretary", img: anshshah },
    { name: "Tanisha Godha", position: "Marketing Secretary", img: tanishagodha },
    { name: "Giriraj", position: "Decor Secretary", img: giriraj },
    { name: "Divyanshi Kushwah", position: "Decor Secretary", img: divyanshikushwah },{ name: "Vinay Bansal", position: "Logistics Secretary", img: vinaybansal },
    { name: "Yashasvi Gautam", position: "Logistics Secretary", img: yashasvigautam },
    { name: "Pravesh Nath", position: "Finance Secretary", img: praveshnath },
    { name: "Rahul Bairwa", position: "Finance Secretary", img: rahulbairwa },
    { name: "Anushka Agrahari", position: "Mass & Media Secretary", img: anushkaagrahari },
    { name: "Raj Bilonia", position: "Mass & Media Secretary", img: rajbilonia },]

    const Team = () => {
      const [activeTab, setActiveTab] = useState("core"); // Default tab is Core Team
      const scrollContainerRef = useRef(null);
      const scrollContainerInnerRef = useRef(null);
    
      useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const scrollContainerInner = scrollContainerInnerRef.current;
    
        const startScroll = () => {
          if (scrollContainer) {
            const scrollSpeed = 2; // Speed in pixels per frame
    
            // Function to move the scroll to the right
            const scroll = () => {
              if (scrollContainerInner) {
                // Move the scroll to the right
                scrollContainer.scrollLeft += scrollSpeed;
    
                // When scroll reaches the end, reset to the start of the scroll container
                if (
                  scrollContainer.scrollLeft >=
                  scrollContainerInner.scrollWidth - scrollContainer.clientWidth
                ) {
                  scrollContainer.scrollLeft = 0; // Reset to start
                }
    
                requestAnimationFrame(scroll);
              }
            };
    
            // Start infinite scroll
            scroll();
          }
        };
    
        // Start scrolling when the component mounts
        startScroll();
    
        // Cleanup function when the component unmounts
        return () => cancelAnimationFrame(startScroll);
      }, []);
    
      // Function to switch tabs
      const handleTabSwitch = (tab) => {
        setActiveTab(tab);
      };
    
      // Select team data based on the active tab
      let teamData;
      if (activeTab === "organizing") {
        teamData = organizing_team;
      } else if (activeTab === "advisors") {
        teamData = advisors_team;
      } else {
        teamData = core_team; // Default to core team
      }
    
      return (
        <div className="h-screen w-full bg-transparent relative overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${teamImg})` }}
          ></div>
    
          {/* Heading */}
          <h2
            className="text-center tracking-wider mx-auto font-bold text-5xl text-white mt-24 z-20 mb-0 drop-shadow-lg"
            style={{ fontFamily: "'Metal Mania', cursive" }}
          >
            {activeTab === "organizing"
              ? "Organizing Team"
              : activeTab === "advisors"
              ? "Advisors Team"
              : "Core Team"}
          </h2>
    
          {/* Horizontal Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className="z-10 flex space-x-8 -mt-42 mx-auto justify-center items-center"
            style={{
              whiteSpace: "nowrap",
              maxHeight: "100vh",
              overflowX: "scroll",
              scrollBehavior: "smooth", // Smooth scroll
            }}
          >
            {/* Wrapper to allow infinite scrolling */}
            <div ref={scrollContainerInnerRef} className="flex">
              {teamData.map((member, index) => (
                <div key={index} className="inline-block">
                  <TeamCard img={member.img} name={member.name} post={member.position} />
                </div>
              ))}
              {/* Duplicate the content for seamless looping */}
              {teamData.map((member, index) => (
                <div key={index + teamData.length} className="inline-block">
                  <TeamCard img={member.img} name={member.name} post={member.position} />
                </div>
              ))}
            </div>
          </div>
    
          {/* Tab Buttons */}
          <div className="flex justify-center items-center gap-8 mt-6">
            <button
              style={{ fontFamily: "cursive" }}
              className={`relative py-3 border border-black px-8 text-xl font-semibold uppercase text-white bg-transparent rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
                activeTab === "core"
                  ? "bg-white/30 shadow-2xl"
                  : "hover:bg-white/40 hover:shadow-xl"
              }`}
              onClick={() => handleTabSwitch("core")}
            >
              Core Team
            </button>
    
            <button
              style={{ fontFamily: "cursive" }}
              className={`relative py-3 px-8 border border-black text-xl font-semibold uppercase text-white bg-transparent rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
                activeTab === "organizing"
                  ? "bg-white/30 shadow-2xl"
                  : "hover:bg-white/40 hover:shadow-xl"
              }`}
              onClick={() => handleTabSwitch("organizing")}
            >
              Organizing Team
            </button>
    
            <button
              style={{ fontFamily: "cursive" }}
              className={`relative py-3 px-8 border border-black text-xl font-semibold uppercase text-white bg-transparent rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
                activeTab === "advisors"
                  ? "bg-white/30 shadow-2xl"
                  : "hover:bg-white/40 hover:shadow-xl"
              }`}
              onClick={() => handleTabSwitch("advisors")}
            >
              Advisors Team
            </button>
          </div>
        </div>
      );
    };
    
    export default Team;
    
    
