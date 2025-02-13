import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Properties() {
  const [turfs, setTurfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const turfsPerPage = 6; // Show only 6 turfs per page

  useEffect(() => {
    fetchTurfs();
  }, []);

  const fetchTurfs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/getallturfs");
      console.log("API Full Response:", response);
      console.log("API Response Data:", response.data);

      if (Array.isArray(response.data)) {
        setTurfs(response.data);
      } else if (Array.isArray(response.data.turfs)) {
        setTurfs(response.data.turfs);
      } else {
        console.error("Unexpected API response format", response.data);
      }
    } catch (error) {
      console.error("Error fetching turfs:", error);
    }
  };

  // Filter turfs based on search query
  const filteredTurfs = turfs.filter((turf) =>
    turf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTurf = currentPage * turfsPerPage;
  const indexOfFirstTurf = indexOfLastTurf - turfsPerPage;
  const currentTurfs = filteredTurfs.slice(indexOfFirstTurf, indexOfLastTurf);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a turf..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button1}>Search</button>
      </div>

      <div className="row properties-box"style={{padding:"10px"}}>
        {currentTurfs.length > 0 ? (
          currentTurfs.map((turf) => (
            <div key={turf._id} className="col-lg-4 col-md-6 properties-item" style={{ padding: "20px" }}>
              <div className="item" style={styles.card}>
                <img
                  src={`http://localhost:3000/${turf.image}`}
                  alt={turf.name}
                  style={styles.image}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/200x120")}
                />
                <h4>{turf.name}</h4>
                <p>Location: {turf.location}</p>
                <p>Price: ${turf.price}</p>
                <p>Available Time: {turf.time}</p>

                <div className="main-button">
                  <button>
                    <Link to={`/property/${turf._id}`}>Book Now</Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No turfs found.</p>
        )}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        {Array.from({ length: Math.ceil(filteredTurfs.length / turfsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            style={currentPage === index + 1 ? styles.activePageButton : styles.pageButton}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

// Inline CSS Styles
const styles = {
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    width: "300px",
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    outline: "none",
  },
  button1: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 16px",
    fontSize: "16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
  },
  card: {
    textAlign: "center",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    maxWidth: "280px",
    margin: "auto",
  },
  image: {
    width: "250px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  pageButton: {
    backgroundColor: "#f1f1f1",
    border: "1px solid #ddd",
    padding: "8px 12px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  activePageButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "1px solid #007bff",
    padding: "8px 12px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  noResults: {
    textAlign: "center",
    color: "#888",
    fontSize: "18px",
    marginTop: "20px",
  },
};

export default Properties;
