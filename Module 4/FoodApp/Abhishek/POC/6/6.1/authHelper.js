// iss file me wo chije aayengi jo hume authorization me help kr rhi hai


// let flag=false; // Userloggedin
const jwt=require('jsonwebtoken');
const { JWT_KEY } = require('../secrets');

// protectRoute me jo token aaya hai wo verify hota hai 
// aur token verify hone ke baad hi next() call hota hai 
function protectRoute(req,res,next){
    try {
        // if(req.cookies){
        //     if(req.cookies.login=='1234'){
        //         next();
        // }
        if(req.cookies.login){ // agr req ke cookie obj me login naam ka jwt hua to if chalega
            console.log(req.cookies);
            let isVerified=jwt.verify(req.cookies.login,JWT_KEY);  // #1
            if(isVerified){  // agr signature match ho gya to  hi next call hoga aur tbhi hum users mangwa paayenge
                next();
            }
            else{
                res.json({
                    message:"not authorized"
                });
            }
        }
        else{
            res.json({
                message:"operation not allowed"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports = protectRoute;

/*
#1.
jwt.verify jwt ka hi fxn hai
ye req me aaya jwt leta hai aur usme se payload aur algo leta hai
aur secret key(joki ispe hoti hi hai) se on the spot nya signature bnata hai 
agr brower se aaye signature se match krta hai 
agr match hua to payload return krta hai 
agr match nhi hua to error thorw krta hai
*/