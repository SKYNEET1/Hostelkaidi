const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    hostelName: { type: String, required: true },
    roomNo: { type: String, required: true },
    qrCodeId: { type: String, required: true },
    place: { type: String, required: true },
    purpose: { type: String, required: true },
    exitTime: { type: String, required: true },
    entryTime: { type: String, required: true },
    exitDate: { type: String, required: true }
  },
  { timestamps: true }
);

const LocationLog = mongoose.model('LocationLog', locationSchema);
module.exports = LocationLog;
