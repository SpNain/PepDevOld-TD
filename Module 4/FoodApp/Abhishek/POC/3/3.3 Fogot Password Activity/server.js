const express=require('express');

//server creation
const app=express();
app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());
app.use(express.static('public'));
const authRouter=express.Router();  // create a new route
app.use('/auth',authRouter);  // /auth authRouter ke saath attach ho gya

authRouter
.route('/signup')  // /auth/signup route pe post request attach kr di
.post(signupUser);

authRouter
.route('/forgetPassword')  // /auth/forgetPassword route pe get & post request attach krdi
.get(getForgetPassword)
.post(postForgetPassword,validateEmail);  // agr postForgetPassword me next() use kiya to validateEmail fxn run hoga usse

let user=[];

// agr koi /auth/forgetPassword wale route pe aata hai to usko forgotPassword.html wali file dhikhani hai
function getForgetPassword(req, res) {
    res.sendFile('./public/forgetPassword.html',{root:__dirname});
} 

// agr /auth/forgetPassword wale route pe jaake kuch data post krta hai to postForgotPassword fxn run hoga
function postForgetPassword(req,res,next){
    let data=req.body;
    console.log('data', data);
    
    //check if email id is correct - validate
    next();   // isse validateEmail fxn run hoga

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
    let { email } = req.body;  // email nikal li req k body me se
    console.log(email);
    if (email.indexOf('@') != -1 && email.indexOf('.') != -1) {   // agr to email me @ aur . hue to unke index -1 nhi aayenge aur aisa hone pe hi data send hoga
        res.json({
               message:"data received",
               data:req.body
           });
    } else {
        res.send("Enter a valid email.");
    }

}

function signupUser(req,res){
    
    let{email,name,password}=req.body;
    user.push({email,name,password});
    console.log('user',req.body);
    res.json({
        message:'user signedUp',
        user:req.body
    });
}









