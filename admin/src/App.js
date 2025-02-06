import './App.css';
import{BrowserRouter,Route,Routes} from 'react-router-dom';

import Adminpannel from "./components/Adminpannel";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Messages from "./components/Messages";
import Settings from "./components/Settings";
import AddTurfForm from './components/AddTurfForm';
import ManageTurfs from './components/ManageTurfs';
import ManageBookings from './components/ManageBookings';
import ViewBookings from './components/ViewBookings';

function App() {
  return (
    <div >
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Adminpannel />}>

          {/* Nested routes for the AdminPanel */}
          <Route path="dash" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
          <Route path="addturf" element={<AddTurfForm />} />
          <Route path="manageturf" element={<ManageTurfs />} />
          <Route path="manageBookings" element={<ManageBookings />} />
          <Route path="viewbookings" element={<ViewBookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
