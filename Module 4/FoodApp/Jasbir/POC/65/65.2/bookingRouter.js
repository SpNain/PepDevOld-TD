// yha pe hum dekh rhe h ki kaise hum razorpay api ko integrate kr skte h apne app me

const express = require("express");

// router
const bookingRouter = express.Router();
const bookingModel = require("../model/bookingModel");
const UserModel = require("../model/userModel");
const { protectRoute } = require("./utilFns")
const {
    getElement, getElements,
    updateElement,
} = require("../helpers/factory");
const updatebooking = updateElement(bookingModel);
const getbooking = getElement(bookingModel);
const getbookings = getElements(bookingModel);

const Razorpay = require("razorpay");  // razorpay ko install krne ke baad require krlo

// jo key_id aur test_id ya secret_id razorpay se generate ki thi wo apne secrets me daal lo aur fir yha unhe require krlo
let { KEY_ID, KEY_SECRET } = require("../secrets");  

// isse razorpay instantiate ho jaayega matlab razorpay ka ek instance bn jaayega jiska naam humne razorpay hi de diya h
var razorpay = new Razorpay({
    key_id: KEY_ID,   // yha pe apni key_id daalni h
    key_secret: KEY_SECRET,  // aur yha secret_id
});

// createbooking
const initiateBooking = async function (req, res) {
    try {
        let booking = await bookingModel.create(req.body);
        let bookingId = booking["_id"];
        let userId = req.body.user;
        let user = await userModel.findById(userId);
        user.bookings.push(bookingId);
        await user.save();

        // yhape hum order create kr rhe h 
        // ye humne pahle se apni trf se values dedi h
        const payment_capture = 1;
        const amount = 500;
        const currency = "INR";
        // aur un values ko options me set kr diya
        const options = {
            amount,
            currency,
            receipt: `rs_${bookingId}`,
            payment_capture,
        };

        const response = await razorpay.orders.create(options);  // un options ka use krke hume order create kr liya jiska naam hume response diya h
        // console.log(response);

        res.status(200).json({  // ek baar hmara order(response) create ho jaayega to hum use as a res bhej denge front end pe
            id: response.id,      // id me response(oder) ki id hogi
            currency: response.currency,
            amount: response.amount,
            booking: booking,
            message: "booking created",
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// sir ne ise pura nhi smjhaya bas ye boldiya ki JWT ke jaise kuch h
async function verifyPayment(req, res) {
    
    const secret = KEY_SECRET   // yha pe apna secret daala h jo api keys se generate kiya tha

    // console.log(req.body);
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    console.log(digest, req.headers["x-razorpay-signature"]);

    if (digest === req.headers["x-razorpay-signature"]) {
        console.log("request is legit");
        res.status(200).json({
            message: "OK",
        });
    } else {
        res.status(403).json({ message: "Invalid" });
    }
};

// deletebooking
const deletebooking = async function (req, res) {
    try {
        let booking = await bookingModel.findByIdAndDelete(req.body.id);
        console.log("booking", booking);
        let userId = booking.user;
        let user = await userModel.findById(userId);
        let idxOfbooking = user.bookings.indexOf(booking["_id"]);
        user.booking.splice(idxOfbooking, 1);
        await user.save();
        res.status(200).json({
            message: "booking deleted",
            booking: booking
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};

// jab razorpay payement process ho jaayegi to wo fir backend pe is route pe request maarega
bookingRouter.route("/verification").post(verifyPayment)

bookingRouter
    .route("/:id")
    .get(getbooking)
    .patch(protectRoute, updatebooking)
    .delete(protectRoute, deletebooking)

bookingRouter
    .route("/")
    .get(getbookings)
    // create -> payment done 
    .post(protectRoute, initiateBooking);

module.exports = bookingRouter;


