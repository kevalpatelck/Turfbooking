import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminPanel.css";

export default function Adminpannel() {
  const [turfDropdown, setTurfDropdown] = useState(false);
  const [bookingDropdown, setBookingDropdown] = useState(false);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">📊 Datta Able</div>
        <nav>
          <ul>
            <li><Link to="/dash">🏠 Dashboard</Link></li>
            <li><Link to="/analytics">📊 Analytics</Link></li>
   &nbsp;

            {/* Turf Management Dropdown */}
            <li onClick={() => setTurfDropdown(!turfDropdown)} style={{ cursor: "pointer" }}>
              🌱 Turf Management {turfDropdown ? "🔼" : "🔽"}
            </li>
            {turfDropdown && (
              <ul className="dropdown">
                <li><Link to="/addturf">➕ Add Turf</Link></li>
                <li><Link to="/manageturf">🛠️ Manage Turf</Link></li>
              </ul>
            )}

&nbsp;

            {/* Bookings Dropdown */}
            <li onClick={() => setBookingDropdown(!bookingDropdown)} style={{ cursor: "pointer" }}>
              📅 Bookings {bookingDropdown ? "🔼" : "🔽"}
            </li>
            {bookingDropdown && (
              <ul className="dropdown">
                <li><Link to="/manageBookings">📝 Manage Bookings</Link></li>
                <li><Link to="/viewbookings">👀 View Bookings</Link></li>
              </ul>
            )}
          </ul>
        </nav>
       
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <header className="navbar">
          <input type="text" className="search-bar" placeholder="Search..." />
          <div className="nav-icons">
            <button>🌞</button>
            <button>⚙️</button>
            <button className="notification">
              🔔 <span className="badge">3</span>
            </button>
            <div className="profile">
              <img src="https://via.placeholder.com/40" alt="User" />
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="content">
          <Outlet /> {/* This will load the specific page content */}
        </main>
      </div>
    </div>
  );
}
