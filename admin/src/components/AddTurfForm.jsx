import React, { useState } from "react";

function AddTurfForm() {
  // Only include the necessary fields: name, location, price, and time.
  const [turf, setTurf] = useState({
    name: "",
    location: "",
    price: "",
    time: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurf((prevTurf) => ({
      ...prevTurf,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const adminToken = localStorage.getItem("adminToken");
    const adminName = localStorage.getItem("adminName"); // Get admin name from localStorage

    if (!adminToken || !adminName) {
        setErrorMessage("Admin details are missing. Please log in again.");
        return;
    }

    const payload = {
        name: turf.name,
        location: turf.location,
        price: turf.price,
        time: turf.time,
        adminName: adminName, // Ensure adminName is sent
    };

    try {
        const response = await fetch("http://localhost:3000/api/admin/add-turf", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to add turf");
        }

        setSuccessMessage("Turf added successfully!");
        setTurf({ name: "", location: "", price: "", time: "" });
    } catch (error) {
        setErrorMessage(error.message);
    }
};



  return (
    <div className="turf-form">
      <form onSubmit={handleSubmit}>
        <h2>Add New Turf</h2>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={turf.name}
          onChange={handleChange}
          required
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={turf.location}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={turf.price}
          onChange={handleChange}
          required
        />

        <label>Time:</label>
        <input
          type="text"
          name="time"
          value={turf.time}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Turf</button>
      </form>
    </div>
  );
}

export default AddTurfForm;
