// plans ke liye schema aur model bna liya iss file me

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
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, "Review can't be empty"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Review must contain some rating"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Review must belong to a user"],
        ref: "PABUserModel"  // [#1]
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: "PABPlanModel",
        required: [true, "Review must belong to a plan "]
    }
});
const ReviewModel = mongoose.model("PABreviewModel", reviewSchema);
module.exports = ReviewModel;

/*
#1.
jb bhi user koi review daalega 
to hum chahte h ki us user ki information hum dhikha ske 
aur us user ne kis plan ke liye review kiya h wo dhikha ske
to uske liye hum reviewModel ko userModel aur planModel se link krna pdega
uske liye hum use krte h ref

user aur plan dono ke apne apne object hote h
to ref se hoga ye ki unke object ki id se hum user/plan nikal skenge
aur ye kaha jaake nikalana h ye hum ref btayega

jaise ki kisi bnde pe plan ke liye review daala 
to us plan ki objectId hume mil jaayegi aur fir ref me jis model ka naam diya hoga 
us model me jaake hum us id ko dund lenge indirectly hum us plan ko dund lenge

*/