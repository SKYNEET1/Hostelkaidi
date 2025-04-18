const express = require('express');
const bcrypt = require('bcrypt');
const Student = require('../model/Schema');
const router = express.Router();

const generateUniqueID = () => {
    return Math.floor(10000 + Math.random() * 90000).toString(); // 5-digit random number
};

router.post('/signup', async (req, res) => {
    try {
        const {
            name, regno, department,
            parentName, parentPhoneNo,
            studentPhoneNo, hostelName, roomNo, password
        } = req.body;

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
            password: hash
        });

        await newStudent.save();
        res.json({
            status:true,
            message:"Signup successful",
            uniqid:uniqid
        });
    } catch (err) {
        res.status(400).send("Signup error: " + err.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { uniqid, password } = req.body;
        const student = await Student.findOne({ uniqid });
        if (!student) throw new Error("Invalid uniqid");

        const isMatch = await student.comparePassword(password);
        if (!isMatch) throw new Error("Incorrect password");

        const token = await student.generateToken();
        res.cookie('token', token, { httpOnly: true }).send("Login successful");
    } catch (err) {
        res.status(400).send("Login error: " + err.message);
    }
});

module.exports = router;
