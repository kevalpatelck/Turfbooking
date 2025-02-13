import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./AdminList.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewBookings() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
  // const navigate = useNavigate();


  useEffect(() => {
    fetchAdmins();
  }, []);

  // const fetchAdmins = async () => {

  //   try {
  //     const response = await axios.get("http://localhost:3000/api/superAdmin/getall-admin");
  //     setAdmins(response.data.admins);
  //   } catch (err) {
  //     setError("Failed to fetch admin data");
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/superAdmin/getall-admin");
      console.log("API Response:", response.data); 
      setAdmins(response.data.admins);
    } catch (err) {
      setError("Failed to fetch admin data");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/superAdmin/${adminId}`);
      setAdmins(admins.filter((admin) => admin._id !== adminId));
      // alert("Admin deleted successfully!");
      toast.success("Admin deleted successfully!", {
        position: "top-center",
        autoClose: 1500, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });
    } catch (error) {
      alert("Failed to delete admin.");
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/superAdmin/create-admin", newAdmin, {
        headers: { "Content-Type": "application/json" },
      });

      fetchAdmins();// setAdmins([...admins, response.data.admin]); // Update UI with new admin
      setShowModal(false);
      setNewAdmin({ name: "", email: "", password: "" });
      // navigate("/viewbookings");

      // alert("Admin added successfully!");
      
            toast.success("Admin added successfully!", {
              position: "top-center",
              autoClose: 1500, // 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
          });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add admin.");
    }
  };
  console.log(newAdmin.email);
  

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container">
      {/* Header with Add Admin Button */}
      <div className="header">
        <h1 className="title">Admin List</h1>
        <button className="add-admin-btn" onClick={() => setShowModal(true)}>
          ➕ Add Admin
        </button>
      </div>

      {/* Admin Table */}
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td>{admin._id}</td>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role || "Admin"}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(admin._id)}>
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Admin</h2>
            <form onSubmit={handleAddAdmin}>
              <label>Name:</label>
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Add Admin</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewBookings;
