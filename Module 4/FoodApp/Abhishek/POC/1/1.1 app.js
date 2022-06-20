//npm init -y
// npm install express
// npm i nodemon -g

const express=require('express');  // hum yha se express le aaya / import kr liya

//server creation : express() fxn ko call lgake app naam ka ek server create kr liya
const app=express();

// apna port no. specify kr diya jispe humara server listen krega means is port no. pe hum alag alag kaam krenge like for eg. request maarenge etc.
let port = '8081';

// app.listen() : isse hmara server listen krna start kr deta hai us port pe jo hum iske parameters me dete hai
app.listen(port,function(){
    console.log(`server is listening on port ${port} `);
});

//types of request -> get post put delete 

// get request -> jab bhi hum isme diye gye route pe jaayenge to hum kya data send krna hai wo hum get request ke through krte hai
app.get('/',(req,res)=>{
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.method);
    console.log('hello from home page');
    res.send('<h1>hello hi from backend </h1>'); // [#1]
});
let obj={
    'name':'Abhishek'
}
// for e.g. -> mai bolta hu ki jab bhi mai user wale page ko visit kru to tum ek json obj reponse me bhejna (obj me kuch bhi daal skte hai like in this case hume {'name' : "Abhishek"} key-value pair daala hai)
app.get('/user',(req,res)=>{
    console.log('users');
    res.json(obj);  // response will be sent in the form of json obj
});

app.get('/home',(req,res)=>{
    // console.log('users');
    console.log(__dirname);  // __dirname : will give you the path to the home/current directory
    res.sendFile('./views/index.html',{root:__dirname});  // it will send a complete file in response
});





/*
#1. res.send
res.send() response send krke response ko end bhi kr deta hai means iske baad hum koi reponse send nhi kr skte (i guess)
res.send() type of file check krke usko waise hi send kr deta hai 
jaise yha pe h1 tag hai to that means ye ek html file hogi to isko html file bnake(header,body wgerha lgake) send kr dega
res.send() saath me status code bhi btata hai (to know more about status code check resources.md)
*/
