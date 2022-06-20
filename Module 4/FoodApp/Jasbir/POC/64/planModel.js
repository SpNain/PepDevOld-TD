//added two new properties in planSchema

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
const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kindly pass the name"],
        unique: [true, "plan name should be unique"],
        // errors
        maxlength: [40, "Your plan length is more than 40 characters"],
    },
    duration: {
        type: Number,
        required: [true, "You Need to provide duration"]
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        validate: {
            validator: function () {
                return this.discount < this.price;
            },
            message: "Discount must be less than actual price",
        },
    },
    planImages: {
        type: [String]
    },

    
    reviews: {
        //   array of object id 
        type: [mongoose.Schema.ObjectId],  // [#1]
        ref:"reviewModel"
    },
    averageRating: Number,  // plan ki avg rating kya h
})
// model
let planModel = mongoose.model("PABPlanModel", planSchema);
module.exports = planModel;

/*
#1.
maanlo kisi x plan ke liye kisi ne reivew daala
to us reivew ke object ki id idhar reviews property me store ho jaayegi
aur agr hume us review ko nikalan hoga to us id se nikal skenge
*/