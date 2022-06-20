// focus on loginUser() fxn

const express = require("express");
const userRouter = express.Router();
const userModel = require("../models/userModel");
const authRouter = express.Router();
const jwt=require('jsonwebtoken');  // jwt package require kr liya
const {JWT_KEY}=require('../secrets');  // secrets me se jwt key nikal li
//----------routes-----------
authRouter.route("/signup").post(setCreatedAt, signupUser);

authRouter
  .route("/forgetPassword")
  .get(getForgetPassword)
  .post(postForgetPassword, validateEmail);

authRouter.route("/login").post(loginUser);

//---------functions----------------

function setCreatedAt(req, res, next) {
  let obj = req.body;
  //keys ka arr -> uska length
  let length = Object.keys(obj).length;
  if (length == 0) {
    return res
      .status(400)
      .json({ message: "cannot create user if req.body is empty" });
  }
  req.body.createdAt = new Date().toISOString();
  next();
}

async function signupUser(req, res) {
  // let userDetails=req.body;
  // let name=userDetails.name;
  // let email=userDetails.email;
  // let password=userDetails.password;
  try {
    let userObj = req.body;
    // user.push({email,name,password});
    //put all data in mongo db
    sendEmail(userObj);
    // create document in userModel
    let user = await userModel.create(userObj);
    console.log("user", user);
    res.json({
      message: "user signedUp",
      user: userObj,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: err.message });
  }
}

function getForgetPassword(req, res) {
  res.sendFile("./public/forgetPassword.html", { root: __dirname });
}

function postForgetPassword(req, res, next) {
  let data = req.body;
  console.log("data", data);
  //check if email id is correct- validate
  next();
  //check if user exists in db
  // res.json({
  //     message:"data received",
  //     data:data.email
  // })
}

function validateEmail(req, res) {
  console.log("in validateEmail function");
  console.log(req.body);
  //hw to check if email is correct or not -> @ , .
  //indexOf
  res.json({
    message: "data received",
    data: req.body,
  });
}

// yha pe humne simple cookies wala system hta ke jwt use kr liya for getting more security
// iska matlab login ke time pe token create hoga 
//aur agr hume kisi fxn ko protect krna hoga 
// to wha pe iss token ke liye verfication lga denge usse pahle wale fxn me
// jaise getUsers fxn ke liye protectRoute fxn me kr rkha hai 
async function loginUser(req, res) {
  try {
    //email password
    if (req.body.email) {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        if (req.body.password == user.password) {
          // res.cookie('login','1234',{httpOnly:true});
          let payload=user['_id'];  // jb mongodb kisi user ka document create krta hai to udhar ek id bhi bnata hai, to kyunki user mongodb se hi mangwaya h to uspe id hogi, to us id ko nikal liya
          let token=jwt.sign({id:payload},JWT_KEY);  // .sign jwt ka hi fxn h, isme payload,secret key aur algo bhejna hota hai (algo nhi bhejeng to default algo use ho jaayega) aur isse hume ek token milta hai
          console.log('token',token);  // token ko console krke check kr liya ki kya token bna hai
          res.cookie("login", token, { httpOnly: true });  // hum cookie ki form me token as a res bhejte hai. pahle jaha hum 1234 bhej rhe the ab wha humne pura token bhej diya hai, which is more secure
          return res.json({
            message: "user loged in",
          });
        } else {
          return res.json({
            message: "email or password is wrong",
          });
        }
      } else {
        return res.json({
          message: "email or password is wrong",
        });
      }
    } else {
      return res.json({
        message: "user is not present",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

module.exports = authRouter;
