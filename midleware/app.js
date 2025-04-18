const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const studentAuthRouter = require('../routes/studentAuth');

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB Error:", err));

app.use('/', studentAuthRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
