// reserve a folder only from which client can acces the files 
app.use(express.static("Frontend_folder")); // jis bhi folder ka naam yha given hoga uski saari files browser me accessible hogi

// __dirname = jis file me hum kaam kr rhe hai wha tak ka path laake deta hai

const path = require("path"); // this module provides utilities for working with file and directory paths

path.join("./Frontend_Folder", "404.html") // method joins all given path. this will return ./Frontend_Folder/404.html

// 404 response 
app.use(function(req, res) {
    let restPath = path.join("./Frontend_Folder", "404.html");  // restPath = "./Frontend_Folder/404.html"
    res.status(404).sendFile(path.join(__dirname, restPath));   // __dirname will give the path upto to working directory means jaha pe app1.js hai au uske aage humne 404 tk pahunchne ka path de diya
})

function loginUser(req, res) {
    let { email, password } = req.body; // humne email aur password nikal liye req ki body me se
    let obj = content.find((obj) => {  // [#1]
        return obj.email == email
    })
    if (!obj) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    if (obj.password == password) {
        
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

/*
#1. find()
humne content arr par find hof lga diya 
jisme ek fxn passed hai jisme ek ek krke content ke obj pass honge
aur jis obj ki email key ki value req ki body me se niakli gyi email se match ho jaayegi
find fxn us obj ko return kr dega
*/


// ============================================================ //

const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// reserve a folder only from which client can acces the files 
app.use(express.static("Frontend_folder"));
app.use(express.json());

app.listen(8081, function() {
    console.log("server started");
})

let content = JSON.parse(fs.readFileSync("./data.json"));

// const userRouter = express.Router();
// app.use('/user', userRouter);
const authRouter = express.Router();
app.use('/auth', authRouter);

userRouter.route('/').get(protectRoute, getUsers);

authRouter.route("/signup").post(bodyChecker, signupUser);
authRouter.route("/login").post(bodyChecker, loginUser);

function getUsers(req, res) {
    res.status(200).json({
        "message": content
    })
}

function protectRoute(req, res, next) {
    console.log("reached body checker");
    // jwt 
    // -> verify everytime that if 
    // you are bringing the token to get your response
    let isallowed = false;
    if (isallowed) {
        next();
    } else {
        res.send("kindly login to access this resource ");
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

function signupUser(req, res) {
    let {name,email,password,confirmPassword} = req.body;
    console.log("req.body", req.body)
    if (password == confirmPassword) {
        let newUser = { name, email, password }
            // entry put 
        content.push(newUser);
        // save in the datastorage
        fs.writeFileSync("data.json",
            JSON.stringify(content));
        res.status(201).json({
            createdUser: newUser
        })
    } else {
        res.status(422).json({
            message: "password and confirm password do not match"
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

// 404 response
app.use(function(req, res) {
    let restPath = path.join("./Frontend_Folder", "404.html");
    res.status(404).sendFile(path.join(__dirname, restPath));
})



