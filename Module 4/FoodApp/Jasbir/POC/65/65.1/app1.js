const express = require("express");
const fs = require("fs");
const path = require("path");
const cookieParser = require('cookie-parser');
const userRouter = require('./Router/userRouter');
const authRouter = require('./Router/authRouter');
const planRouter = require('./Router/planRouter');
const reviewRouter = require('./Router/reviewRouter');

const bookingRouter = require('./Router/bookingRouter'); // required bookingRouter.js

const app = express();
app.use(express.static("Frontend_folder"));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use("/api/plan", planRouter);
app.use('/api/auth', authRouter);
app.use('/api/review', reviewRouter);

app.use('/api/booking', bookingRouter); // bookingRouter route

app.listen(8081, function () {
    console.log("server started");
})