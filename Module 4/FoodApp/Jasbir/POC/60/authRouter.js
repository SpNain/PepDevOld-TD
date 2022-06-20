// created authRouter.js while refactoring the code
// here you should mainly focus on forgetPassword() and resetPassword() functions only.

// dependecies 
const express = require("express");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../secrets");
const userModel = require("../model/userModel")
const { bodyChecker } = require("./utilFns");
const emailSender = require("../helpers/emailSender");
// router
const authRouter = express.Router();

// routes 
authRouter.use(bodyChecker)  // isse auth router ke saare fxn chalne se pahle bodyChecker chalega
authRouter.route("/signup").post(signupUser);

authRouter.route("/login").post(loginUser);
authRouter.route("/forgetPassword").post(forgetPassword)
authRouter.route("/resetPassword").post(resetPassword);

// routes -> functions
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
async function loginUser(req, res) {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            // password
            if (user.password == password) {
                let token = jwt.sign({ id: user["_id"] }, JWT_SECRET, { httpOnly: true })

                res.cookie("JWT", token);
                res.status(200).json({
                    data: user,
                    message: "user logged In"
                })
            } else {
                res.status(404).json({
                    message: "email or password is incorrect"
                })
            }
        } else {
            res.status(404).json({
                message:
                    "user not found with creds"
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        })
    }
}

// [#1]
async function forgetPassword(req, res) {
    try {
        let { email } = req.body;
        // search on the basis of email
        let user = await userModel.findOne({ email })
        if (user) {
            let token = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

            let updateRes = await userModel.updateOne({ email }, { token }) // agr validUpto impelement kre to wo token ke saath bhejna 
            // console.log("updateQuery",updateRes)             // just to check ki updatedRes me kya aata hai
            
            // find update user on the basis of mail
            let newUser = await userModel.findOne({ email });  
            // console.log("newUser", newUser)

            // email send
            await emailSender(token, user.email);

            res.status(200).json({
                message: "user token send to your email",
                user: newUser,
                token
            })
        } else {
            res.status(404).json({
                message:
                    "user not found with creds"
            })
        }
        // create token
        // -> update the user with a new token 
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        })
    }
}

// [#2]
async function resetPassword(req, res) {
    // token,confirmPassword,password
    try {
        let { token, confirmPassword, password } = req.body;
        let user = await userModel.findOne({ token }); //[*2.1]
        // console.log("user 108", user);
        if (user) {

            // ye niche wale commented code ko baad me dekha jaayega (ye update ke liye tha jo resertHandler se kiya baad me kyunki ye chla nhi)
            // await userModel.updateOne({ token }, {
            //     token: undefined,
            //     password: password,
            //     confirmPassword: confirmPassword,
            // },{runValidators:true} )

            user.resetHandler(password,confirmPassword);
            // kyunki ye entry database me honi h isiliye time lg skta hai to await lga diya 
            await user.save();

            let newUser = await userModel.findOne({ email: user.email });
            // console.log("newUser", newUser)
   
            res.status(200).json({
                message: "user token send to your email",
                user: newUser,
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = authRouter


/*
#1. How this forgetPassword activity works
dekho jab bhi forgetPassword wale route pe post ki req aayegi to forgetPassword() run hoga
forgetPassword wale route pe aane ka matlab hai ki bnda apna password bhul chuka hai 
to wo bnda req me apni email bhejega
hum us email ko req ki body me se nikal lenge aur us email ke basis pe apne database me search krenge ki iss email se koi user present hai ki nhi
agr user nhi mila to err aa jaayega 
aur agr user hua to fir hum ek random no. generate krenge Math ki library ka use krke
aur us no. of token(ye jwt wale token se alag hai ye bas otp ke jaise simple token hai) var me save kra lenge

aur fir uske baad hum email ke basis pe user ko update krenge(user ke document ke token bhi add kr denge)
aur ab user update ho gya h to updated user ko dobara se find krke laate hai 

aur us token ko user ke dwara bheje gye email pe bhi bhej dete hai 
taki jb wo password ko reset kre to us token ko daale authentication ho ske

aur finally res me msg, newUser aur token send kr dete hai
aise user bhejte nhi h kyunki isse to security breach ho rhi hai 
isiliye last me hum iss code production code me change krenge 


#2. How resetPassword activity works
Dekho jab bnde ne forgetPassword kr liya hoga to uske pass token aa gya hoga jo humne use email kr through bheja tha
ab wo bnda hume wo token aur apna password aur confirm password bhejega jise req me se hum nikal lenge
aur fir us token ke basis pe user ko search krenge kyunki humne ye token document me save krwa diya tha
agr user nhi mila to err aayega 
agr user mil gya to hum resetHandler() function chla denge jo password,confirmPassword aur token ko set kr dega
aur uske baad user.save() chla denge 

save() se schema ke saare validators run hote hai jisse password aur confirmPassword equal hai ki nhi validate ho jaayenge
aur agr koi pre hook save pe lga rkha hoga to wo chalega jisse confirmPassword undefined set ho jaayega
aur fir ye sb hone ke baad document update bhi ho jaata hai

aur ab user update ho gya h to updated user ko find krke laate hai
aur finally res me msg, newUser aur token send kr dete hai 

*2.1 Token ke base pe search krna kyu safe idea nhi h      
Maanlo apke pass 10 last user h aur ek time pe hi 10 hzar users ne reset maara 
to humne to simple math fxn lga rkha hai to random no generate krke deta hai 
ab agr ek hi time pe wo 10 hzar no dega to there is certain possibility ko koi na koi no duplicate hoga
to us time pe token ke base pe search kiya to multiple user milenge aur galat user ke aane ki possibility hogi
tp iska sol ye h ki hum frontend ke local storage me user ka email save kra le 
aur fir us email ko reset ke time axios se bhejde 
aur fir email ke basis pe user ko nikal le 
aur fir user ke dware bheje gye token ko aur collection me se nikale hue user ke token ko compare kre 
*/