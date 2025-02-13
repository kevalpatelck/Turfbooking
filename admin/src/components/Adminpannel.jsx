import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage('');
  //   setSuccessMessage('');

  //   try {
  //     const response = await fetch('http://localhost:3000/api/admin/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || 'Invalid email or password');
  //     }

  //     // extract name from gmail.
  //     const extractedName = email.split('@')[0]
  //     .replace(/[^a-zA-Z ]/g, ' ') // Remove special characters
  //     .replace(/\b\w/g, char => char.toUpperCase()); 

  //     // Store token in localStorage
  //     localStorage.setItem('adminToken', data.token);
  //     localStorage.setItem('adminName', extractedName);
  //     // localStorage.setItem('adminid', data.id);

  //     setSuccessMessage(`Welcome, ${extractedName}! Redirecting...`);
  //     setSuccessMessage('Login successful! Redirecting...');
  //     setShowModal(false);
  //   } catch (error) {
  //     setErrorMessage(error.message);
  //   }
  // };


  // new login

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    // Define static email and password
    const STATIC_EMAIL = "admin@example.com"; // Change to your static email
    const STATIC_PASSWORD = "admin123"; // Change to your static password
  
    // If user enters the static credentials, redirect immediately
    if (email === STATIC_EMAIL && password === STATIC_PASSWORD) {
      localStorage.setItem('adminToken', 'static-token'); // Set a fake token
      localStorage.setItem('adminName', 'Admin');
      setSuccessMessage(`Welcome, Admin! Redirecting...`);
      
      setTimeout(() => {
        navigate("/viewbookings");
        setShowModal(false);
         // Redirect to ViewBookings
      }, 1000);
      return;
    }
  
    // Otherwise, proceed with API authentication
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
  
      // Extract name from email
      const extractedName = email
        .split('@')[0]
        .replace(/[^a-zA-Z ]/g, ' ') // Remove special characters
        .replace(/\b\w/g, char => char.toUpperCase());
  
      // Store token
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminName', extractedName);


      toast.success("🎉 Login Successful!", {
        position: "top-center",
        autoClose: 1500, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });

  
      // setSuccessMessage(`Welcome, ${extractedName}! Redirecting...`);
      
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
      
    } catch (error) {
      setErrorMessage(error.message);
      toast.error("❌ Login Failed! Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });
    }
  };
  
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//         // Simulating an API call
//         const response = await axios.post("http://localhost:3000/api/admin/login", {
//             email,
//             password,
//         });

//         if (response.data.token) {
//             localStorage.setItem("adminToken", response.data.token);
//             localStorage.setItem("adminName", response.data.adminName);
            
//             toast.success("🎉 Login Successful! Welcome back!", {
//                 position: "top-right",
//                 autoClose: 3000, // 3 seconds
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 theme: "colored",
//             });

//             setTimeout(() => {
//                 window.location.reload(); // Refresh or navigate
//             }, 3000);
//         }
//     } catch (error) {
//         toast.error("❌ Login Failed! Please check your credentials.", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "colored",
//         });
//     }
// };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">📊 Admin Turfs</div>
        <nav>
          <ul>

            <li ><Link to="/dash">🏠 Dashboard</Link></li>
            <li><Link to="/analytics">📊 Analytics</Link></li>
            

            {/* Turf Management Dropdown */}
            <li onClick={() => setTurfDropdown(!turfDropdown)} style={{ cursor: "pointer",padding:"20px" }}>
              Turf Management {turfDropdown ? "🔼" : "🔽"}
            </li>
            {turfDropdown && (
              <ul className="dropdown">
                <li><Link to="/addturf">➕ Add Turf</Link></li>
                <li><Link to="/manageturf">🛠️ Manage Turf</Link></li>
              </ul>
            )}

            {/* Bookings Dropdown */}
            <li onClick={() => setBookingDropdown(!bookingDropdown)} style={{ cursor: "pointer",padding:"20px" }}>
               Bookings {bookingDropdown ? "🔼" : "🔽"}
            </li>
            {bookingDropdown && (
              <ul className="dropdown">
                <li><Link to="/manageBookings">📝 Manage Bookings</Link></li>
                
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
                <button onClick={handleLogout} style={{backgroundColor:"red" ,color:"white", borderColor:"ActiveBorder"}}>Logout</button>
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
