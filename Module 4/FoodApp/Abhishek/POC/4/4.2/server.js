const express=require('express');

const app=express();
// const router=express.Router();
app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());

const authRouter=express.Router();

app.use('/auth',authRouter);

authRouter
.route('/signup')
.post(setCreatedAt,signupUser);

let user=[];

// dekho yaar hum chahte hai ki jb koi user signup wale route pr request maare to 
// req ki body me ek createdAt wali key bn jaaye jisme jis date pe usne signup kiya hai wo as a string pdi ho
function setCreatedAt(req,res,next){
    let obj = req.body;
    // objects.keys : ye isme pass kiye gye obj ki keys nikal ke uska ek arr bnake return krta hai
    let length=Object.keys(obj).length;  //keys ke arr ki length
    if(length==0){  // agr 0 hui to means ki data bheja hi nhi kuch
        return res.status(400).json({message:"cannot create user if req.body is empty"})  // res.status.json - its chaining
    }
    req.body.createdAt=new Date().toISOString();  // this line will create a key named `createdAt` in the request body jisme date+time hoga
    next();  // isse signupUser fxn invoke hoga
}

const userModel = require('./models/userModel');  // userModel ko require kr liya userModel.js se

// userModel.create is a async fxn isiliye async used before funtion
async function signupUser(req,res){
    try{
        let userObj=req.body;  // req ki body me se userObj nikal liya
        //put all data in mongo db
        let user = await userModel.create(userObj);   // create document of userObj in userModel 
        console.log('user',user);
        
        res.json({
            message:'user signedUp',
            user:userObj
        });
    }
    catch(err){   // agr err aaya to catch block chlega
        console.log(err);
        res.json({message: err.message})  // err me message naam ki key hoti hai jisme error msg pda hota hai isiliye send err.message
    }
}
