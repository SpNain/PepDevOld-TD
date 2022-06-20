// app1.js after refactoring

// npm init -y
// npm i express
const express = require("express");
const fs = require("fs");
const path = require("path");
const cookieParser = require('cookie-parser');
const userRouter = require('./Router/userRouter');
const authRouter = require('./Router/authRouter');
// server init
const app = express();

// always use me
// reserve a folder only from which client can acces the files 
app.use(express.static("Frontend_folder"));
//  express json -> req.body add
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.listen(8081, function () {
    console.log("server started");
})

// 404 page
app.use(function (req, res) {
    // console.log("fullPath", fullPath);
    res.status(404).sendFile
        (path.join(__dirname, "404.html"));
})

