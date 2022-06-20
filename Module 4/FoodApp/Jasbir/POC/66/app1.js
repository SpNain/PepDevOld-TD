// 66 me jo changes kiye h wo jasbir ne iss repo me nhi kiye 
// usne alag se hi ek alag reop bnali thi jisme usne changes kiye the 
// to jo bhi changes 66 me hue h wo iss repo me nhi milenge
// mai kr skta tha lekin maine bhi repo ko waise ka waise hi rehne diya jaisa h 
// in sb changes ko mai dev-sp me kr dunga

// heroku physical -> multiple server run
// heroku apne aap se port set krta h (joki mostly 80 ya 443 hote h)
// to taki hmara app use port par listen kr paaye isiliye hum `process.env.PORT` line use krte h
// aur jb hum apna code locally run kr rhe honge to us time pe hume `process.env.PORT` se to port milega nhi 
// isiliye hume or krke 8081 bhi define kr rkha h jispe humara app tb listen krega jab hum use locally run krenge
app.listen(process.env.PORT||8081, function () {
    console.log("server started");
})

// 404 page
app.use(function (req, res) {
    // agr page nhi milta to filhaal hum file bhejne ki bjaye msg bhej rhe h bas
    res.status(404).json({
        message: "page Not found"
    })
})