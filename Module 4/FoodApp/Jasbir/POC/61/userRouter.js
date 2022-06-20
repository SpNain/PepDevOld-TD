// focus on crud operations of the user
// focus on authorization

// dependency
const express = require("express");
const userModel =
    require("../model/userModel")
    // router
const userRouter = express.Router();
const { protectRoute, bodyChecker } = require("./utilFns");
// routes-> id
userRouter.use(protectRoute); // ab userRouter ke har route pe likhe fxn se pahle protectRoute run hoga

// humne fxn ko in var me assign krwa diya hai aur isAuthorized ko sirf 2 baar hi call lgegi
let authCheckerCE = isAuthorized(["admin", "ce"]); // ce means customer executive
let authChecker = isAuthorized(["admin"]); 

userRouter
    .route('/')
    .post(bodyChecker, authChecker, createUser)
    // localhost/user -> get
    .get(protectRoute, authChecker, getUsers);
userRouter.route("/:id")
    .get(getUser)
    .patch(bodyChecker, authCheckerCE, updateUser)
    .delete(bodyChecker, authChecker, deleteUser)

// yha pe isAuthorized() baar call hoga
// userRouter
//     .route('/')
//     .post(bodyChecker, isAuthorized(["admin"]), createUser)
//     // localhost/user -> get
//     .get(protectRoute, isAuthorized(["admin"]), getUsers);
// userRouter.route("/:id")
//     .get(getUser)
//     .patch(bodyChecker,  isAuthorized(["admin", "ce"]), updateUser)
//     .delete(bodyChecker, isAuthorized(["admin"]), deleteUser)

// functions
async function getUsers(req, res) {
    try {
        let users = await userModel.find();
        res.status(200).json({
            "message": users
        })
    } catch (err) {
        res.status(502).json({
            message: err.message
        })
    }
}

// moderator ,user
// parameters me se id nikalenge aur us id ke basis pe user ko collection me se find kr lenge
async function getUser(req, res) {
    let { id } = req.params
    try {
        let users = await userModel.findById(id);
        res.status(200).json({
            "message": users
        })
    } catch (err) {
        res.status(502).json({
            message: err.message
        })
    }
}

// [#1]
async function updateUser(req, res) {
    let { id } = req.params;
    try {
        if (req.body.password || req.body.confirmPassword) {
            return res.json({
                message: "use forget password instead"
            })
        }
        let user = await userModel.findById(id);
        console.log("60", user)
        if (user) {
            for (let key in req.body) {
                user[key] = req.body[key];
            }
            // save -> confirm ,password
            await user.save({
                validateBeforeSave: false
            });
            res.status(200).json({
                user: user
            });
        } else {
            res.status(404).json({
                message: "user not found"
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}

// req ki body me jo data aaya hai uska use krke user ko create kr lenge
// till now jo signupUser hai aur jo createUser un dono ke andar same hi code h almost aage jaake koi difference hota hai to dekhte hai
// abhishek ne bhi ek createUser fxn bnaya the lekin wo bas ek temporary fxn tha jise bas userSchema ko test krne ke liye bnaya tha 
// only authorized to admin
async function createUser(req, res) {
    try {
        let user = await userModel.create(req.body);
        res.status(200).json({
            user: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}

// isme hum id ke basis pe (joki parameter se mil jaayegi) user ko find krte hai aur fir delete kr dete hai
async function deleteUser(req, res) {
    let { id } = req.params;
    try {
        let user = await userModel.findByIdAndDelete(id);
        res.status(200).json({
            user: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}

// [#2]
function isAuthorized(roles) {
    console.log("I will run when the server is started")
        // function call 
    return async function(req, res) {
        console.log("I will run when a call is made ")
        let { userId } = req;
        // id -> user get ,user role,
        try {
            let user = userModel.findById(userId);
            let userisAuthorized = roles.includes(user.role); // arr.includer() give true/false
            if (userisAuthorized) {
                req.user = user;
                next();
            } else {
                res.status(200).json({
                    message: "user not authorized"
                })
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Server error"
            });
        }
    }

}

module.exports = userRouter;

/*
#1.
parameters me se id nikal lenge 
aur agr user ne password ya fir confirmPassword ko req ki body me bhej rkha hai to udhar se hi return kr jaayenge
kyunki hum nhi chahte ki bnda password aur confirmPassword ko updateUser ke through update kre 
hum chahte hai ki bnda password aur confirmPassword ko reset aur forget ke through update kre 
agr uper wala scenario nhi hua to fir hum us id ke basis pe user ko leke aayenge 
aur for in loop ka use krke update krenge
req ki body me obj pda hai to for in loop ki wjah se ek ek krke us obj me se key niklegi
agr wo key user me present hui to us key ki value update ho jaayegi, agr nhi hui to new key create hoke usme valye assign ho jaayegi
for example : 
let user : { name : 'AB',
             email : 'user@google.com'}

and req.body : { name : 'BC',
                 age : '23' }
                 
then after updation user will be 
user : { name : 'BC',
         email : 'user@google.com',
         age : '23'}

#2.
Hume userId nikal li req ki body me se
aur fir us userId ke basis pe user mangwa liya 
aur fir hum check krte hai ki user ka jo role hai wo roles jo isAuthorized() me pass kiye hai usme h ke nhi
means ki maanlo roles me pass kiya hua hai `["admin", "ce"]` ye array
aur user ka role hai `admin` ka to kyunki admin passed array me h to 
iska matlab ye bnda authorized hai agla fxn use krne ke liya 
aur fir hum next ki call lga dete hai 

Scenario/flow jab ye kaam hoga :
maanlo suru me bnde signup kra to uska document bn gya hoga mongodb me jisme uska role bhi hoga
fir bnda login krta hai jaha se use jwt mil jaata hai jisme payload(yani id joki mongodb se uthate h) hota hai
fir agr bnde ne maanlo localhost:8081/api/user/:id route pe patch ki req maari to
sbse pahle protectRoute() chalega jisse req me userId dal jaayegi jo jwt se nikali hoga
aur fir bodyChecker chalega fir isAuthorized() aur fir updateUser()

ye isAuthorized() ko aise kyu likha hai :
humne isAuthorized ko simple fxn ki bjaye usse fxn kyu return krwaya hai

dekho ek company ke andar different different levels hote h aur different levels ke users ko different authorization deni hoti hai 
ab hum har ek type ke user ke liye alag alag isAuthorized() likh skte the lekin usse code sirf repeat hota, change kya hota sirf roles
to isiliye isAuthorized() ko iss trh se likha hai ki jab ye file run hogi to isAuthorized() to chalega lekin ye fxn tabhi return krega jab iske pass kisi route se req aayegi
aur fxn ko async isiliye likha hai kyunki fxn ke andar async kaam ho rha hai 

dekho jo routes hote h unhe chahiye hota h address kisi fxn ka jisko wo run krwa ske jab us route pe req aaye
aur agr hum iss fxn ko simple way me likhte to fir hum har user ke liye alag alag trike se likhna pdta kyunki har baar hume role ko alag value deni pdti 

agr hum alag alag user ke liye alag alag fxn likhte to kuch aise likhte 

function isAuthorized(req, res) {
    let { userId } = req;
    let roles = ["admin"];

    try {
        let user = userModel.findById(userId);
        let userisAuthorized = roles.includes(user.role);
        if (userisAuthorized) {
            next();
            I
        } else {
            res.status(200).json({

                message: "user not authorized"
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}

function isAuthorizedCE(res, res) {
    let { userId } = req;
    let roles = ["admin", "ce"];
    try {
        let user = userModel.findById(userId);
        let userisAuthorized = roles.includes(user.role);
        if (userisAuthorized) {
            next();
        } else {
            res.status(200).json({
                message: "user not authorized"
            })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error"
        });
    }
}

lekin iss trike se to bhut saare role ho skte h aur sbke liye aise likha isn't a wise option.

To iss trike se likhne ka kya faayda hua hume ?

hume alag alag fxn nhi likhne pde, hum bas calling ke time role pass kr denge aur fir usi role ke hisab se fxn behave krega

ab ye hota aise h ki jab suru me files chalegi to jaha pe isAuthorized ki jrurat h wha pe iska address save ho gya hoga
aur jaise hi req aati h us route pe to isAuthorized ko call lgti h aur isAuthorized ke pass role bhi aata h saath me 
to isAuthorized ek fxn ko return kr deta h aur due to closure property us fxn ke pass bhi role hota h aur fir wo fxn us role ke hisab se execute hota h.

*/

