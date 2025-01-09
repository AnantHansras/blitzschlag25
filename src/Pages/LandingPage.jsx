import React, { useEffect, useRef } from "react";
import Home from "./Home";
import Team from "./Team";
import EventImg from "../Assets/eventbg.jpg";
import "../css files/animation.css";
import Transition from "../transition";
import Login from "./Login";
import SignUp from "./SignUp";
import mnitlogo from "../Assets/mnitlogo.png";
import clublogo from "../Assets/culturalclublogo.png";
import "../css files/landing.css";

import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

// Custom Hook to handle scroll progress
const useScrollProgress = (threshold, onThresholdReached) => {
  const observer = useRef();

  useEffect(() => {
    const options = {
      threshold,
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onThresholdReached(entry.target.id); // Pass the section ID when the threshold is reached
        }
      });
    }, options);

    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((section) => observer.current.observe(section));

    return () => {
      sections.forEach((section) => observer.current.unobserve(section));
    };
  }, [threshold, onThresholdReached]);
};

const LandingPage = () => {
 
  // useScrollProgress(0.3, handleScrollProgress); // Trigger at 30% threshold

  return (
    <ScrollContainer>
      {/* Home Section */}
      {/* <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <div
            id="Home"
            className="scroll-section h-screen w-screen"
          > */}
            <Home />
          {/* </div>
        </Animator>
      </ScrollPage> */}
      <ScrollPage>
  <Animator animation={ZoomInScrollOut}>
    <div className="w-screen h-screen flex justify-center items-center">
      
    <h1
      style={{
        fontSize: "50px",
        background: "linear-gradient(45deg, #ff6a00, #ee0979, #ff00b9)",
        backgroundClip: "text",
        color: "transparent",
        fontWeight: "600",
        textAlign: "center",
        textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        letterSpacing: "2px",
        animation: "glowAnimation 3s ease-in-out infinite",
      }}
      >
      Event
    </h1>
      </div>
  </Animator>
</ScrollPage>

      {/* Event Section */}
      <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <div
            id="Event"
            className="scroll-section h-screen w-screen "
          >
            <Event />
          </div>
        </Animator>
      </ScrollPage>
      <ScrollPage>
  <Animator animation={ZoomInScrollOut}>
    <h1
      style={{
        fontSize: "50px",
        background: "linear-gradient(45deg, #ff6a00, #ee0979, #ff00b9)",
        backgroundClip: "text",
        color: "transparent",
        fontWeight: "600",
        textAlign: "center",
        textShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        letterSpacing: "2px",
        animation: "glowAnimation 3s ease-in-out infinite",
      }}
    >
      Team
    </h1>
  </Animator>
</ScrollPage>

      {/* Team Section */}
      <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <div
            id="Team"
            className="scroll-section h-screen w-screen"
          >
            <Team />
          </div>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={batch(StickyIn(), FadeIn())}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <span style={{ fontSize: "40px", textAlign: "center" }}>
              <Animator animation={MoveIn(-1000, 0)}>
                <p>
                  Get Support <br />
                  Contact Us: <br />
                  Sachin Agarwal (Technical Secretary)
                  <br />
                  Lokesh Kumar Suthar (Technical Secretary)
                </p>
              </Animator>

              <Animator animation={MoveIn(1000, 0)}>
                <div className="flex flex-col sm:flex-row justify-center gap-8 items-center mt-4 sm:mt-0">
                  <div className="text-white">Follow Us:</div>
                  <div className="flex justify-center gap-4 items-center">
                    {/* YouTube */}
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="fill-white"
                          d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
                        />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-pink-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="fill-white"
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        />
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="fill-white"
                          d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
                        />
                      </svg>
                    </a>

                    {/* Twitter */}
                    <a
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="fill-white"
                          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </Animator>
            </span>

            <Animator animation={MoveOut(-1000, 0)}>
              <img src={mnitlogo} className="w-24 h-24 " alt="MNIT Logo" />
            </Animator>

            <Animator animation={MoveOut(1000, 0)}>
              <img
                src={clublogo}
                className="w-24 h-24 "
                alt="Cultural Club Logo"
              />
            </Animator>
          </div>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
};

export default Transition(LandingPage);
