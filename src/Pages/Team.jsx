import React, { useEffect, useRef, useState } from "react";
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
import ashokkumarmeena from "../Assets/ashokkumarmeena.jpg";
import simichaudhary from "../Assets/simichaudhary.jpg";
import vinaytanwawr from "../Assets/vinaytanwar.jpg"; 

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
  {
    name: "Aayush Sarraff",
    position: "Cultural Secretary",
    img: aayushsarraff,
  },
  { name: "Subhrajit Roy", position: "Cultural Secretary", img: subhrajitroy },
  { name: "Jitesh Yadav", position: "General Secretary", img: jiteshyadav },
  { name: "Aryaman Sharma", position: "General Secretary", img: aryamansharma },
  {
    name: "Shravya Bhamidipati",
    position: "General Secretary",
    img: shravyabhamidipati,
  },
  { name: "Ishan Hemnani", position: "Technical Secretary", img: ishanhemnani },
  { name: "Shani Rajput", position: "Technical Secretary", img: shanirajput },
  { name: "Sachin", position: "Technical Secretary", img: sachin },
  {
    name: "Tushar Sankhla",
    position: "Logistics Secretary",
    img: tusharsankhla,
  },
  { name: "Vinay Bansal", position: "Logistics Secretary", img: vinaybansal },
  {
    name: "Yashasvi Gautam",
    position: "Logistics Secretary",
    img: yashasvigautam,
  },
  { name: "Pravesh Nath", position: "Finance Secretary", img: praveshnath },
  { name: "Rahul Bairwa", position: "Finance Secretary", img: rahulbairwa },
  {
    name: "Anushka Agrahari",
    position: "Mass & Media Secretary",
    img: anushkaagrahari,
  },
  { name: "Raj Bilonia", position: "Mass & Media Secretary", img: rajbilonia },
  { name: "Nitin Kumar", position: "Mass & Media Secretary", img: nitinkumar },
  {
    name: "Ayush Agarwal",
    position: "Mass & Media Secretary",
    img: ayushagarwal,
  },
  { name: "Nehal Dave", position: "Publicity Secretary", img: nehaldave },
  {
    name: "Aman Tiwari",
    position: "Publicity Secretary",
    img: amanamarnathtiwari,
  },
  { name: "Aditi Bajpai", position: "Publicity Secretary", img: aditibajpai },
  { name: "Rochit Jain", position: "Marketing Secretary", img: rochitjain },
  { name: "Ansh Shah", position: "Marketing Secretary", img: anshshah },
  { name: "Tanisha Godha", position: "Marketing Secretary", img: tanishagodha },
  { name: "Giriraj", position: "Decor Secretary", img: giriraj },
  {
    name: "Divyanshi Kushwah",
    position: "Decor Secretary",
    img: divyanshikushwah,
  },
];

const advisors_team = [
  {
    name: "Krithik Mohan",
    position: "Advisor to VP + Cultural Secretary",
    img: krithik,
  },
  {
    name: "Jasneet Singh",
    position: "Advisor to Logistics + Decor Secretary",
    img: jassi,
  },
  {
    name: "Vidit Awasthi",
    position: "Advisor to President",
    img: vidit,
  },
  {
    name: "Madhvendra Singh",
    position: "Advisor to Logistics + Decor Secretary",
    img: mad,
  },
  {
    name: "Rudra Purohit",
    position: "Advisor to Marketing Secretary",
    img: rudra,
  },
  {
    name: "Ronak Gupta",
    position: "Advisor to Technical Secretary",
    img: ronak,
  },
  {
    name: "Ankit Sharma",
    position: "Advisor to General Secretary + Operational Management",
    img: ankit,
  },
];

const special_mention=[
  {
    name:"Vinay Tanwar",
    position:"",
    img:vinaytanwawr,
  },
  {
    name:"Ashok Kumar Meena",
    position:"",
    img: ashokkumarmeena,
  },
  {
    name:"Simi Chaudhary",
    position:"",
    img: simichaudhary,
    
  },
]
    
    const Team = () => {
      const [activeTab, setActiveTab] = useState("core");
      const scrollContainerRef = useRef(null);
      const scrollContainerInnerRef = useRef(null);
      const animationFrameRef = useRef(null);
    
      useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        const scrollContainerInner = scrollContainerInnerRef.current;
        const scrollSpeed = 3;
    
        const scroll = () => {
          if (scrollContainer && scrollContainerInner) {
            scrollContainer.scrollLeft += scrollSpeed;
    
            if (
              scrollContainer.scrollLeft >=
              scrollContainerInner.scrollWidth - scrollContainer.clientWidth
            ) {
              scrollContainer.scrollLeft = 0;
            }
    
            animationFrameRef.current = requestAnimationFrame(scroll);
          }
        };
    
        scroll();
    
        return () => {
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        };
      }, []);
    
      const handleTabSwitch = (tab) => {
        setActiveTab(tab);
      };
    
      let teamData;
      if (activeTab === "advisors") {
        teamData = advisors_team;
      } else if( activeTab ==="special"){
        teamData = special_mention;
      }
      else{
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
        className="text-center tracking-wider mx-auto mb-20 font-bold text-5xl text-white mt-24 z-20 mb-0 drop-shadow-lg"
        style={{ fontFamily: "'Metal Mania', cursive" }}
      >
        { activeTab === "advisors"
          ? "Advisors Team"
          : activeTab === "special"
          ? "Special Mention"
          : "Core Team"}
      </h2>
    
          {/* Horizontal Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className="z-10 flex space-x-6 md:space-x-8 -mt-16 mx-auto justify-center items-center overflow-hidden max-h-[70vh]"
            style={{
              whiteSpace: "nowrap",
            }}
          >
            <div
              ref={scrollContainerInnerRef}
              className="flex justify-center"
            >
              {/* {teamData.map((member, index) => (
                <div
                  key={index}
                  className="inline-block mx-4 md:mx-6"
                  style={{ minWidth: "200px" }}
                >
                  <TeamCard img={member.img} name={member.name} post={member.position} />
                </div>
              ))} */}
              {teamData.map((member, index) => (
                <div
                  key={index + teamData.length}
                  className="inline-block mx-4 md:mx-6"
                  style={{ minWidth: "200px" }}
                >
                  <TeamCard img={member.img} name={member.name} post={member.position} />
                </div>
              ))}
            </div>
          </div>
    
          {/* Tab Buttons */}
          <div className="flex justify-center items-center gap-4 md:gap-8 px-4  scrollbar-hide">
  

  <button
    className={`relative py-2 px-4 sm:px-6 md:py-3 md:px-8 border border-black text-sm sm:text-lg md:text-xl font-semibold uppercase text-white bg-transparent rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
      activeTab === "special"
        ? "bg-white/30 shadow-2xl"
        : "hover:bg-white/40 hover:shadow-xl"
    }`}
    onClick={() => handleTabSwitch("special")}
  >
    Special Mention
  </button>
  <button
    className={`relative py-2 px-4 sm:px-6 md:py-3 md:px-8 border border-black text-sm sm:text-sm md:text-xl font-semibold uppercase text-white bg-transparent rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
      activeTab === "organizing"
        ? "bg-white/30 shadow-2xl"
        : "hover:bg-white/40 hover:shadow-xl"
    }`}
    onClick={() => handleTabSwitch("organizing")}
  >
    Core Team
  </button>
  <button
    className={`relative py-2 px-4 sm:px-6 md:py-3 md:px-8 border border-black text-sm sm:text-lg md:text-xl font-semibold uppercase text-white bg-transparent rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform ${
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
    
    
    
    
