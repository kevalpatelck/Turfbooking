import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function SingleProperty() {
  const { id } = useParams(); // Get ID from URL
  const [turf, setTurf] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(""); // Store selected time slot
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    date: "",
  });

  useEffect(() => {
    fetchTurfDetails();
  }, []);

  const fetchTurfDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user/turfs/${id}`);
      setTurf(response.data.turf);
    } catch (error) {
      console.error("Error fetching turf details:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    try {
      const bookingData = {
        turfId: id,
        userPhone: formData.phone,
        userEmail: formData.email,
        slot: selectedSlot,  // Send selected slot
        date: formData.date,
      };

      console.log("Sending Booking Data:", bookingData);

      const response = await axios.post("http://localhost:3000/api/user/booking", bookingData);
      
      alert(response.data.message); // Success message from backend
    } catch (error) {
      console.error("Error booking turf:", error.response?.data || error.message);

      if (error.response?.data?.availableSlots) {
        alert(
          `Booking failed: ${error.response.data.message}\n\nAvailable slots: ${error.response.data.availableSlots.join(", ")}`
        );
      } else {
        alert(`Booking failed: ${error.response?.data?.message || "Please try again."}`);
      }
    }
  };

  if (!turf) {
    return <p>Loading...</p>;
  }

  return (
    <div className="single-property section">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h2 style={{textEmphasisColor:"AppWorkspace", textAlign:"center"}}>{turf.name}</h2>
            <br></br>
            <img src={`http://localhost:3000/${turf.image}`} alt={turf.name} style={{ width: "100%", height: "50%" }} />
            <p>Location: {turf.location}</p>
            <p>Price: ${turf.price}</p>
            <p>Available Slots: {turf.time?.join(", ")}</p>
          </div>
          <div className="col-lg-4">
            <div className="booking-form p-4 border rounded bg-light">
              <h4>Book This Turf</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Time Slot</label>
                  <select
                    className="form-control"
                    name="slot"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    required
                  >
                    <option value="">Select a slot</option>
                    {turf.time?.map((timeSlot, index) => (
                      <option key={index} value={timeSlot}>
                        {timeSlot}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Book Now</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProperty;
