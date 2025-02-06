import React, { useState } from "react";

function ManageTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this turf?")) {
      setTurfs((prevTurfs) => prevTurfs.filter((turf) => turf.id !== id));
      setMessage("Turf deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="manage-turfs">
      <h2>Manage Turfs</h2>
      <input
        type="text"
        placeholder="Search by Name or Location"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={handleSearch}>Search</button>

      {message && <div className="message">{message}</div>}

      <table className="turf-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Admin ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {turfs.length > 0 ? (
            turfs.map((turf) => (
              <tr key={turf.id}>
                <td>{turf.name}</td>
                <td>{turf.location}</td>
                <td>{turf.admin_id}</td>
                <td>{turf.start_time}</td>
                <td>{turf.end_time}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(turf.id)}>
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No turfs found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageTurfs;
