import './App.css'
import {Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Events from './Pages/Events'
import Sponsor from './Pages/Sponsor'
import Team from './Pages/Team'
import Schedule from './Pages/Schedule'
import Profile from './Pages/Profile'
import CampusEmbassador from './Pages/CampusEmbassador'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Error from './Pages/Error'

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About />} />
      <Route path="/event" element={<Events />} />
      <Route path="/sponsor" element={<Sponsor />} />
      <Route path="/our_team" element={<Team/>} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/campus_embassador" element={<CampusEmbassador />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="*" element={<Error />} />

    </Routes>
    </div>
  )
}
export default App
/*
Home 
About Us
Theme
events
pronites
sponsers
our team
campus embassador
Register(user id)

Pages
1.) Registration page(backend)
2.) AboutUs Page 
3.) Event Page
4.) Sponser Page
5.) Campus Embassador
6.) Merchandise page(optional)

Scroll over:
Home 
aboutus 
theme

framermotion and 3js , explore these libraries
*/