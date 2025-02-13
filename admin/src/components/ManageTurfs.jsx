import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ManageTurfs() {
  const [turfs, setTurfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const turfsPerPage = 5; // Display 5 turfs per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/my-turfs", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        
      });
      setTurfs(response.data.turfs);
      
    } catch (error) {
      console.error("Error fetching turfs:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this turf?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/admin/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
        });

        if (response.status === 200) {
          // setMessage("Turf deleted successfully!");
             toast.success("Turf deleted successfully!", {
                        position: "top-center",
                        autoClose: 1500, // 3 seconds
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                    });
          fetchTurfs();
          setTimeout(() => setMessage(""), 3000);
        } else {
          setMessage("Failed to delete turf.");
        }
      } catch (error) {
        console.error("Error deleting turf:", error.response?.data?.message || error.message);
        setMessage(error.response?.data?.message || "Error deleting turf.");
      }
    }
  };

  // const handleSearch = async (query) => {
  //   setSearchQuery(query);
  //   setCurrentPage(1); // Reset pagination on new search

  //   if (!query) {
  //     setSearchResults([]);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/admin/searchTurfs?query=${query}`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
  //     });

  //     setSearchResults(response.data.turfs);
  //   } catch (error) {
  //     console.error("Error searching turfs:", error);
  //   }
  // };
  // Filter turfs based on search query
  const turfsToDisplay = turfs.filter((turf) =>
    turf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleUpdate = (turf) => {
    navigate("/update-turf", { state: { turf } });
  };

  // const turfsToDisplay = searchResults.length > 0 ? searchResults : turfs;
  const totalPages = Math.ceil(turfsToDisplay.length / turfsPerPage);

  const indexOfLastTurf = currentPage * turfsPerPage;
  const indexOfFirstTurf = indexOfLastTurf - turfsPerPage;
  const currentTurfs = turfsToDisplay.slice(indexOfFirstTurf, indexOfLastTurf);


  return (
    <div className="manage-turfs">
      <h2>Manage Turfs</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search turfs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {message && <div className="message">{message}</div>}

      <table className="turf-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Location</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTurfs.length > 0 ? (
            currentTurfs.map((turf) => (
              <tr key={turf._id}>
                <td>{turf.name}</td>
                <td>{turf.time}</td>
                <td>{turf.location}</td>
                <td>{turf.price}</td>
                <td>
                  <img
                    src={`http://localhost:3000/${turf.image}`}
                    alt={turf.name}
                    style={{ width: "100px", height: "60px" }}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/100x60")}
                  />
                </td>
                <td>
                  <button className="update-btn" onClick={() => handleUpdate(turf)}>✏️ Update</button>
                  <button className="delete-btn" onClick={() => handleDelete(turf._id)}>❌ Delete</button>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅️ Prev
          </button>

          <span> Page {currentPage} of {totalPages} </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next ➡️
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageTurfs;
