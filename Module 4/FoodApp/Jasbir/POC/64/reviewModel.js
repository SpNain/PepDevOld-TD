// sir ne reviewModel dobara se start se krwa diya tha pichle wala delete krwa ke 
// to jo chije pichle wale me samjha rkhi h unhe idhar jyada explain nhi kiya h maine

const mongoose = require("mongoose");
let { DB_LINK } = require("../secrets");
mongoose.connect(DB_LINK, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
}).then(function (db) {
    // console.log(db);
    console.log("connected to db")
}).catch(function (err) {
    console.log("err", err);
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
        // info 
        type: mongoose.Schema.ObjectId,  //[#1] jis user ne review dala h us user id store hogi yha pe
        required: [true, "Review must belong to a user"],
        ref:"PABUserModel"
    },
    plan: {
        // info
        type: mongoose.Schema.ObjectId,   // jis plan ke liye review daala h us plan ki id store hogi yha pe
        required: [true, "Review must belong to a plan "],
        ref:"PABPlanModel"
    }
})
const ReviewModel = mongoose.model("reviewModel", reviewSchema);
module.exports = ReviewModel;

/*
#1.
hum sirf id isiliye store kr rhe h taki baad me us id se us user/plan ko nikala jaa ske 
hum pura user/plan isiliye nhi store krwa rhe kyunki user/plan me kaafi info ho skti h 
to agr aise user/plan store krwate rhe to reviewSchema ke document kaafi heavy ho skte h 
aur baad me jab saare reviews magwane pd gye to usme kaafi time lg skta h 


*/