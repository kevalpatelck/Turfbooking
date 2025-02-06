import React from 'react'
import { useState } from "react";


function ViewBookings() {
    const [bookings] = useState([
        { id: "1", user_id: "U101", tuf_id: "T001", date: "2025-02-01", time_slot: "10:00 AM - 11:00 AM" },
        { id: "2", user_id: "U102", tuf_id: "T002", date: "2025-02-02", time_slot: "11:00 AM - 12:00 PM" },
      ]);
  return (
    <div>
       <div className="manage-bookings">
      <h2>View Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Turf ID</th>
            <th>Date</th>
            <th>Time Slot</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.user_id}</td>
              <td>{booking.tuf_id}</td>
              <td>{booking.date}</td>
              <td>{booking.time_slot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ViewBookings
