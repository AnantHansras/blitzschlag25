import React from "react";
import { Animator, batch, Sticky, Fade, Move } from "react-scroll-motion";

const AnimatedTitle = ({ title }) => {
  return (
    <Animator animation={batch(Sticky(), Fade(), Move(0, -500))}>
      <h1
        className="text-5xl font-bold text-center"
        style={{
          background: "linear-gradient(45deg, #ff6a00, #ee0979, #ff00b9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          letterSpacing: "2px",
          animation:
            "glowAnimation 1.5s ease-in-out infinite, spinAnimation 5s linear infinite",
        }}
      >
        {title}
      </h1>
    </Animator>
  );
};

export default AnimatedTitle;
