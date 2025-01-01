import React from 'react'
import mnitlogo from '../Assets/mnitlogo.png';
import clublogo from '../Assets/culturalclublogo.png';
const Footer = () => {
    return (
        <div className='absolute bottom-0 px-16 py-8 w-full bg-black flex flex-col justify-center gap-4'>
            <div className='px-2 flex justify-between text-left'>
                <div className='flex'>
                    <img src={mnitlogo} className='w-32 h-32' alt="" />
                    <img src={clublogo} className='w-32 h-32' alt="" />
                </div> 
                <div>
                    Get Support<br/>
                    Contact Us :  <br/>
                    Sachin Agarwal (Technical Secretary) <br/>
                    Lokesh Kumar Suthar (Technical Secretary) <br/>
                </div>
            </div>
            <div className='w-full border-[1.5px] border-white '></div>
            <div className='px-2 flex justify-between text-left items-center'>
                <div>©Developed by Technical Team (CACS) for BLITZSCHLAG 2025</div>
                <div className='flex justify-center gap-8 items-center'>
                    <div>Follow Us : </div>
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
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        >
                        <path d="M23.5 6.2s-.2-1.6-.8-2.2c-.7-.8-1.5-.8-1.9-.9-2.7-.2-6.8-.2-6.8-.2h-.1s-4.1 0-6.8.2c-.4 0-1.3 0-1.9.9-.6.6-.8 2.2-.8 2.2s-.2 1.8-.2 3.6v1.7c0 1.8.2 3.6.2 3.6s.2 1.6.8 2.2c.7.8 1.6.8 2 .9 1.4.1 6.6.2 6.6.2s4.1 0 6.8-.2c.4 0 1.3 0 1.9-.9.6-.6.8-2.2.8-2.2s.2-1.8.2-3.6v-1.7c0-1.8-.2-3.6-.2-3.6zM9.6 14.9V8.9l6 3-6 3z" />
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
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        >
                        <path d="M7.8 2h8.4c3.2 0 5.8 2.6 5.8 5.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm4.2 4c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm5.6-1.5c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" />
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
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        >
                        <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.5 9.9v-7H8v-3h2.5v-1.8c0-2.4 1.4-3.8 3.5-3.8.7 0 1.5.1 2.2.2v2.5h-1.3c-1 0-1.2.5-1.2 1.2V12H16l-.5 3h-2v7c4.8-.8 8.5-4.9 8.5-9.9z" />
                        </svg>
                    </a>

                    {/* X (Twitter) */}
                    <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-400"
                    >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                        >
                        <path d="M23 3a10.9 10.9 0 01-3.1.8 5.4 5.4 0 002.4-3 10.9 10.9 0 01-3.4 1.3 5.4 5.4 0 00-9.3 4.9A15.3 15.3 0 011.7 2.1a5.4 5.4 0 001.7 7.2 5.4 5.4 0 01-2.5-.7v.1a5.4 5.4 0 004.3 5.3 5.5 5.5 0 01-2.4.1 5.4 5.4 0 005 3.7A10.9 10.9 0 010 20.3a15.3 15.3 0 008.3 2.4c10 0 15.4-8.3 15.4-15.4l-.1-.7A11 11 0 0023 3z" />
                        </svg>
                    </a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer;