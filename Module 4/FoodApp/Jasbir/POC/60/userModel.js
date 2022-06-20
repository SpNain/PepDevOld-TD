// userModel.js contains all the details about the model of user
// focus only on token key in userSchema and resetHandler() function

const mongoose = require("mongoose");
let { PASSWORD } = require("../secrets");
const validator = require("email-validator");
let dbLink
    = `mongodb+srv://admin:${PASSWORD}@cluster0.3gwfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
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
        unique: true,
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

    },
    token: String  // humne token ko schema me add kr diya jisse forgetPassword ke time token ko document me save kiya jaa ske
    // validUpto: Date
})
// hook
userSchema.pre('save', function (next) {
    // do stuff
    this.confirmPassword = undefined;
    next();
});

// document method
// ye userSchema ke password me isme aaya password dlwa deta hai
// aur userSchema ke confirmPassword me isme aaya confirmPassword dlwa deta hai
// aur token ko undefined set kr deta hai
userSchema.methods.resetHandler = function (password, confirmPassword) {
    this.password = password;     // this b/c userSchema pe lga hua h ye method to this se password wagerha access ho skte h
    this.confirmPassword = confirmPassword;
    this.token = undefined;
}

// model
let userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;