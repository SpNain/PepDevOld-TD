// advantage of mongoose
// jo hum bhejete hai us data ko mongoose check krta hai 
// ki ye data exact waisa hi hai ki nhi jaisa entity bnane ke liye chahiye
// ki ye data complete aur valid hai ki nhi  

// For analogy
// jaise class se obj bnte hai 
// waise hi schema se model bnte hai
// schema is like map and model uska instance hai


// ======================================================================== //

const mongoose = require("mongoose");
let { PASSWORD } = require("../secrets");
const validator = require("email-validator");
let dbLink
    = `mongodb+srv://admin:${PASSWORD}@cluster0.y9gic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
    .connect(dbLink)
    .then(function (connection) {
        console.log("db has been conncetd")

    }).catch(function (error) {
        console.log("err", error);
    })
//mongoose -> data -> exact -> data -> that is required to form an entity 
//  data completness , data validation
// name ,email,password,confirmPassword-> min ,max,confirmPassword,required ,unique 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
       
        validate: function () {
            // third party library 
            return validator.validate(this.email)
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
    ,
    confirmPassword: {
        type: String,
        required: true,
        minlength: 8,
        validate: function () {
            return this.password == this.confirmPassword
        }
    },
    createdAt: {
        type: String,

    }
})
// model
let userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;