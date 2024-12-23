import './App.css';
import { Route, Routes ,useLocation} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Events from './Pages/Events';
import Sponsor from './Pages/Sponsor';
import Team from './Pages/Team';
import Schedule from './Pages/Schedule';
import Profile from './Pages/Profile';
import CampusEmbassador from './Pages/CampusEmbassador';
import Auth from './Pages/Auth';
import Pronight from './Pages/Pronight';
import Pass from './Pages/Pass';
import Error from './Pages/Error';
import Model3D from './Pages/Model3D';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const location = useLocation();
  return (
    <div className='bg-[#0b0d10] w-screen h-screen text-white'>
        <div className='w-screen h-screen text-white'>
          {location.pathname !== '/model3d' && <Navbar />}
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/event" element={<Events />} />
              <Route path="/sponsor" element={<Sponsor />} />
              <Route path="/our_team" element={<Team />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/campus_embassador" element={<CampusEmbassador />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/pronight" element={<Pronight />} />
              <Route path="/model3d" element={<Model3D />} />
              <Route path="/pass" element={<Pass />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </div>
      <ToastContainer />
    </div>
  );
}

export default App;
