import React from 'react'
import {useNavigate } from 'react-router-dom'
import logo from '../Assets/blitz_logo.png'
import { AnimatePresence,motion } from 'framer-motion'
const PageNA = () => {
    const navigate = useNavigate();
  return (
    <AnimatePresence>
        <div className='bg-[#2C2C2E]'>
        <main>
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
            
                <div className="max-w-lg mx-auto space-y-3 text-center">
                <motion.img
      src={logo}
      className="h-24 opacity-90 mx-auto"
      initial={{ y: -200}} // Start off-screen above the viewport
      animate={{ y: [-400, 20,-10, 0]}} // Fall down and bounce slightly
      transition={{
        duration: 1.2, // Total animation duration
        ease: "easeOut", // Ease out for natural effect
        times: [0, 0.7, 1], // Timing for keyframes
      }
      }
    />
                    <h3 className="text-gray-200 text-2xl font-semibold sm:text-3xl">
                        Page Under Construction 
                    </h3>
                    <p className="text-gray-400">
                    We're working on it!
The content you're looking for is currently unavailable, but we’re updating it and it will be available soon.
<<<<<<< HEAD
=======

>>>>>>> c9ecbfd66825ce0f26facdb4b2a024d7e41f42e5
Thank you for your patience!
                    </p>
                    <a onClick={()=>{navigate('/')}} className="text-indigo-500 duration-150 hover:text-indigo-100 font-medium inline-flex items-center gap-x-1">
                        Go back
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    </div>
    </AnimatePresence>
    
  )
}
<<<<<<< HEAD
=======

>>>>>>> c9ecbfd66825ce0f26facdb4b2a024d7e41f42e5
export default PageNA