const express=require('express');

const app=express();
// const router=express.Router();
app.listen('5001',function(){
    console.log('server listening on port 5001');
});

app.use(express.json());
app.use(express.static('public')); // it is a middleware function which serve static files. It takes root directory and server files inside that.

const authRouter=express.Router(); // auth ka ek route bna liya

app.use('/auth',authRouter); // authRouter me by default '/auth' add hoga

authRouter
.route('/signup') // now the route is '/auth/signup'
.post(signupUser);  // uper wale route pe post request lgte hi ye fxn execute hoga

let user = [];

function signupUser(req,res){
    // let userDetails=req.body;
    // let name=userDetails.name;
    // let email=userDetails.email;
    // let password=userDetails.password;

    let{email,name,password}=req.body;  // shorten above code using destructing
    user.push({ email, name, password });
    
    // console.log('user',req.body); // just to check what we got in req body // ye terminal me console hoga
   
    res.json({  
        message:'user signedUp',
        user:req.body
    });  // [#1]
}

/*
#1. jo res hum yaha se send krenge wo axios.post ke saamne likhe 'resp' var me catch hoga 
    jisko fir humne console kra rkha hai
*/







