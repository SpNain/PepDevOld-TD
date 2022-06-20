const mongoose = require("mongoose");
const { PASSWORD } = require("../secrets");
let dbLink
    = `mongodb+srv://admin:${PASSWORD}@cluster0.3gwfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function (db) {
    // console.log(db);
    console.log("connected to db")
}).catch(function (err) {
    console.log("err", err);
})
const bookingSchema = new mongoose.Schema({
    user: {   
        type: mongoose.Schema.ObjectId,  // jis user ne buy kiya h uski id
        required: true,
    },
    plan: {
        type: mongoose.Schema.ObjectId,  // jis plan ko buy kiya h uski id
        required: true,
    },
    bookedAt: {
        type: Date   // kis time pe buy kiya tha
    },
    priceAtThatTime: {  // jb buy kiya tha to tb kya price tha us plan ka 
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "failed", "sucess"],  // pyament ki status kya h
        required: true,
        default: "pending"
    }
})
const bookingModel = mongoose.model("bookingModel", bookingSchema);
module.exports = bookingModel;