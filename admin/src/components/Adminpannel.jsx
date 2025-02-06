import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [turfDropdown, setTurfDropdown] = useState(false);
  const [bookingDropdown, setBookingDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleModalToggle = () => {
    setShowModal(!showModal);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      // Store token in localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminName', data.name);
      localStorage.setItem('adminid', data.id);


      setSuccessMessage('Login successful! Redirecting...');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">📊 Datta Able</div>
        <nav>
          <ul>
            <li><Link to="/dash">🏠 Dashboard</Link></li>
            <li><Link to="/analytics">📊 Analytics</Link></li>

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
          <div className="nav-icons">
            {localStorage.getItem("adminToken") ? (
              <div>
                <span>Welcome, {localStorage.getItem("adminName")} 👋</span>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <button id="btn" onClick={handleModalToggle}>
                <i className="fa fa-sign-in-alt" /> Login here
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="content">
          <Outlet />
        </main>
      </div>

      {/* Modal for Login */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Admin Login</h5>
                <button type="button" className="close" onClick={handleModalToggle}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
