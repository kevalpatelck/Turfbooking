import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Properties from './components/Properties';
import Singleproperty from './components/Singleproperty';
import Contact from './components/Contact';
import{BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import Adminpannel from "./Admin/Adminpannel";
import Dashboard from "./Admin/Dashboard";
import Analytics from "./Admin/Analytics";
import Messages from "./Admin/Messages";
import Settings from "./Admin/Settings";
import AddTurfForm from './Admin/AddTurfForm';
import ManageTurfs from './Admin/ManageTurfs';
import ManageBookings from './Admin/ManageBookings';
import ViewBookings from './Admin/ViewBookings';

function App() {
  return (
    <div >
      {/* <Homepage/> */}
      {/* <Properties/> */}
      {/* <Mainbanner/> */}
      {/* <Singleproperty/> */}
      {/* <Contact/> */}

      <BrowserRouter>
 <Header/>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={< Contact/>} />
        <Route path="/properties" element={< Properties/>} />
        <Route path="/property/:id" element={< Singleproperty/>} />
      


      </Routes>
  <Footer/>

    </BrowserRouter>



    
    {/* <Adminpannel/> */}



    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Adminpannel />}>
          <Route path="dash" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="addturf" element={<AddTurfForm />} />
          <Route path="manageturf" element={<ManageTurfs />} />
          <Route path="manageBookings" element={<ManageBookings/>} />
          <Route path="viewbookings" element={<ViewBookings />} />


        </Route>
      </Routes>
    </BrowserRouter> */}
    </div>
  );
}



  {/* <Route path="/login" element={< Login/>} /> */}
        {/* <Route path="/register" element={< Register/>} /> */}

export default App;
