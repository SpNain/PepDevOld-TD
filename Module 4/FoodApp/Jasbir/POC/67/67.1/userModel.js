// we enhanced security here so focus only on security enhancement code (pre hook & resetHandler method me)

const mongoose = require("mongoose");
let { PASSWORD } = require("../secrets");
const validator = require("email-validator");
const bcrypt = require("bcrypt");  // BCrypt : to stop password theft

let dbLink
    = `mongodb+srv://admin:${PASSWORD}@cluster0.3gwfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
    .connect(dbLink)
    .then(function (connection) {
        console.log("db has been conncetd")
    }).catch(function (error) {
        console.log("err", error);
    })
const userSchema = new mongoose.Schema(
    {
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
        token: String,
        validUpto: Date,
        role: {
            type: String,
            enum: ["admin", "ce", "user"],
            default: "user"
        },
        bookings: {
            //   array of object id 
            type: [mongoose.Schema.ObjectId],
            ref: "bookingModel"
        },
    })
// hook
userSchema.pre('save', function (next) {
    // hum ek random salt generate kr lete h jo kuch nhi bas random sa text hota h 
    const salt = await bcrypt.genSalt(10);  // jtina jyada number hoga idhar utna jyada security hogi
    // aur fir us salt aur password ko mix krke hash generate kr dete h jo ek random text bn jaata h jisme se password alag krna muskil hota h fir 
    this.password = await bcrypt.hash(this.password, salt);

    this.confirmPassword = undefined;
    next();
});
// document method
userSchema.methods.resetHandler = function (password, confirmPassword) {
    // yhape bhi same uper wala hi kaam kiya h
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    this.confirmPassword = confirmPassword;
    this.token = undefined;
}
// model
let userModel = mongoose.model("PABUserModel", userSchema);
module.exports = userModel;