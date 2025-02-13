import React, { useState } from "react";

function AddTurfForm() {
  const [turf, setTurf] = useState({
    name: "",
    location: "",
    admin_id: "",
    image: null,
    start_time: "",
    end_time: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurf((prevTurf) => ({
      ...prevTurf,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setTurf((prevTurf) => ({
      ...prevTurf,
      image: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", turf.name);
    formData.append("location", turf.location);
    formData.append("admin_id", turf.admin_id);
    formData.append("image", turf.image);
    formData.append("start_time", turf.start_time);
    formData.append("end_time", turf.end_time);

    try {
      const response = await fetch("http://localhost:5000/api/turfs/add", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add turf");
      }

      console.log("Turf added successfully:", result);
      setMessage({ text: "Turf added successfully!", type: "success" });

      // Reset form
      setTurf({ name: "", location: "", admin_id: "", image: null, start_time: "", end_time: "" });
    } catch (error) {
      console.error("Error adding turf:", error);
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <div className="turf-form">
      <form onSubmit={handleSubmit}>
        <h2>Add New Turf</h2>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <label>Name:</label>
        <input type="text" name="name" value={turf.name} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={turf.location} onChange={handleChange} required />

        <label>Admin ID:</label>
        <input type="text" name="admin_id" value={turf.admin_id} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />

        <label>Start Time:</label>
        <input
          type="time"
          name="start_time"
          value={turf.start_time}
          onChange={handleChange}
          required
        />

        <label>End Time:</label>
        <input
          type="time"
          name="end_time"
          value={turf.end_time}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Turf</button>
      </form>
    </div>
  );
}

export default AddTurfForm;
