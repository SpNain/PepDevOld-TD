// sir ne reviewRouter dobara se start se krwa diya tha pichle wala delete krwa ke 
// to jo chije pichle wale me samjha rkhi h unhe idhar jyada explain nhi kiya h maine

const ReviewModel = require("../model/reviewModel");
const PlanModel = require("../model/PlanModel");
const { protectRoute } = require("./utilFns")
const {
    getElement, getElements,
    updateElement,
} = require("../helpers/factory");
const updateReview = updateElement(ReviewModel);
const getReview = getElement(ReviewModel);
const getReviews = getElements(ReviewModel);

// createReview aur deleteReview ko alag se bnaya h kyunki inme kuch task alag krne the
// createReview [#1]
const createReview = async function (req, res) {
    try {
        // review-> put entry / create document
        let review = await ReviewModel.create(req.body);

        // plan -> reviewId
        // reviewSchema ke plan property me jis plan ke liye review daala h uski id store hoti h
        // to wo id humne nikal li aur fir us id ke basis pe plan konsa tha ye find kr liya
        // aur fir us plan ke reviews property me iss wale review ki id push krdi
        let planId = review.plan;
        let plan = await PlanModel.findById(planId);
        plan.reviews.push(review["_id"]);

        //  plan: average rating update 
        // agr pahle se koi rating nhi hogi to review me aayi hui rating hi averageRating bn jaayegi
        // nhi to fir avg rating nikal ke averageRating me store krwani hogi
        if (plan.averageRating) {
            let sum = plan.averageRating * plan.reviews.length;
            let finalAvgRating =
                (sum + review.rating) / (plan.review.length + 1);
            plan.averageRating = finalAvgRating
        } else {
            plan.averageRating = review.rating;
        }

        await plan.save();  // plan ko save() kr taki updates save ho jaaye

        res.status(200).json({
            message: "review created",
            review: review
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

// deleteReview
const deleteReview = async function (req, res) {
    try {
        // reviewModel me se review ko delete kr diya
        let review = await ReviewModel.findByIdAndDelete(req.body.id);
        // console.log("review", review);

        // plan model me se us review ki id delete krdi
        let planId = review.plan;
        let plan = await PlanModel.findById(planId);
        let idxOfReview = plan.reviews.indexOf(review["_id"]);
        plan.review.splice(idxOfReview, 1);
        await plan.save();

        res.status(200).json({
            message: "review deleted",
            review: review
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
};

ReviewRouter
    .route("/:id")
    .get(getReview)
    .patch(protectRoute, updateReview)
    .delete(protectRoute, deleteReview)

ReviewRouter
    .route("/")
    .get(getReviews)
    .post(protectRoute, createReview);

module.exports = ReviewRouter;

/*

#1.
jb bhi review create hoga to kuch certain tasks krne h :
reviewModel me us review ki entry hogi means uska document create hoga
plan Model me jaake us review ki id store krwani h
plan model me avg rating ko update krna h


#2.
jb bhi koi review delete hoga to kuch certain tasks krne h :
reviewModel me us review ko delete krna h 
planModel Model me jaake us review ki id delete krni h
waise avg rating bhi update krni chahiye lekin hum nhi kr rhe yaha pe
*/
