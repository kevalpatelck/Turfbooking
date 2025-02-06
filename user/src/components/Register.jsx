import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    terms: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted Data:", formData);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
        

          {/* Registration Card */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                <p className="text-center small">Enter your personal details to create account</p>
              </div>

              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-12">
                  <label htmlFor="yourName" className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="yourName"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="yourEmail" className="form-label">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="yourEmail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="yourUsername" className="form-label">Username</label>
                  <div className="input-group has-validation">
                    <span className="input-group-text">@</span>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      id="yourUsername"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="yourPassword" className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="yourPassword"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="terms"
                      type="checkbox"
                      id="acceptTerms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="acceptTerms">
                      I agree and accept the <Link to="#">terms and conditions</Link>
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <button className="btn btn-primary w-100" type="submit">
                    Create Account
                  </button>
                </div>

                <div className="col-12">
                  <p className="small mb-0">
                    Already have an account? <Link to="/login">Log in</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          {/* End Registration Card */}
        </div>
      </div>
    </div>
  );
}

export default Register;
