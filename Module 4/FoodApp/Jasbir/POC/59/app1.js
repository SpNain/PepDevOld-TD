// jaise express.json() req ke andar data daalta hai waise hi cookieParser() req ke andar cookie daalta hai
app.use(cookieParser());

// For analogy
// collection in mongodb: array in data structure
// document in mongodb: element of the array

// acc to rest api rule we should use api before the routes
app.use('/api/user', userRouter);


// ======================================================================== //

const express = require("express");
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("./secrets");
const cookieParser = require('cookie-parser');
let userModel = require("./model/userModel");

const app = express();

app.listen(8081, function () {
    console.log("server started");
})

app.use(express.json());
app.use(cookieParser());

let content = JSON.parse(fs.readFileSync("./data.json"));
const userRouter = express.Router();
const authRouter = express.Router();

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

userRouter.route('/').get(protectRoute, getUsers)

authRouter.route("/signup").post(bodyChecker, signupUser);
authRouter.route("/login").post(bodyChecker, loginUser);

function getUsers(req, res) {
    res.status(200).json({
        "message": content
    })
}

function protectRoute(req, res, next) {
    try {
        console.log("reached body checker");
        // cookie-parser
        console.log("61", req.cookies)
        // jwt 
        // -> verify everytime that if 
        // you are bringing the token to get your response
 let decryptedToken = jwt.verify(req.cookies.JWT, JWT_SECRET);
        // console.log("66", decryptedToken)
        console.log("68", decryptedToken)
        if (decryptedToken) {
            next();
        } else {
            res.send("kindly login to access this resource ");
        }
    } catch (err) {

        res.status(200).json({
            message: err.message
        })
    }

}

function bodyChecker(req, res, next) {
    console.log("reached body checker");
    let isPresent = Object.keys(req.body).length;
    console.log("ispresent", isPresent)
    if (isPresent) {
        next();
    } else {
        res.send("kind send details in body ");
    }
}

async function signupUser(req, res) {
    try {
        let newUser = await userModel.create(req.body);
        res.status(200).json({
            "message": "user created successfully",
            user: newUser
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        })
    }
}

function loginUser(req, res) {
    let { email, password } = req.body;
    let obj = content.find((obj) => {
        return obj.email == email
    })
    if (!obj) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    if (obj.password == password) {
        var token = jwt.sign({ email: obj.email },
            JWT_SECRET);
        // header
        console.log(token);
        res.cookie("JWT", token);
        // sign with RSA SHA256
        // res body 
        res.status(200).json({
            message: "user logged In",
            user: obj
        })
    } else {
        res.status(422).json({
            message: "password doesn't match"
        })
    }
}

