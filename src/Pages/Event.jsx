import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import eventData from "../data/eventData"; 
import SingleComponent from "../Components/single"; 
import TeamComponent from "../Components/team"; 
import eventbg from "../Assets/loginbg.jpg"; 
import Transition from "../transition";
import { auth } from "../../firebase"; 
import "../css files/events.css";
import Drawer from 'react-modern-drawer'; // Import the Drawer component
import { CardBody, CardContainer, CardItem } from "../Components/3dcard";

const Events = () => {
  const [uid, setUid] = useState(null); // State for storing the UID
  const [activeTab, setActiveTab] = useState("flagship"); // Default active tab
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control the drawer visibility
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [teamCode, setTeamCode] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [showEvents, setShowEvents] = useState(false); 

  // Fetch the current user's UID from Firebase on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid); // Set the UID if the user is logged in
      } else {
        setUid(null); // If no user is logged in, set UID to null
      }
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  // Filter events by the selected category
  const filteredEvents = Object.values(eventData).filter(event => event.type === activeTab);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowEvents(true); // Show events when a category is selected
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setShowEvents(false); // Hide events and show categories
  };

  // Handle Join Team action
  const handleJoinTeam = async () => {
    if (!uid) {
      toast.error("You must be logged in to join a team.");
      return;
    }

    if (!teamCode) {
      toast.error("Please enter a team code.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jointeam`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,      // Pass the uid of the user
          teamCode, // Pass the entered team code
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to join the team.");
      }

      const data = await response.json();
      toast.success(data.message); // Show success message from the backend
      setTeamCode(""); // Clear the team code input after successful join

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to join the team. Please try again.");
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  // Open the drawer with the selected event
  const openDrawer = (event) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  // Close the drawer
  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedEvent(null);
  };

  const categories = {
    category1: "flagship",
    category2: "fun",
    category3: "club",
    category4: "attraction",
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleJoinTeam();
    }
  };


  const getBackgroundImage = (key) => {
    const images = {
      category1: 'flagship.png',
      category2: 'fun.png',
      category3: 'club_event.png',
      category4: 'main_att.png',
    };
    return images[key] || ''; // Return the correct background image
  };

  return (
    <div
      className="p-8 min-h-screen text-white"
      style={{
        backgroundImage: `url(${eventbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
 <p
    style={{ fontFamily: '"Amarante", serif' }}
    className="text-center mx-auto w-fit text-7xl mt-20 mb-8 font-normal bg-gradient-to-r from-[#071182] via-[#00ffc3] to-[#ff5050] bg-clip-text text-transparent"
  >
    EVENTS
  </p>

{/* Event Handling Section */}
<div className="flex flex-col sm:flex-row justify-center items-center my-8 gap-4">
   <input
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
          onKeyDown={handleKeyPress}
          name="text"
          class="input"
          placeholder="Type your text"
        ></input>
  <button
          onClick={handleJoinTeam}
          disabled={loading}
          className={`w-full btn sm:w-auto border-white bg-opacity-80 bg-black text-gray-300 px-4 py-3 rounded-lg hover:ring-2 hover:ring-indigo-500 hover:border-indigo-500 transition-all duration-300 border-2 relative overflow-hidden ${
            loading
              ? "bg-black border-white text-white cursor-not-allowed"
              : "bg-black border-indigo-500 text-white"
          }`}
        >
          {/* Circles */}
          <span className="circle1"></span>
          <span className="circle2"></span>
          <span className="circle3"></span>
          <span className="circle4"></span>
          <span className="circle5"></span>

          {/* Text */}
          <span className="text">{loading ? "Joining..." : "Join Team"}</span>
        </button>

</div>

{/* Back to Categories Button */}
{showEvents && (
  <div className="flex justify-center my-4">
    <button
      onClick={handleBackToCategories}
      className="w-full -mt-4 mb-8 sm:w-auto bg-black bg-opacity-80 border-2 border-white text-white p-4 rounded-lg"
    >
      Back to Categories
    </button>
  </div>
)}


{/* Category Buttons */}
{!showEvents && (
  <div className="category-buttons mt-24 relative flex flex-col items-center">
    {/* Rotating Cards */}
    <div className="box flex flex-wrap justify-center z-10">
      {Object.entries(categories).map(([key, value]) => (
        <div
          className="category-btn"
          key={key}
          style={{ margin: "10px", transition: "transform 0.3s ease" }}
        >
          <button
            onClick={() => handleTabChange(value)}
            style={{
              backgroundImage: `url(../../src/Assets/${key}.png)`, // Dynamically set the image
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "200px",
              height: "200px",
              borderRadius: "18px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              position: "relative", // For holographic effect
              boxShadow: "0 15px 25px rgba(0, 0, 0, 0.2)", // Shadow for hovering
            }}
            className="hover:scale-110 hover:bg-white hover:text-gray-900"
          >
            <span
              style={{
                color: "white", // White text color
                fontSize: "1.5rem", // Adjust the font size
                fontWeight: "bold",
                textShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow for text
              }}
            >
              {value}
            </span>
          </button>
        </div>
      ))}
    </div>
  </div>
)}


{/* Event Cards */}
{showEvents && (
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
      {filteredEvents.length === 0 ? (
        <p className="text-center text-white">No events available for this category.</p>
      ) : (
        filteredEvents.map((event, index) => (
          <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:bg-opacity-50 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {event.name}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {event.description.slice(0,50)}...
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    rotateX={20}
                    rotateZ={-10}
                    className="w-full mt-4"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                  <div className="flex justify-end items-center mt-4">
                    <CardItem
                      translateZ={20}
                      translateX={40}
                      as="button"
                      onClick={() => openDrawer(event)}
                      className="px-4 py-2  rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                      View Details
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
          // <div
          //   key={index}
          //   className="relative group border border-gray-200 rounded-lg shadow-md overflow-hidden"
          //   style={{
          //     height: '300px',
          //     width: '100%',
          //     background: 'linear-gradient(135deg, #c31432, #240b36, #3b8d99)',
          //   }}
          // >
          //   <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
          //     <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center text-white">
          //       {event.name}
          //     </h3>
          //     <p className="text-xs sm:text-sm text-gray-100 text-center">
          //       {event.description.slice(0, 100)}...
          //     </p>
          //   </div>

          //   <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          //     <img
          //       src={event.imgUrl}
          //       alt={event.name}
          //       className="w-full h-full object-cover"
          //     />
          //     <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          //       <button
          //         onClick={() => openDrawer(event)}
          //         className="bg-white text-gray-900 px-4 sm:px-6 py-2 rounded-lg font-semibold transform hover:scale-105"
          //       >
          //         View Details
          //       </button>
          //     </div>
          //   </div>
          // </div>
        ))
      )}
    </div>
  </div>
)}


{/* Drawer for Event Details */}
{selectedEvent && (
  <Drawer
    overlayOpacity={0}
    open={drawerOpen}
    onClose={closeDrawer}
    direction="bottom"
    size={400}
    style={{
      left: 0,
      right: 0,
      bottom: 0,
      transform: 'translate3d(0, 100%, 0)',
      width: '100%',
      background: 'rgba(0, 0, 0, 0.9)',
      position: 'fixed',
      maxHeight: drawerOpen ? '100vh' : '0vh',
      overflowY: 'auto',
      transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
      opacity: drawerOpen ? 1 : 0,
    }}
  >
    <div className="h-full w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* First Div */}
      <div className="md:col-span-1">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center md:text-left">
          {selectedEvent.name}
        </h2>
        <p className="mb-4 text-sm sm:text-base text-center md:text-left">
          {selectedEvent.description}
        </p>
      </div>

      {/* Second Div */}
      <div className="md:col-span-1">
        <p className="text-sm sm:text-base text-center md:text-left">
          <strong>Venue:</strong> {selectedEvent.venue}
        </p>
        <p className="text-sm sm:text-base text-center md:text-left">
          <strong>Max Team Size:</strong> {selectedEvent.maxTeamSize}
        </p>
        <p className="text-sm sm:text-base text-center md:text-left">
          <strong>Category:</strong> {selectedEvent.type}
        </p>
        <div className="mt-6">
          {selectedEvent.maxTeamSize === 1 ? (
            <SingleComponent event={selectedEvent} uid={uid} />
          ) : (
            <TeamComponent event={selectedEvent} uid={uid} />
          )}
        </div>
      </div>
    </div>
  </Drawer>
)}

    </div>
  );
};

export default Transition(Events);