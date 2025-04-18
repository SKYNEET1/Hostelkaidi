// model/LocationSchema.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    uniqid: { type: String, required: true },
    location: { type: String, required: true },
    reason: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const LocationLog = mongoose.model('LocationLog', locationSchema);
module.exports = LocationLog;
