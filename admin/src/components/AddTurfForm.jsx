import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddTurfForm() {
  const [turf, setTurf] = useState({
    name: "",
    location: "",
    price: "",
    time: "",
    image: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurf((prevTurf) => ({
      ...prevTurf,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setTurf((prevTurf) => ({
      ...prevTurf,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      setErrorMessage("Admin token is missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", turf.name);
    formData.append("location", turf.location);
    formData.append("price", turf.price);
    formData.append("time", turf.time);
    formData.append("image", turf.image);

    try {
      const response = await fetch("http://localhost:3000/api/admin/add-turf", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add turf");
      }

      // setSuccessMessage("Turf added successfully!");

      
            toast.success("🎉Turf added successfully!", {
              position: "top-center",
              autoClose: 1500, // 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
          });
      setTurf({ name: "", location: "", price: "", time: "", image: null });
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

  return (
    <div className="turf-form" style={{ maxWidth: "400px", margin: "auto", padding: "25px", border: "5px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Turf</h2>
        {errorMessage && <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>}

        <label>Name:</label>
        <input type="text" name="name" value={turf.name} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={turf.location} onChange={handleChange} required />

        <label>Price:</label>
        <input type="text" name="price" value={turf.price} onChange={handleChange} required />

        <label>Time:</label>
        <input type="text" name="time" value={turf.time} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" name="image" onChange={handleFileChange} accept="image/*" required />

        <button type="submit" style={{ width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add Turf</button>
      </form>
    </div>
  );
}

export default AddTurfForm;
