const mongoose=require('mongoose');  // get mongoose
const {db_link}=require('./secrets.js') // [#2]
const validator = require("email-validator");

/***********establishing connection with the database***********/
// mongoose.connect is a promisified fxn so, we can attach .then and .catch on it
mongoose.connect(db_link).then(function(db){
    // console.log(db);
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

// creating schema for signup form for backend : matlab ki user front end pe ye sb entry jb bhrega to unhe database me save kis structure me krna hai
// schema me hum bta rhe hai ki uska skeleton kaisa hoga means ki usme kya kya aayega aur kaise aayega
const userSchema=new mongoose.Schema({  // [#1]
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

// created model for the userSchema
const userModel=mongoose.model('userModel',userSchema);

// yha pe to humne khud hi user obj me data daala aur uska document bna liya
// lekin actual me ye kaam front end pe hoga wha se data aayega user obj ke liye, jisko hum postman se krenge 
// this fxn will be converted to signupUser() in server.js
(async function createUser(){
    let user={
        name:'Abhi',
        age:20,
        // email:'abc@gmail.com',
        password:'12345678',
        confirmPassword:'12345678'
    };
    let userObj=await userModel.create(user); // ye line user obj ka ek document bna degi
    console.log(userObj);
})();

/*
#1.

name : String => ye ek key h jisme name property h aur String schemaType

-> type means ki data type kya hoga 
-> required means ki bhrna jruri hai ya nhi
-> unique means ki entry unique honi chahiye agr duplicate hui to error aayega
-> validate check krega ki entry shi hai ki nhi. isme hum fxn de skte hai jisko validate khud invoke kr deta hai. 
   ab us fxn me ya to hum khud ka logic likhle validate krne ke liye ya fir koi npm ka package use krle
-> this keyword : isme ye maanlo pura schema hota hai 
                  to jo bhi schema me hai usme hum this. krke use kr skte hai ke
                  ab kyunki yha this involved hai to hum yha arrow fxn use nhi kr skte
-> min means ki minimum kitne characters necessary hai

#2.
hume aise sensitive links github pe upload nhi krne chahiye kyunki unka galat istemaal ho skta hai 
isiliye link ko alag file me daalke yha import kr liya aur us file ko gitignore me daal diya
*/
