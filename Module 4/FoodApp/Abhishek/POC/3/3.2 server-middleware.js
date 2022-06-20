/*  In this we are understanding middleware functions.
    What are middleware functions ?
    these fxns run on the server and can be used before req and after response.
    middleware fxn alag alag kaam ke liye use hote hai (to know more about it check OneNote Notes or google about their usages).
*/

const express = require('express');

const app=express();
// const router=express.Router();
app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());

// here we are using middleware funtion app.use here
// jo file run hone pe chlega aur console pe hume `i am a middleware` print hota hua dhikhega
app.use((req,res,next)=>{
    //do some work
    console.log('i am a middleware');
    next();  // [#1]
});

const userRouter=express.Router();

app.use('/user',userRouter);

userRouter
.route('/')
.get(getUser)

app.use((req,res,next)=>{
    //do some work
    console.log('i am a middleware 2nd time');
    next();
});

let user=[];

function getUser(req,res){
    console.log('getUser called');
    res.json(user);
}

/*
If we run this server file then 

i am a middleware
getUser called 
i am a middleware 2nd time

is order me console pe print hota dhikega, jisse hume pta chlta hai ki jo use middleware fxn hai wo order me run ho rha hai.

Note : Every fxn is a middleware function here for e.g. getUser() jisko humne define kiya hai wo bhi ek middleware fxn hi hai.
*/

/*
#1. next ek parameter hai which passes control to the next matching route.

jab hum res use krte hai to wo response bhejke process ko udhar hi terminate kr deta hai but 
agr humne res send nhi kr rkha to site load hoti rhegi lekin control apne app next route pe nhi jaayega
ya fir res to bhej rkha hai lekin jaa nhi rha kisi bhi reason se to bhi control next route pe apne aap move nhi krega


Tip : Just for analogy res is just like return statement in java or c/c++ programming language.

*/





