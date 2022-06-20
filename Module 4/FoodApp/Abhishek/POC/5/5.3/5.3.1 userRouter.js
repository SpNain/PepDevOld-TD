// focus only on protectRoute function
const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/userModel');
//routes

userRouter
    .route('/')
    .get(protectRoute, getUsers)
    .post(createUser)
    .patch(updateUser)
    .delete(deleteUser);

userRouter
    .route('/:id')
    .get(getUserById);

//functions
async function getUsers(req, res) {
    try {
        console.log('getUser called');
        let users = await userModel.find();
        if (users) {
            return res.json(users);
        } else {
            return res.json({
                message: 'users not found'
            });
        }
    } catch (err) {
        return res.json({
            message: err.message
        });
    }

}

//post request
// client-> server 
//create
// app.post('/user',createUser);
function createUser(req, res) {
    user = req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
}
//update
// app.patch('/user',updateUser);
function updateUser(req, res) {
    let obj = req.body;
    for (let key in obj) {
        user[key] = obj[key];
    }
    res.json(user);
};
//delete 
// app.delete('/user',deleteUser);
function deleteUser(req, res) {
    user = {};
    res.json(user);
    // res.send('ussr has been deleted');
}

function getUserById(req, res) {
    console.log(req.params);
    res.json(req.params.id);
}

// dekho yaar ab hum nhi chahte ki koi bnda bina login kiye saare users ki info dekh ske
// hum chahte hai ki agr bnda looged in ho tbhi wo getUsers() ko call lga ske
// iske liye hum ek alag fxn bnate hai protectRoute() naam se
// jisme hum ek flag lete hai agr wo flag true hai that means ki user logged in hai 
// to hume if-else lga diya ki agr flag true hai to next() ko call krdo jisse getUsers() invoke ho jaayega
// nhi to `operation not allowed` ke res msg send krdo
// filhaal to flag ko hum manully true false set kr rhe hai lekin baad me ise hum tokens ke hisab se manage krenge 

let flag = false; // Userloggedin
function protectRoute(req, res, next) {
    
    if (flag) {
        next();
    } else {
        res.json({
            message: "operation not allowed"
        });
    }

}

module.exports = userRouter;