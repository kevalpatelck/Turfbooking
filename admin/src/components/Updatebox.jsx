// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// function UpdateBox() {
//   const location = useLocation();
//   const [turf, setTurf] = useState({
//     _id: "",
//     name: "",
//     location: "",
//     price: "",
//     time: "",
//     image: null,
//   });

//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (location.state?.turf) {
//       setTurf(location.state.turf);
//     }
//   }, [location.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setTurf((prevTurf) => ({
//       ...prevTurf,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setTurf((prevTurf) => ({
//         ...prevTurf,
//         image: e.target.files[0],
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     const adminToken = localStorage.getItem("adminToken");
//     if (!adminToken) {
//       setMessage("Admin token is missing. Please log in again.");
//       return;
//     }

//     if (!turf._id) {
//       setMessage("Turf ID is missing. Cannot update turf.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", turf.name);
//     formData.append("location", turf.location);
//     formData.append("price", turf.price);
//     formData.append("time", turf.time);

//     if (turf.image instanceof File) {
//       formData.append("image", turf.image);
//     }

//     try {
//       const response = await axios.patch(
//         `http://localhost:3000/api/admin/${turf._id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setMessage("Turf updated successfully!");
//       } else {
//         throw new Error("Failed to update turf");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Error updating turf.");
//     }
//   };

//   return (
//     <div className="turf-form" style={styles.formContainer}>
//       <form onSubmit={handleSubmit}>
//         <h2 style={styles.heading}>Update Turf</h2>

//         {message && <p style={{ textAlign: "center", color: message.includes("success") ? "green" : "red" }}>{message}</p>}

//         <label>Name:</label>
//         <input type="text" name="name" value={turf.name} onChange={handleChange} required />

//         <label>Location:</label>
//         <input type="text" name="location" value={turf.location} onChange={handleChange} required />

//         <label>Price:</label>
//         <input type="text" name="price" value={turf.price} onChange={handleChange} required />

//         <label>Time:</label>
//         <input type="text" name="time" value={turf.time} onChange={handleChange} required />

//         <label>Image:</label>
//         <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
        

//         <button type="submit" style={styles.button}>Update Turf</button>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   formContainer: {
//     maxWidth: "400px",
//     margin: "auto",
//     padding: "25px",
//     border: "5px solid #ddd",
//     borderRadius: "10px",
//     backgroundColor: "#f9f9f9",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     marginTop: "10px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default UpdateBox;




import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateBox() {
  const location = useLocation();
  const navigate = useNavigate();
  const { turf } = location.state || {};

  const [formData, setFormData] = useState({
    name: turf?.name || "",
    location: turf?.location || "",
    price: turf?.price || "",
    time: turf?.time || "",
    image: null,
    imagePreview: turf ? `http://localhost:3000/${turf.image}` : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting updated data:", formData);

    try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("time", formData.time);

        if (formData.image instanceof File) {
            console.log("Appending image to FormData");
            formDataToSend.append("image", formData.image);
        }

        console.log("FormData entries:", Array.from(formDataToSend.entries()));

        await axios.put(`http://localhost:3000/api/admin/update-turf/${turf._id}`, formDataToSend, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                "Content-Type": "multipart/form-data",
            },
        });

        // alert("Turf updated successfully!");
           toast.success("Turf updated successfully!", {
                                position: "top-center",
                                autoClose: 1500, // 3 seconds
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: "colored",
                            });
        navigate("/manageturf");
    } catch (error) {
        console.error("Error updating turf:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Failed to update turf");
    }
};



  return (
    <div className="turf-form" style={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Update Turf</h2>

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Price:</label>
        <input type="text" name="price" value={formData.price} onChange={handleChange} required />

        <label>Time:</label>
        <input type="text" name="time" value={formData.time} onChange={handleChange} required />

        <label>Image:</label>
        <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
        {formData.imagePreview && <img src={formData.imagePreview} alt="Preview" style={{ width: "100px", height: "60px", marginTop: "10px" }} />}

        <button type="submit" style={styles.button}>Update Turf</button>
      </form>
    </div>
  );
}

const styles = {
  formContainer: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UpdateBox;
