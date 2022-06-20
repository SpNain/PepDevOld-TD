const express=require('express');

const app=express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// const router=express.Router();
app.listen('5000',function(){
    console.log('server listening on port 5000');
});

app.use(express.json());

app.use(express.static('public'));
const userRouter=require('./Routers/userRouter');
const authRouter=require('./Routers/authRouter');

app.use('/user',userRouter);
app.use('/auth',authRouter);











