import React, { useState } from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  const [NavComponents,setNavComponents] = useState(false);
  return (
    <div>
      {
        NavComponents ? 
        <div className='flex flex-col justify-center items-center'>
              <Link to='/' onClick={() => setNavComponents(false)}>Home</Link>
              <Link to='/about' onClick={() => setNavComponents(false)}>About</Link>
              <Link to='/event' onClick={() => setNavComponents(false)}>Events</Link>
              <Link to='/sponsor' onClick={() => setNavComponents(false)}>Sponsors</Link>
              <Link to='/our_team' onClick={() => setNavComponents(false)}>Our Team</Link>
              <Link to='/login' onClick={() => setNavComponents(false)}>login</Link>
              <Link to='/schedule' onClick={() => setNavComponents(false)}>Schedule</Link>
              <Link to='/profile' onClick={() => setNavComponents(false)}>Profile</Link>
              <Link to='/campus_embassador' onClick={() => setNavComponents(false)}>Campus Embassador</Link>
        </div>
        :
        <div className='flex justify-between'>
            <div>
              <Link to='/'>Logo</Link>
            </div>
            
            <div className='flex justify-between gap-x-3'>
              <Link to='/sponsor'>Sponsor</Link>
              <Link to='/event'>Events</Link>
              <Link to='/login'>Login</Link>
              <Link to='/schedule'>Schedule</Link>
            </div>
            
            <div onClick={() => setNavComponents(true)} className='cursor-pointer'>
              Hamburger
            </div>
        </div> 
      }
    </div>
    
  )
}

export default Navbar