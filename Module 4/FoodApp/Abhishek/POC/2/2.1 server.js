/*
const express = require('express');
const app=express();
app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());


let user = {};

// client <- server
//crud- create read update delete
//read
app.get('/',(req,res)=>{
    res.send('Home Page');
});

app.get('/user',getUser);
function getUser(req,res){
    res.json(user);
}

//post request
// client-> server 
//create
app.post('/user',createUser);
function createUser(req,res){
    user=req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
}

//update
app.patch('/user',updateUser);
function updateUser (req,res){
    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
};

//delete 
app.delete('/user',deleteUser);
function deleteUser(req,res){
    user={};
    res.json(user);
    // res.send('ussr has been deleted');
}

//param route
app.get('/user/:id',getUserById);
function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
}
*/

/*======================= 2nd Method to write above code ==========================================*/


const express=require('express');
const app=express();
// const router=express.Router();
app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());

//The express.Router() function is used to create a new router object. 
//This function is used when you want to create a new router object in your program to handle requests.
const userRouter=express.Router(); // [#1]
app.use('/user',userRouter);  // isse userRouter wale path me '/user' attach hoke hi aayega means ki userRouter ka jo path hai that is '/user'

//mounting in express 
// jab bhi sirf userRouter/ wale path ko call lgegi means '/user/' iss route ko call lgegi to ispe attach methods use ho skte hai
// aur kisi method ko call lgne pe uske paranthesis me likha fxn execute hoga 
userRouter
.route('/')   
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

// jab bhi sirf userRouter/:id wale path ko call lgegi means '/user/:id' iss route ko call lgegi to sirf get method chla skenge kyunki sirf wahi attach hai
// aur get ko call lgane pe getUserById fxn execute hoga
userRouter
.route('/:id')
.get(getUserById);


let user = {};

app.get('/',(req,res)=>{
    res.send('Home Page');
});

function getUser(req,res){
    res.json(user);
}

function createUser(req,res){
    user=req.body;
    // console.log(req.body);
    res.send('data has been added succesfully');
}

function updateUser (req,res){
    let obj=req.body;
    for(let key in obj){
        user[key]=obj[key];
    }
    res.json(user);
};

function deleteUser(req,res){
    user={};
    res.json(user);
    // res.send('ussr has been deleted');
}

function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
}


/*
#1. Why we use express.Router() and make a userRouter object

Ans : dekho jab application bdi hogi to usme kaafi saare methods lge honge alag alag routes par 
      ab agr normal wale trike se methods attach kre to fir baad me kis route pe konse konse method hai ye dundne me muskil hogi
      isiliye ek route ke liye router object (userRouter in this case) bnake uspe methods/requests ko ek jagah attach kr dete hai jisse readability increase hoti hai
*/
