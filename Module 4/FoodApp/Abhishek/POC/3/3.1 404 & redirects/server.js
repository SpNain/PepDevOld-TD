// In this we are understanding 404 and redirect

const express = require('express');

const app=express();
// const router=express.Router();
app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());
app.use(express.static('public'));
const userRouter=express.Router();
const authRouter=express.Router();

app.use('/user',userRouter);
app.use('/auth', authRouter);

//mounting in express
userRouter
.route('/')
.get(getUser)
.post(createUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')
.post(signupUser);


//redirects [#2]
app.get('/user-all',(req,res)=>{
    res.redirect('/user');
});

//404 page [#1]
app.use((req,res)=>{
    res.sendFile('public/404.html',{root:__dirname})  // send 404.html in response 
});



function signupUser(req,res){

    let{email,name,password}=req.body;
    user.push({email,name,password});
    console.log('user',req.body);
    res.json({
        message:'user signedUp',
        user:req.body
    });
}


let user=[];

app.get('/',(req,res)=>{
    res.send('Home Page');
});

function getUser(req,res){
    res.json(user);
}

function createUser(req,res){
    user=req.body;
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
}

function getUserById(req,res){
    console.log(req.params);
    res.json(req.params.id);
}

/*
#1. 404 

404 page ki dhikhane ke liye hum app.use istemaal krte hai

app.use is a middleware fxn jiska kaam hai ki agr ye istemaal ho rha hai to use krlo wrna aage bd jaao
file ke run hone pe ye fxn har baar chlta hai 
iska kaam ye hai ki maanlo kisi ne route aisa de diya jiske liye humne koi fxn likh hi nhi rkha hai to
us case me route na milne pe app.use chla do jisse ye as a response 404 ki html file send kr dega
for e.g. let's assume kisi ne route de diya /user/signup/something. Now this route doesn't exist in our server file
         so we want that user will get a 404 error msg. Naki site can't be reached (jo thodi der baad aa hi jaayega route na milne pe)

ab kyunki app.use hr baar run hota hai aur route na milne pe use krna hai, isiliye isko sbse last me likhna chahiye (only in the case of 404)

*/

/*
#2. redirect
maanlo kabhi in future humne apni web site me kisi route ko change kr diya aur wo route kisi aur website ne apne blog ya fir kahi bhi daal rkha tha 
to jab user jab us route pe jaane ki koshish krega to use error na aaye uske liye redirects use krte hai
for e.g. lets assumen humne apni website me user-all wale route ko change krke user kr diya hai 
         aur koi abc.com ne hmari website ke user-all wale route ke link ko daal rkha hai
         to ab age user uspe click krega to use error aayega jo hum nhi chahte
         isiliye we redirects user-all route to user route.

*/




