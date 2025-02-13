import React, { useState } from "react";

function ManageBookings() {
  const [bookings, setBookings] = useState([
    { id: "1", user_id: "U101", tuf_id: "T001", date: "2025-02-01", time_slot: "10:00 AM - 11:00 AM", confirmed: false },
    { id: "2", user_id: "U102", tuf_id: "T002", date: "2025-02-02", time_slot: "11:00 AM - 12:00 PM", confirmed: false },
  ]);

  // Confirm Booking
  const confirmBooking = (id) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, confirmed: true } : booking
      )
    );
  };

  // Delete Booking
  const deleteBooking = (id) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="manage-bookings">
      <h2>Manage Bookings</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Turf ID</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Status</th>
            <th>Actions</th>
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
              <td>{booking.confirmed ? "✅ Confirmed" : "⏳ Pending"}</td>
              <td>
                {!booking.confirmed && (
                  <button className="confirm-btn" onClick={() => confirmBooking(booking.id)}>✅ Confirm</button>
                )}
                <button className="delete-btn" onClick={() => deleteBooking(booking.id)}>❌ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBookings;
