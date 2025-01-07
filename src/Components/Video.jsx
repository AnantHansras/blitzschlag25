import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import video from "../Assets/video.mp4";

const Video = () => {
  const [videoEnded, setVideoEnded] = useState(false); // Track video state
  const [fadeOut, setFadeOut] = useState(false); // Control fade effect
  const [isMuted, setIsMuted] = useState(true); // Mute state
  const videoRef = useRef(null); // Reference to the video element
  const navigate = useNavigate();

  // Toggle audio mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setFadeOut(true);
    setTimeout(() => {
      setVideoEnded(true);
      navigate('/'); // Navigate to the home page
    }, 1000); // Smooth transition
  };

  // Skip video
  const handleSkip = () => {
    handleVideoEnd();
  };

  return (
    <div className={`main relative h-screen w-screen ${videoEnded ? 'bg-black' : ''}`}>
      {!videoEnded && (
        <div className={`video-container h-full w-full ${fadeOut ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
            <video
            className="video"
            ref={videoRef}
            autoPlay
            muted={isMuted}
            preload="true"
            onEnded={handleVideoEnd}
            onLoadedMetadata={() => {
                if (videoRef.current) {
                videoRef.current.playbackRate = 1.75; // Set playback speed
                }
            }}
            >
            <source src={video} type="video/mp4" />
            </video>
        </div>
      )}
    </div>
  );
};

export default Video;
