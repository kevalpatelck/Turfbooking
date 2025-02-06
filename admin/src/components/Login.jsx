import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... your login logic
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.message || "Invalid email or password");
    }
  
    // Store token and admin name in localStorage
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminName", data.name); // data.name must be defined
    // Optionally store admin id as well if needed
    localStorage.setItem("adminId", data.adminId); // if returned
  
    // redirect or set success message...
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
          <div className="card mb-3">
            <div className="card-body">
              <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                <p className="text-center small">Enter your email & password to login</p>
              </div>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <form className="row g-3" onSubmit={handleLogin}>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-12">
                  <button className="btn btn-primary w-100" type="submit">Login</button>
                </div>
                <div className="col-12">
                  <p className="small mb-0">
                    Don't have an account? <Link to="/register">Create an account</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
