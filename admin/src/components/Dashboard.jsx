// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Dashboard() {
//   const [totalTurfs, setTotalTurfs] = useState(0);
//   const [totalBookings, setTotalBookings] = useState(0);

//   useEffect(() => {
//     fetchTotalTurfs();
//     fetchTotalBookings();
//   }, []);

//   const fetchTotalTurfs = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/admin/totalBookings");
//       setTotalTurfs(response.data.totalTurfs);
//     } catch (error) {
//       console.error("Error fetching total turfs:", error);
//     }
//   };

//   const fetchTotalBookings = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/admin/totalTurfs");
//       setTotalBookings(response.data.totalBookings);
//     } catch (error) {
//       console.error("Error fetching total bookings:", error);
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-blocks">
   
//         <div className="block">Total Turfs: {totalTurfs}</div>
//         <div className="block">Total Bookings: {totalBookings}</div>
//       </div>
//       <h1>Dashboard</h1>
//       <p>View all essential data here.</p>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [totalTurfs, setTotalTurfs] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      setAdminToken(token);
      fetchTotalTurfs(token);
      fetchTotalBookings(token);
    } else {
      console.warn("Admin token not found. Please log in.");
    }
  }, []);

  const fetchTotalTurfs = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/totalTurfs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotalTurfs(response.data.totalTurfs); // ✅ Ensuring correct key usage
    } catch (error) {
      console.error("Error fetching total turfs:", error);
    }
  };
  
  const fetchTotalBookings = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/totalBookings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTotalBookings(response.data.totalBookings); // ✅ Ensuring correct key usage
    } catch (error) {
      console.error("Error fetching total bookings:", error);
    }
  };

  if (!adminToken) {
    return <p className="text-center text-red-500">Unauthorized: Please log in as an admin.</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-blocks">
    
        <div className="block">Total Turfs: {totalTurfs}</div> {/* ✅ Displays total turfs */}
        <div className="block">Total Bookings: {totalBookings}</div> {/* ✅ Displays total bookings */}
      </div>
      <h1>Dashboard</h1>
      <p>View all essential data here.</p>
    </div>
  );
}

export default Dashboard;
