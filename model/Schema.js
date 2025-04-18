const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    regno: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    parentName: { type: String, required: true },
    parentPhoneNo: { type: String, required: true },
    studentPhoneNo: { type: String, required: true, unique: true },
    hostelName: { type: String, required: true },
    roomNo: { type: String, required: true },
    uniqid: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

studentSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, "SECRET@KEY");
};

studentSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
