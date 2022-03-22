  
// multiple files
// async code
//  F1kaData => F2KaData => F3KaData

const fs = require("fs");


console.log("start");

// yha pe kyunki humne ek ke andar dusri file k read fxn ko daal rkha hai to jo nesting me sbse se pahle hoga pahle execute hoga. So, nesting ke acc. order follow hoga
fs.readFile("./f1.txt" , function(err , data){
    console.log(data+"");
    fs.readFile("./f2.txt" , function(err , data){
        console.log(data+"");
        fs.readFile("./f3.txt" , function(err , data){
            console.log(data+"");
        })
    })
})






console.log("end");