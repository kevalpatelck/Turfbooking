import React, { useState, useEffect } from "react";

function ManageTurfs() {
  const [turfs, setTurfs] = useState([]); // Ensuring it's an array
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/turfs?page=1&limit=4");
        const data = await response.json();

        console.log("Received data from API:", data);
        if (data && Array.isArray(data.turfs)) {
            setTurfs(data.turfs);
        } else {
            setTurfs([]);
        }
        setLoading(false);
    } catch (error) {
        console.error("Error fetching turfs:", error);
        setTurfs([]);
        setLoading(false);
    }
};

  const searchTurfs = async () => {
    if (!searchQuery.trim()) {
      fetchTurfs(); // Reset to full list if search is empty
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/turfs/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setTurfs(data);
      } else {
        setTurfs([]); // Fallback to empty array
      }
    } catch (error) {
      console.error("Error searching turfs:", error);
      setTurfs([]); // Prevent crashes on error
    }
  };

  const deleteTurf = async (id) => {
    if (!window.confirm("Are you sure you want to delete this turf?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/turfs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete turf");
      }

      setTurfs((prevTurfs) => prevTurfs.filter((turf) => turf._id !== id));
      setMessage("Turf deleted successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting turf:", error);
      setMessage("Error deleting turf. Try again later.");
    }
  };

  return (
    <div className="manage-turfs">
      <h2>Manage Turfs</h2>

      {/* Search Input */}
      <input
    type="text"
    placeholder="Search by Name or Location"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="search-input"
/>
<button onClick={searchTurfs}>Search</button>


      {message && <div className="message">{message}</div>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="turf-table">
          <thead>
            <tr>
              <th>Image</th>
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
                <tr key={turf._id}>
                  <td>
                    <img
                      src={`http://localhost:5000/${turf.image}`}
                      alt={turf.name}
                      className="turf-image"
                      width="100"
                    />
                  </td>
                  <td>{turf.name}</td>
                  <td>{turf.location}</td>
                  <td>{turf.admin_id}</td>
                  <td>{turf.start_time}</td>
                  <td>{turf.end_time}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteTurf(turf._id)}>
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No turfs found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageTurfs;
