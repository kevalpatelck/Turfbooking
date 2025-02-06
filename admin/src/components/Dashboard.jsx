import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-blocks">
        <div className="block">Users: 1200</div>
        <div className="block">Revenue: $50K</div>
        <div className="block">Orders: 300</div>
        <div className="block">Growth: 12%</div>
      </div>
      <h1>Dashboard</h1>
      <p>View all essential data here.</p>
    </div>
  );
}

export default Dashboard;
