const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    turfId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Turf",
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
