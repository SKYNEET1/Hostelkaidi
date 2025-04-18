const express = require('express');
const router = express.Router();
const LocationLog = require('../model/location'); // adjust path if needed
const Student = require('../model/Schema'); // adjust path if needed

// POST /location-log
router.post('/qr-display', async (req, res) => {
  try {
    const { uniqid, qrCodeId, place, purpose, exitTime, entryTime, exitDate,studentId } = req.body;

    // Find student by uniqid
    const student = await Student.findOne({ uniqid });
    

    if (!student) {
      return res.status(404).json({ status: false, message: 'Student not found' });
    }

    // Create location log with extra student details
    const log = await LocationLog.create({
      studentId: student._id,
      name: student.name,
      department: student.department,
      hostelName: student.hostelName,
      roomNo: student.roomNo,
      qrCodeId,
      place,
      purpose,
      exitTime,
      entryTime,
      exitDate,
    });

    res.status(201).json({ status: true, message: 'Log created successfully', data: log });
  } catch (err) {
    console.error('Location log error:', err);
    res.status(500).json({ status: false, message: 'Server error' });
  }
});

module.exports = router;
