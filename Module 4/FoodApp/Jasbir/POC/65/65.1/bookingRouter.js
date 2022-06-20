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

// initiate the booking : matlab ki maanlo kuch aisa hoga ki jaise hi bnda front end pe book pe click krega to ye wala fxn chla denge
// aur fir yha pe document create hote h usko redirect kr denge payment gateway pe
// aur fir payement done hone ke baad hume jab stripe/razorpay se confirmation aa jaayega
// to fir uski booking kr denge(booking confirm krne ke liye maybe kuch changes kre ya fir nya fxn bnaye wo future classes me hoga)
const initiateBooking = async function (req, res) {
    try {
        let booking = await bookingModel.create(req.body);  // databse me jaake ek document create kr liye bookingModel me
        let bookingId = booking["_id"];  // jo document create hua hoga usko mongodb ne koi id di hogi wo nikalwa li

        let userId = req.body.user;    // jb user book krega to user khud ka obj bhi bhejega req me to wha se user nikal liya
        let user = await userModel.findById(userId); // aur fir user ko find kr liya userModel me
        user.bookings.push(bookingId);   // user milte hi us user ke bookings me bookingId push krwa di
        await user.save();  // aur document save kra liya
        res.status(200).json({
            message: "booking created",
            booking: booking
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// deletebooking
const deletebooking = async function (req, res) {
    try {
        let booking = await bookingModel.findByIdAndDelete(req.body.id);  // id se booking nikali
        // console.log("booking", booking);

        let userId = booking.user;  // us booking me se user nikala
        let user = await userModel.findById(userId);  // us user ko find kiya userModel me
        let idxOfbooking = user.bookings.indexOf(booking["_id"]);  // us user ke document me se booking htayi
        user.booking.splice(idxOfbooking, 1);
        await user.save();  // aur user ka document save kr diya
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

bookingRouter
    .route("/:id")
    .get(getbooking)
    .patch(protectRoute, updatebooking)
    .delete(protectRoute, deletebooking)

bookingRouter
    .route("/")
    .get(getbookings)
    // create -> payment done (booking tbhi initiate honi chahiye jb payement done ho jaaye)
    .post(protectRoute, initiateBooking);

module.exports = bookingRouter;


