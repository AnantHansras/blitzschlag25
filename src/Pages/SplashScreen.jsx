import React, { useEffect, useState } from 'react';
import Video from '../Components/Video';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if the website has been visited before
    const isFirstVisit = !localStorage.getItem('hasVisited');

    if (isFirstVisit) {
      // Show splash screen and set the localStorage flag after first visit
      const timer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('hasVisited', 'true');
      }, 6000); // Duration of the animation (8 seconds)
      
      return () => clearTimeout(timer);
    } else {
      // If already visited, hide splash screen
      setIsVisible(false);
    }
  }, []);

  return (
    <div className={`splash-container ${isVisible ? 'show' : 'hide'}`}>
      {isVisible && <Video />} {/* Only render the video if the splash is visible */}
    </div>
  );
};

export default SplashScreen;
