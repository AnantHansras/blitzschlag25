import React from 'react';
import bg from '../Assets/sponsor.jpg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import mnit from '../Assets/prabhaBhawan.jpg'
import cs from '../Assets/cs_image.png'
import blitz from '../Assets/Blitz_Cover2023.jpg'
const AboutUs = () => {
  const navigate = useNavigate();

  // Animation Variants
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      className="h-screen w-full bg-transparent relative overflow-y-scroll"
      style={{ fontFamily: 'cursive' }}
    >
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      <div className="text-white overflow-y-auto">
        {/* Hero Section */}
        <section className="relative text-center py-16">
          <h1
            className="text-6xl font-bold mt-8 tracking-wider text-center"
            style={{ fontFamily: "'Metal Mania', cursive" }}
          >
            About Us
          </h1>
        </section>

        {/* About Blitz */}
        <section className="relative py-8 mt-2 px-6 lg:px-20 grid lg:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <img
              src={blitz}
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          {/* Content */}
          <motion.div
            className="bg-black rounded-xl bg-opacity-20 p-5 text-center"
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">About Blitzschlag</h2>
            <p className="text-gray-300 mb-6">
            Blitzschlag 2025, the much-awaited annual fest, is all set to take place from the 7th to the 9th of February 2025. This grand celebration of art, culture, and technology promises an unforgettable experience for everyone. With a perfect blend of electrifying performances, innovative competitions, and insightful workshops, Blitzschlag offers something for every enthusiast. It’s more than just an event; it’s a platform to showcase talent, ignite creativity, and connect with like-minded individuals. Get ready to immerse yourself in three days of excitement, inspiration, and endless memories.
            </p>
          </motion.div>
        </section>

        {/* Theme */}
        <section className="relative py-8 mt-2 px-6 lg:px-20 grid grid-flow-row lg:grid-cols-2 gap-8 items-center lg:flex-row ">
          {/* Content */}
          <motion.div
            className="bg-black rounded-xl bg-opacity-20 p-5 text-center"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">Theme</h2>
            <p className="text-gray-300 mb-6">
              MNIT Jaipur is a leading institute fostering academic excellence and cultural growth.
              From February 2nd to 4th, 2024, immerse yourselves in an electrifying celebration of
              human expression during BLITZSCHLAG.
            </p>
          </motion.div>
          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 gap-8 text-center"
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <div>
              <h3 className="text-3xl font-bold">35000+</h3>
              <p className="text-gray-400">Footfalls</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">100000+</h3>
              <p className="text-gray-400">Prize worth</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">70+</h3>
              <p className="text-gray-400">Events</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold">80+</h3>
              <p className="text-gray-400">Awards</p>
            </div>
          </motion.div>
        </section>

        {/* MNIT */}
        <section className="relative py-8 px-6 lg:px-20 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <img
              src={mnit}
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            className="bg-black rounded-xl bg-opacity-20 p-5 text-center"
            variants={slideInFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <h2 className="text-4xl font-bold mb-4">About MNIT</h2>
            <p className="text-gray-300 mb-6">
            The Institute was jointly established in 1963 as Malaviya Regional Engineering College Jaipur by the Government of India and the Government of Rajasthan. Subsequently, on 26 June, 2002, the college was given the status of National Institute of Technology. On 15 August 2007, it was recognized as the Institute of National Importance through an Act of Parliament. The Institute is fully funded by the Ministry of Education (Shiksha Mantralaya), Government of India.
            </p>
          </motion.div>
        </section>

        {/* abbout cacs */}
        <section className="relative py-8 mt-2 px-6 lg:px-20 grid grid-flow-row lg:grid-cols-2 gap-8 items-center lg:flex-row">
  {/* Content */}
  <motion.div
    className="bg-black rounded-xl bg-opacity-20 p-5 text-center order-2 lg:order-1"
    variants={slideInFromLeft}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
  >
    <h2 className="text-4xl font-bold mb-4">About CACS</h2>
    <p className="text-gray-300 mb-6">
      Cultural Society of the Institute is an umbrella that shelters numerous clubs and societies. The motto is to facilitate and promote opportunities as well as a platform for students to prove their mettle and to explore their passion through a plethora of interactive and innovative events. 
      Participating in cultural pursuits helps you become more well-rounded and ready for the real world. They aid in students' sense of belonging to the Institute and help them grow professionally and personally by honing abilities including planning, public speaking, and teamwork.
    </p>
  </motion.div>

  {/* Image */}
  <motion.div
    className="order-1 lg:order-2"
    variants={slideInFromRight}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
  >
    <img
      src={cs}
      alt="About Us"
      className="rounded-lg shadow-lg ml-auto"
    />
  </motion.div>
</section>



        {/* Call to Action */}
        <section className="relative py-16 text-center">
          <motion.h2
            className="text-4xl font-bold mb-4"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            We Are Always Ready To Take A Perfect Shot
          </motion.h2>
          <button
            onClick={() => navigate('/event')}
            className="py-3 px-8 bg-white text-black rounded-full font-semibold transition duration-300 hover:bg-gray-200"
            
          >
            Get Started
          </button>
        </section>
        <div className="text-center py-6 text-gray-400">
          <p>
            The information provided here is not final and will be updated soon. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
