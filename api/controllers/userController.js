const Turf = require("../models/turfModel");
const Booking = require("../models/bookingModel");

// Get turfs by location
const getTurfsByLocation = async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ message: "Location required" });
  }
  try {
    const turfs = await Turf.find({ location: { $regex: location, $options: 'i' } });

    if (turfs.length === 0) {
      return res.status(404).json({ message: "No turfs found in this location" });
    }

    res.status(200).json({ turfs });
  } catch (error) { 
    console.error("Error fetching turfs:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// get turfs by id
const getTurfById = async (req, res) => {
  try {
      const  turfId  = req.params.id; 
      const turf = await Turf.findById(turfId);
      if (!turf) {
          return res.status(404).json({ message: "Turf not found" });
      }
      res.status(200).json({ turf });
  } catch (error) {
      console.error("Error fetching turf:", error);
      res.status(500).json({ error: "Failed to fetch turf" });
  }
};

// Get all turfs for users
const getAllTurfs = async (req, res) => {
  try {
      const turfs = await Turf.find();
      if (!turfs || turfs.length === 0) {
          return res.status(404).json({ message: "No turfs found" });
      }
      res.status(200).json({ message: "Turfs fetched successfully", turfs });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch turfs" });
  }
};

// Booking
const createBooking = async (req, res) => {
  const { turfId, userPhone, userEmail, slot, date } = req.body;

  try {
    const turf = await Turf.findById(turfId);
    if (!turf) return res.status(404).json({ message: "Turf not found" });

    const existingUserBooking = await Booking.findOne({
      turfId,
      userPhone,
      userEmail,
      slot,
      date
    });

    if (!turf.time.includes(slot)) {
      return res.status(400).json({ message: "Selected slot is not available." });
    }

    const existingBooking = await Booking.findOne({ turfId, slot, date });
    if (existingBooking) {

      const bookedBookings = await Booking.find({ turfId, date });
      const bookedSlots = bookedBookings.map(booking => booking.slot);
      const availableSlots = turf.time.filter(slot => !bookedSlots.includes(slot));

      if (existingUserBooking) {
        return res.status(400).json({
          message: "You have already booked this turf for the selected date and time.",
          availableSlots
        });
      }
      if (availableSlots.length === 0) {
        return res.status(400).json({
          message: "No available turfs for this day.",
        });
      }

      return res.status(400).json({
        message: "Selected slot is already booked.",
        availableSlots,

      });
    }
    const allBookingsForDate = await Booking.find({ date });
    const allBookedSlots = allBookingsForDate.map(booking => booking.slot);

    const availableTurfSlots = turf.time.filter(slot => !allBookedSlots.includes(slot));

    if (availableTurfSlots.length === 0) {
      return res.status(400).json({
        message: "No available turfs for this day.",
      });
    }

    const newBooking = new Booking({
      turfId,
      userPhone,
      userEmail,
      slot,
      date
    });
    await newBooking.save();

    res.status(201).json({
      message: "Booking successful. We will contact you soon.",
      booking: newBooking
    });
  } catch (error) {
    // console.error("Error in booking:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//search

const searchTurfs = async (req, res) => {
  try {
    const { name, location } = req.query;

    const turfs = await Turf.find({
      $or: [
        { name: { $regex: name, $options: 'i' } },
        { location: { $regex: location, $options: 'i' } }
      ]
    });

    if (turfs.length === 0) {
      return res.status(404).json({ message: "No turfs found" });
    }

    res.status(200).json({ turfs });
  } catch (error) {
    console.error("Error fetching turfs:", error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { getTurfsByLocation, getAllTurfs,createBooking,getTurfById,searchTurfs};