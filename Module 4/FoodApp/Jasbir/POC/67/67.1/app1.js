// we enhanced security here so focus only on security enhancement code (login user ke andar)

const express = require("express");
let fs = require("fs");
const rateLimit = require("express-rate-limit"); // require express-rate-limit : taki ek hi ip address se agr jyada request aaye to unhe block kiya jaa ske
const hpp = require("hpp");     // require hpp  : to avoid invalid parameters
const helmet = require("helmet"); // require helmet  : to stop packet sniffing
const xss = require("xss-clean");  // require xss-clean : to avoid cross site scripting attacks
const mongoSanitize = require('express-mongo-sanitize');  // require express-mongo-sanitize : to avoid mongodb query injection
const app = express();

// iske use krne se agr kisi ip address se 15*60* 1000 milisecond (yani 15 min) ke andar andar max 100 request maari jaa skti h
// 100 request hote hi uske block kr diya jaayega for 1 hour
app.use(rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message:
        "Too many accounts created from this IP, please try again after an hour"
}))

// humne apni app me jis jis parameter ke liye query ka solution daala hua h 
// agr uske alwa koi aur parameter daale ya fir inhi parameter ko multiple times daale to hmara code fat skta h 
// hmara code na fte isiliye hum hpp use krte h
// extra param na ho bas means jo bhi parameters hum yha denge sirf whi allowed honge query me
app.use(hpp({
    whiteList: [
        'select',
        'page',
        'sort',
        'myquery'
    ]
}))

// to set http headers
app.use(helmet());

app.use(express.json());

// cross site scripting : jb koi javscript ka code enclose krke put krdeta h req wgerha me 
app.use(xss());

// mongodb query sanatize : taki invalid/tricky/repeated long query naa de ske koi
app.use(mongoSanitize());

let content = JSON.parse(fs.readFileSync("./data.json"));
const userRouter = express.Router();
const authRouter = express.Router();

app.use('/user', userRouter);
app.use('/auth', authRouter);
userRouter
    .route('/')
    // localhost/user -> get
    .get(getUsers)
    // localhost/user -> post
    .post(bodyChecker, createUser);

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

    console.log("ispresent", isPresent)
    if (isPresent) {
        next();
    } else {
        res.send("kind send details in body ");
    }
}
function getUsers(req, res) {
    res.json({ message: content });
}

app.listen(8081, function () {
    console.log("server started");
})