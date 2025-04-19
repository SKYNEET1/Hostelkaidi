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

// ✅ PATCH ROUTE — Set isReturned to true
// ✅ PUT ROUTE — Update isReturned to true and return full student data
// ✅ PUT ROUTE — Update return status using uniqid from URL
router.put('/:uniqid/update-return', async (req, res) => {
    try {
        const { uniqid } = req.params;
        const { isReturned, returnTime, isLate } = req.body;

        if (!uniqid) {
            return res.status(400).json({ status: false, message: "uniqid is required in URL" });
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { uniqid },
            {
                isReturned,
                returnTime,
                isLate
            },
            { new: true } // returns the updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ status: false, message: "Student not found" });
        }

        res.json({
            status: true,
            message: "Return status updated successfully",
            data: updatedStudent
        });

    } catch (err) {
        res.status(500).json({ status: false, message: "Update error: " + err.message });
    }
});

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

// ✅ UPDATE RETURN STATUS ROUTE
router.put('/:uniqid/update-return', async (req, res) => {
    try {
        const { uniqid } = req.params;
        const { isReturned, returnTime, isLate } = req.body;

        if (!uniqid) {
            return res.status(400).json({ status: false, message: "uniqid is required in URL" });
        }

        const updatedStudent = await Student.findOneAndUpdate(
            { uniqid },
            { isReturned, returnTime, isLate },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ status: false, message: "Student not found" });
        }

        res.json({
            status: true,
            message: "Return status updated successfully",
            data: updatedStudent
        });

    } catch (err) {
        res.status(500).json({ status: false, message: "Update error: " + err.message });
    }
});

// ✅ GET STUDENT RETURN STATUS ROUTE (for QR polling)
router.get('/:uniqid/status', async (req, res) => {
    const { uniqid } = req.params;

    try {
        const student = await Student.findOne({ uniqid }).lean();

        if (!student) {
            return res.status(404).json({ status: false, message: 'Student not found' });
        }

        res.json({
            status: true,
            isReturned: student.isReturned,
            returnTime: student.returnTime,
            isLate: student.isLate,
            name: student.name,
            regno: student.regno,
            hostelName: student.hostelName,
            roomNo: student.roomNo
        });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error fetching student status', error: error.message });
    }
});

module.exports = router;


module.exports = router;
