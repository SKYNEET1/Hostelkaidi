const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regno: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    parentName: { type: String, required: true },
    parentPhone: { type: String, required: true },
    studentPhone: { type: String, required: true },
    hostelName: { type: String, required: true },
    roomNo: { type: String, required: true },
    uniqid: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

studentSchema.methods.getJWT = async function () {
    const student = this;
    return jwt.sign({ _id: student._id }, "SKYNEET@2002");
};

module.exports = mongoose.model("Student", studentSchema);
