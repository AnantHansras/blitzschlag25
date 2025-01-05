import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Hide the splash screen after the animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000); // Total duration of the animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-container ${isVisible ? 'show' : 'hide'}`}>
      <svg
        viewBox="0 0 600 200"
        xmlns="http://www.w3.org/2000/svg"
        className="carving-effect"
      >
        <rect width="100%" height="100%" fill="black" />
        
        <path
          className="knife-stroke"
          d="M50,100 Q150,50 250,100 T450,100"
        />
        <path
          className="knife-stroke"
          d="M60,130 Q120,100 200,130 T400,150"
        />
        <path
          className="knife-stroke"
          d="M80,160 Q140,120 220,160 T420,180"
        />
        
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          className="carved-text"
        >
          BLITZSCHLAG
        </text>
      </svg>
    </div>
  );
};

export default SplashScreen;
