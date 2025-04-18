const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const studentAuthRouter = require('../routes/studentAuth');
const dotenv = require('dotenv')
dotenv.config();


const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB Error:", err));

app.use('/', studentAuthRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});
