const validateStudentSignup = (req) => {
    const { name, regNo, department, parentName, parentPhone, studentPhone, hostelName, roomNo, password } = req.body;

    if (!name || !regNo || !department || !parentName || !parentPhone || !studentPhone || !hostelName || !roomNo || !password) {
        throw new Error("All fields are required");
    }
    if (password.length < 5) {
        throw new Error("Password should be at least 5 characters");
    }
}

module.exports = { validateStudentSignup };