const mongoose = require('mongoose');

const turfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: true
    },
    time: {
        type:[ String],
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    image: {
        type: String, 
        required: true
      },
}, {
    timestamps: true
});

const Turf = mongoose.model('Turf', turfSchema);
module.exports = Turf;
