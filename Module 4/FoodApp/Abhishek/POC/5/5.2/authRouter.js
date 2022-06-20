// here we only focus on loginUser() function
const express = require('express');
const userRouter=express.Router();
const userModel=require('../models/userModel');
const authRouter=express.Router();

//----------routes-----------
authRouter
.route('/signup')
.post(setCreatedAt,signupUser);

authRouter
.route('/forgetPassword')
.get(getForgetPassword)
.post(postForgetPassword,validateEmail);

authRouter
.route('/login')
.post(loginUser);

//---------functions----------------

function setCreatedAt(req,res,next){
    let obj=req.body;
    //keys ka arr -> uska length
    let length=Object.keys(obj).length;
    if(length==0){
        return res.status(400).json({message:"cannot create user if req.body is empty"})
    }
    req.body.createdAt=new Date().toISOString();
    next();
}

async function signupUser(req,res){
    // let userDetails=req.body;
    // let name=userDetails.name;
    // let email=userDetails.email;
    // let password=userDetails.password;
    try{
        let userObj=req.body;
        // user.push({email,name,password});
        //put all data in mongo db
        // create document in userModel
        let user=await userModel.create(userObj);
        console.log('user',user);
        res.json({
            message:'user signedUp',
            user:userObj
        });
    }
    catch(err){
        console.log(err);
        res.json({message: err.message})
    }
}

function getForgetPassword(req,res){
    res.sendFile('./public/forgetPassword.html',{root:__dirname});
}

function postForgetPassword(req,res,next){
    let data=req.body;
    console.log('data',data);
    //check if email id is correct- validate
    next();
    //check if user exists in db
    // res.json({
    //     message:"data received",
    //     data:data.email
    // })
};

function validateEmail(req,res){
    console.log('in validateEmail function');
    console.log(req.body);
    //hw to check if email is correct or not -> @ , .
    //indexOf
     res.json({
            message:"data received",
            data:req.body
        });
}

// jab bnda authRouter ke login wale route pe request maarega to loginUser() fxn chalega
// hum sbse pahle check krte hai ki req ki body me koi email present hai ki nhi agr email hui to kuch kaam hoga
// agr email nhi hui to simple response me `User is not present` bhej dete hai
// agr req ki body me email mil jaati hai to fir hum userModel pe findOne fxn call krte hai jise bolte hai ki 
// aisi key value pair wala user dund ke leke aao userModel me se jisme key `email` ho aur value req ki body me aai email ho
// agr usko aisi (key : value) mil jaati hai to wo us user ko ke document ko return kr deta hai
// agr user nhi aaya to simple response me `User is not present` bhej dete hai
//  agr user aaya to fir hum req ki body me aaye password ko aur user doc me saved password ko match krte hai jise
// agr password match ho jaata hai to simple response me `user loged in` bhej dete hai
// agr password match nhi hote to simple response me `email or password is wrong` bhej dete hai
// iss fxn ki testing postman se req maarke check kr skte hai
// waise to res se bhi process end ho jaati hai lekin for to be safe hume return use kiya hai kyunki ye async await wala fxn hai
async function loginUser(req,res){
    try{
    //email password
        if(req.body.email){
            let user = await userModel.findOne({email:req.body.email});
            if(user){
                if(req.body.password==user.password){
                    return res.json({
                        message:"user loged in"
                    });
                }
                else{
                    return res.json({
                        message:"email or password is wrong"
                    })
                }
            }
            else{
                return res.json({
                    message:"user is not present"
                })
            }
        }
        else{
            return res.json({
                message:"user is not present"
            })
        }
    }
    catch(err){  // agr kahi pe bhi fail hue to err msg send kr dete hai
        return res.status(500).json({
            message:err.message
        });
    }
}

module.exports=authRouter;
