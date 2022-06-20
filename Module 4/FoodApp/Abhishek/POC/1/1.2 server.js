const express=require('express');
const app=express();

app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json()); // express ke andar jo bhi data use kiya hai use json bna ke pass kro // .use is middleware fxn : will understand this later in detail 


let user = {};

// get request : client <- server
// jab client server se data mangwata hai tab get use hota hai
app.get('/',(req,res)=>{
    res.send('Home Page');
});

app.get('/user',(req,res)=>{
    res.json(user);  // response data will be sent in the form of JSON object
});

//post request : client-> server 
// jab client server ko data bhejta hai tab post request use hota hai
app.post('/user',(req,res)=>{
    user=req.body;    // client jo bhi data bhejta hai wo req ko body ke andar jaata hai // to humne yaha usko body me se data nikal ke user me assigned kr diya
    // console.log(req.body);
    res.send('data has been added succesfully');
});

// agr koi object pahle se exist krta hai to uske update krne ke liye patch request use hoti hai
app.patch('/user',(req,res)=>{
    let obj=req.body;
    for(let key in obj){  // [#1]
        user[key]=obj[key];
    }
    res.json(user);
});

// delete request : jo response hum sent krenge wo res existing obj ko replace kr dega 
// to delete ke time hum empty obj bhej dete hai jise empty obj exsiting obj ko replace kr deta hai aur hume aisa lgta hai ki humne data delete kiya ho obj me se 
// put bhi same kaam hi krta hai replace wala lekin hum jab hume value delete krni ho to hum delete request ka use krte hai taki browser ko pta chlta rhe ki kb replace/update ho rha hai aur kb delete
app.delete('/user',(req,res)=>{
    user={};
    res.json(user);
})


/*
#1. for in loop
obj me se ek ek krke key aayegi 
ab agr wo key user obj me exist krti hogi to user-obj ki usi key pe obj[key] value dal jaayegi
aur agr wo key user obj me exist nhi krti hogi to user-obj me us naam ki nyi key bn jaaayegi aur usme obj[key] value dal jaayegi
*/
