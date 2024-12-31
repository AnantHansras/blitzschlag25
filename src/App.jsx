import './App.css';
import { Route, Routes ,useLocation} from 'react-router-dom';
import Navbar from './Components/Navbar';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import Home from './Pages/Home';
import About from './Pages/About';
import Sponsor from './Pages/Sponsor';
import Team from './Pages/Team';
import Event from './Pages/Event';
import Schedule from './Pages/Schedule';
import CampusEmbassador from './Pages/CampusEmbassador';
import Pronite from './Pages/Pronite';
import Pass from './Pages/Pass';
import Error from './Pages/Error';
import SignUp from './Pages/SignUp';
import Model3D from './Pages/Model3D';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const location = useLocation();
  return (
    <div className=' w-screen h-screen text-white'>
        <div className='w-screen h-screen text-white'>
          {location.pathname !== '/model3d' && <Navbar />}
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/sponsor" element={<Sponsor />} />
              <Route path="/our_team" element={<Team />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/campus_embassador" element={<CampusEmbassador />} />
              <Route path="/pronites" element={<Pronite />} />
              <Route path="/model3d" element={<Model3D />} />
              <Route path="/pass" element={<Pass />} />
              <Route path="*" element={<Error />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login/>} />
              <Route path="/event" element={<Event/>} />
            </Routes>
          </div>
        </div>

      <ToastContainer />
    </div>
  );
}

export default App;