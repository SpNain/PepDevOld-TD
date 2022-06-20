// jo cookie-parser package hota hai wo hmare req wale obj me cookies ko populate kr dega hai
// jise hum kahi bhi cookie ko use kr skte hai
// populate means ki jab req aayegi to ye package cookie ka obj usme add kr deta hai
// tbhi to hum alag alag jagah pe req.cookie krke cookies wale obj ko access kr paate hai 
const cookieParser = require('cookie-parser');
app.use(cookieParser());