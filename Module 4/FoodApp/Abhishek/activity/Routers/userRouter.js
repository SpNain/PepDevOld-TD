const express=require('express');  // hum yha se express le aaya / import kr liya
const userRouter=express.Router();  // see poc/2/2.1 for explaination
const userModel=require('../models/userModel');
const protectRoute=require('./authHelper');

// see poc/1/1.2 and poc/2/2.1 for requests and mounting explainations
//routes 

userRouter
.route('/')
.get(protectRoute,getUsers)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

//functions
// see poc/5/5.2/userRouter and poc/5/5.3/5.3.2/Routers/userRouter for explaination of this function
async function getUsers(req,res){
    try{
        console.log('getUser called');
        let users=await userModel.find();
        if(users){
            return res.json(users); 
        }
        else{
            return res.json({
                message:'users not found'
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message
        });
    }
     
}

//post request
function createUser(req,res){
    user=req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
}
//update
function updateUser (req,res){
    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
};
//delete 
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