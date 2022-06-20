// iss file me wo chije aayengi jo hume authorization me help kr rhi hai

// let flag=false; // Userloggedin
const jwt=require('jsonwebtoken');
const { JWT_KEY } = require('../secrets');


// see poc/5/5.3/5.3.1 and poc/5/5.3/5.3.2/Routers/userRouter and poc/6/6.1/authHelper explaination of this function
function protectRoute(req,res,next){
    try{
        if(req.cookies.login){
            console.log(req.cookies);
            let isVerified=jwt.verify(req.cookies.login,JWT_KEY);
            if(isVerified){
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

module.exports=protectRoute;