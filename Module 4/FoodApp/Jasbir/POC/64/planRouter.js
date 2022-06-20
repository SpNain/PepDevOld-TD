// focus only on getbestPlans() fxn

// requirements
const express = require('express');
let planRouter = express.Router();
let planModel = require("../model/planModel")
const { protectRoute, bodyChecker, isAuthorized } = require("./utilFns");
const {
    createElement,
    getElement,
    getElements,
    updateElement,
    deleteElement
} = require("../helpers/factory");
// routes-> id
const createPlan = createElement(planModel);
const deletePlan = deleteElement(planModel);
const updatePlan = updateElement(planModel);
const getPlan = getElement(planModel);
const getPlans = getElements(planModel);
planRouter.use(protectRoute);
planRouter
    .route('/')
    .post(bodyChecker, isAuthorized(["admin"]), createPlan)
    // localhost/plan -> get
    .get(protectRoute, isAuthorized(["admin", "ce"]), getPlans);
// console.log(2)

planRouter.route("/sortByRating", getbestPlans);

planRouter.route("/:id")
    .get(getPlan)
    .patch(bodyChecker, isAuthorized(["admin", "ce"]), updatePlan)
    .delete(bodyChecker, isAuthorized(["admin"]), deletePlan)


// abhi muje iss fxn ka itna kuch khass idea lag nhi rha ki actually me kya kr rha h
// to baad me agr muje clear hota h to yha pe aake update kr dunga
// filhaal ke hisab se 
// hume planModel find lagaya h jisse planModel ke andar jitne bhi documents honge (joki plans ke documents h) 
// unhe averageRating ke hisab se sort kiya jaayega decreasing order me (`-` lga h isiliye) 
// aur hume plan ke reviews property ko yha pe populate bhi kr diya h
// humne yha pe path me reviews diya h to planModel me reviews naam ki property dundi jaayegi 
// aur fir reviews property me se id lenge aur jiska ref usme de rkha hoga wha jaayenge
// aur fir us model me se us id wale obj ke review naam ki property ko leke aayenge
// aur ids multiple hogi to ek ek krke uper wala operation sbpe chlega 
// to iss trh se hum plan ko sort bhi kr denge aur us plan ke jo bhi reviews honge unhe bhi le aayenge
async function getbestPlans(req, res) {
    try {
        let plans = await PlanModel.find()
            .sort("-averageRating").populate({
                path: 'reviews',
                select: "review"
            })
        console.log(plans);
        res.status(200).json({
            plans
        })
    } catch (err) {
        console.log(err);
        res.status(200).json({
            message: err.message
        })
    }

}

module.exports = planRouter;

