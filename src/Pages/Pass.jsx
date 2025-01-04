import React from 'react'
import QRmodal from '../Components/QRmodal'
import { useState } from 'react';
const Pass = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    
    <div className='flex justify-center items-center'>
        <button onClick={toggleModal} className='text-xl p-2 rounded-xl bg-blue-400 text-red-900 mt-20 z-10'>
        CLICK ME
        </button>
        {
          isOpen && <QRmodal  toggleModal={toggleModal} amount={1000}/>
        }
    </div>
  )
}

export default Pass