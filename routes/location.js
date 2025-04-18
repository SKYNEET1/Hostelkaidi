// routes/studentRoutes.js (or your existing file)
const express = require('express');
const Student = require('../model/Schema');
const LocationLog = require('../model/location');
const location = express.Router();

location.post('/login/location', async (req, res) => {
  try {
    const { uniqid, location, reason } = req.body;

    const student = await Student.findOne({ uniqid });
    if (!student) {
      return res.status(404).json({ status: false, message: "Student not found" });
    }

    const log = new LocationLog({
      studentId: student._id,
      uniqid: student.uniqid,
      location,
      reason
    });

    await log.save();

    res.status(200).json({
      status: true,
      message: "Location and reason logged successfully",
      data: log
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error", error: error.message });
  }
});

module.exports = location