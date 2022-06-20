// here we only focus on getUsers() function
const express = require('express');
const userRouter=express.Router();
const userModel=require('../models/userModel');
//routes

userRouter
.route('/')
.get(getUsers)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

//functions
// jb bhi userRouter pe aake koi bnda get ki request maarega to ye fxn run hoga
// ye fxn overall saare users ki info laake deta hai
async function getUsers(req,res){
    try{
        console.log('getUser called');
        let users=await userModel.find();  // collection me se saare documents(users) laane ke liye bola
        if(users){
            return res.json(users); // agr mile to res me users send kr diye
        }
        else{
            return res.json({
                message:'users not found'   // agr nhi mile to ye res send kr diya
            });
        }
    }
    catch(err){   // agr kahi pe bhi fail hue to err msg send kr dete hai
        return res.json({
            message:err.message
        });
    }
     
}

//post request
// client-> server 
//create
// app.post('/user',createUser);
function createUser(req,res){
    user=req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
}
//update
// app.patch('/user',updateUser);
function updateUser (req,res){
    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
};
//delete 
// app.delete('/user',deleteUser);
function deleteUser(req,res){
    user={};
    res.json(user);
    // res.send('ussr has been deleted');
}

function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
}

module.exports=userRouter;