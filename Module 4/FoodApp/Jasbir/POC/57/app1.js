// dekho isme samjhne ke liye to bhut kuch hai lekin kyunki ye revision class hai 
// to jo abhishek goel se alag/jyada smjhaya gya hai mai wahi smjhaunga 

// what express.json() do
// humne 2 baar post ki request maari hai
// ek baar before using express.json() and ek baar after using express.json()
// before wale me data nhi milega aur after wale me milega 
// kyunki express.json() hmari req ki body me wo data jo humne bheja hai add krwa deta hai
// express json -> req.body -> add sent data  
app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("before", body);
    next(); // isse next wala fxn call hoga jo hai app.use()
})
// inbuilt menthods of express has next already implemented
app.use(express.json()); // app.use is a middleware jiska agr use hoga to use kr liya jaayega
app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("before", body);
    next();
})

// nouns ke hmesha routes hote hai like for user,plans,reviews
// but auth is not a noun but hum ise bhi apna alag route dete hai 
// Server: // route  -> request -> response/file 
// File system// path -> interact/type -> file /folder

// ------------------------------------------------------------------------- //

// ye fxn dekhta hai ki req me data aaya bhi h ki nhi 
// agr data nhi aaya hoga to next ko call nhi lgegi
function bodyChecker(req, res, next) {
    console.log("reached body checker");
    let isPresent = Object.keys(req.body).length;
    
    console.log("ispresent",isPresent)
    if (isPresent) {
        next();
    } else {
        res.send("kind send details in body ");
    }
}
// ------------------------------------------------------------------------- //

// how next() actually works 

// method 1 to implement next()

// localhost/user -> post
userRouter.route('/')
    .post(bodyChecker, isAuthenticated, isAuthorized, createUser);

// method 2 to implement next()

app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("inside first post", body);
    next();
})
app.get("/", function (req, res) {
    let body = req.body;
    console.log("inside first get", body);
})
app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("inside second post ", body);
    res.send("tested next");
})

// its o/p will be 
// inside first post
// inside second post

app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("inside first post", body);
    next();
})
app.use(function (req, res, next) {
   console.log("inside app.use",)
    next(); // yha explicitly next() likha kyunki ye express ka inbuilt fxn nhi hai (to clear confusion - wha next() express.json() me likha hua tha naki app.use() me)
})
app.get("/", function (req, res) {
    let body = req.body;
    console.log("inside first get", body);

})
app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("inside second post ", body);
    res.send("tested next");
})

// its o/p will be 
// inside first post
// inside app.use
// inside second post

// to isse pta chlta hi ki kisi fxn me next likhne se wo usi type ki req ke next fxn ko call krta hai 
// aur agr bich me koi alag req ho use skip kr deta hai lekin agr bich me req ke alawa koi aur middleware fxn ho 
// wo middleware wala fxn run hota hai naki same type ki req wale ka fxn


// ======================================================================== //

const express = require("express");
let fs = require("fs");

// server init
const app = express();

app.listen(8081, function () {
    console.log("server started");
})

app.get("/", function (req, res){
    console.log("hello from home page")
    res.send("<h1>Hello from Backend</h1>");
})
app.get("/user", function (req, res){
    console.log("users")
   // for sending key value pair
    res.json(obj);
})
app.put()
app.update()
app.delete()

app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("before", body);
    next(); // isse next wala fxn call hoga jo hai app.use()
})
// inbuilt menthods of express has next already implemented
app.use(express.json()); // app.use is a middleware jiska agr use hoga to use kr liya jaayega
app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("before", body);
    next();
})

// read data storage
let content = JSON.parse(fs.readFileSync("./data.json"));

const userRouter = express.Router();
const authRouter = express.Router();
// localhost / auth / 10-> patch
app.use('/user', userRouter);
app.use('/auth', authRouter);
userRouter
    .route('/')
    // localhost/user -> get
    .get(getUsers)
    // localhost/user -> post
    .post(bodyChecker, createUser);

userRouter
    .route("/:id")
    // localhost/user/10-> post
    .get(getUser)

authRouter.route("/").post(signupUser)

authRouter.route("/:id").patch(forgetPassword)

function createUser(req, res) {
    console.log("create users");
    
    let body = req.body;
    console.log("req.body", req.body);
    content.push(body);
    // put data storage 
    fs.writeFileSync("./data.json", JSON.stringify(content));
    res.json({ message: content });
}

function bodyChecker(req, res, next) {
    console.log("reached body checker");
    let isPresent = Object.keys(req.body).length;
    
    console.log("ispresent",isPresent)
    if (isPresent) {
        next();
    } else {
        res.send("kind send details in body ");
    }
}

function getUsers(req, res) {
    res.json({ message: content });
}

// how next() actually works 

// method 1 to implement next()

// localhost/user -> post
userRouter.route('/')
    .post(bodyChecker, isAuthenticated, isAuthorized, createUser);

// method 2 to implement next()

app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("inside first post", body);
    next();
})
app.use(function (req, res, next) {
   console.log("inside app.use",)
    next(); 
})
app.get("/", function (req, res) {
    let body = req.body;
    console.log("inside first get", body);

})
app.post("/", function (req, res, next) {
    let body = req.body;
    console.log("inside second post ", body);
    res.send("tested next");
})
