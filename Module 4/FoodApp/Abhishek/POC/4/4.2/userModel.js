const mongoose=require('mongoose');
const {db_link}=require('../4.1/secrets.js')
const validator = require("email-validator");
mongoose.connect(db_link).then(function(db){
    // console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return validator.validate(this.email);
        }
    },
    createdAt:{   // added createdAt in the schema
        type:Date
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    confirmPassword:{
        type:String,
        required:true,
        min:8,
        validate:function(){
            return this.password==this.confirmPassword
        }
    }
});

// pre is a function of mongoose
// ye ek hook hai
// yha hum bol rhe hai ki save hone se pahle given fxn ko chla do
// jo confirmPassword hai ek redundant key hai jisko database me save krne ka koi faayda nhi hai
// usko hum save hone se pahle hi undefined set kr de rhe hai jisse wo database me save na ho
// kyunki mongodb jo chij undefined hoti hai use save nhi krta
userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});

const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;

