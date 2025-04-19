const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../model/Schema');
const router = express.Router();

const generateUniqueID = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit random number
};

// ✅ SIGNUP ROUTE
router.post('/signup', async (req, res) => {
    try {
        const {
            name, regno, department,
            parentName, parentPhoneNo,
            studentPhoneNo, hostelName, roomNo, password, Usertype
        } = req.body;

        // ✅ Correct usertype validation: Only "student" or "security" allowed
        if (!["student", "security"].includes(Usertype)) {
            return res.status(400).json({
                status: false,
                message: "Usertype must be either 'student' or 'security'"
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const uniqid = generateUniqueID();

        const newStudent = new Student({
            name,
            regno,
            department,
            parentName,
            parentPhoneNo,
            studentPhoneNo,
            hostelName,
            roomNo,
            uniqid,
            Usertype,
            password: hash
        });

        await newStudent.save();

        res.json({
            status: true,
            message: "Signup successful",
            uniqid: uniqid
        });
    } catch (err) {
        res.status(400).json({ status: false, message: "Signup error: " + err.message });
    }
});

// ✅ LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { Usertype, uniqid, password } = req.body;

        const student = await Student.findOne({ uniqid });
        if (!student) throw new Error("Invalid uniqid");

        const isMatch = await student.comparePassword(password);
        if (!isMatch) throw new Error("Incorrect password");

        // ✅ Match Usertype
        if (student.Usertype !== Usertype) {
            throw new Error("Usertype mismatch");
        }

        const token = await student.generateToken();

        res.json({
            status: true,
            message: "Login successful",
            token: token,
            data: {
                name: student.name,
                Usertype: student.Usertype,
                regno: student.regno,
                department: student.department,
                hostelName: student.hostelName,
                roomNo: student.roomNo,
                uniqid: student.uniqid,
                studentPhoneNo: student.studentPhoneNo,
                parentName: student.parentName,
                parentPhoneNo: student.parentPhoneNo,
            }
        });
    } catch (err) {
        res.status(400).json({ status: false, message: "Login error: " + err.message });
    }
});

module.exports = router;
