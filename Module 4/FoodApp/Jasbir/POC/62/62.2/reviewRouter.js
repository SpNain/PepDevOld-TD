// created review router for the reviews (it resembles with userRouter.js, so if you understand userRouter.js then this is same)

// requirments
const express = require('express');
let reviewRouter = express.Router();
let reviewModel = require("../model/reviewModel")
const { protectRoute, bodyChecker, isAuthorized } = require("./utilFns");
const { createElement,
    getElement, getElements,
    updateElement,
    deleteElement } = require("../helpers/factory");

// functions
const createReview = createElement(reviewModel);
const deleteReview = deleteElement(reviewModel);
const updateReview = updateElement(reviewModel);
const getReview = getElement(reviewModel);
const getReviews = getElements(reviewModel);

// routes-> id
reviewRouter.use(protectRoute);
reviewRouter.get("/getuseralso", getUsersAlso);
reviewRouter
    .route('/')
    .post(bodyChecker, isAuthorized(["admin"]), createReview)
    // localhost/review -> get
    .get(protectRoute, isAuthorized(["admin", "ce"]), getReviews);
// console.log(2)
reviewRouter.route("/:id")
    .get(getReview)
    .patch(bodyChecker, isAuthorized(["admin", "ce"]), updateReview)
    .delete(bodyChecker, isAuthorized(["admin"]), deleteReview);

    
async function getUsersAlso(req, res) {
    try {
        let reviews = await reviewModel.find().populate({  // [#1]
            path: "user plan",
            select: "name email duration"
        })
        res.json({
            reviews
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "server error"
        })
    }
}

module.exports = reviewRouter;

/*
#1.
ye ek query h
jis model pe lgaya h uspe ye chlti h 
uske baad path dena hota h ki kis path pe jaake ye query chlani chahiye
aur uske baad select me hume keys deni hoti h jisko populate krna h

for eg. 
jaise yha pe humne reviewModel pe ye query chalayi h
aur reviewSchema ki user property ko as a path diya h
jisme bas ek id pdi h 
to ab populate se hoga ye ki us id ko ref property me diye gye reference model me search kiya jaayega
aur fir jab pura user ka object mil jaayega usme se jo select me keys di gyi h unhe select kr liya jaayega
aur whi chije var reviews me store hogi jise humne res me send kiya h

*/