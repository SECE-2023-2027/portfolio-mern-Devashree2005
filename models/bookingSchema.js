const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  amountPaid: { type: Number, required: true },
  userDetails: {
    name: { type: String, required: true },
    phone: { 
      type: String, 
      required: true, 
      match: /^[0-9]{10}$/, // Validates phone number format (10 digits)
    },
    address: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validates email format
    },
  },
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;

