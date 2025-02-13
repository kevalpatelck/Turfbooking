import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function Single() {
  return (
    <>
      <div className="single-property section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="main-image">
                <img src="assets/images/single-property.jpg" alt="" />
              </div>
              <div className="main-content">
                <span className="category">Apartment</span>
                <h4>24 New Street Miami, OR 24560</h4>
                <p>
                  Get <strong>the best villa agency</strong> HTML CSS Bootstrap Template for your
                  company website. TemplateMo provides you the best free CSS templates in the world.
                  Please tell your friends about it. Thank you.
                </p>
              </div>
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Best useful links ?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed doesn't eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Booking Form */}
            <div className="col-lg-4">
              <div className="booking-form p-4 bg-light rounded shadow-sm">
                <h4 className="mb-3 text-center">Book Your Slot</h4>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="tel" className="form-control" placeholder="Enter your phone number" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Select Date</label>
                    <input type="date" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Enter Time</label>
                    <input type="time" className="form-control" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Book Now</button>
                </form>
              </div>
            </div>
            {/* End of Booking Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Single;
