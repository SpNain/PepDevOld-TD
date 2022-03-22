// multiple files
// async code
// simulatenously read all the files and get data !!
const fs = require("fs");

console.log("start");

// ye jo teen files hai wo simultaneously read hogi to as a result kisi bhi file ka data kabhi bhi print ho skta hai koi strict order follow nhi hoga
fs.readFile("./f1.txt" , function(err , data){
    console.log(data+"");
})

fs.readFile("./f2.txt" , function(err , data){
    console.log(data+"");
})

fs.readFile("./f3.txt" , function(err , data){
    console.log(data+"");
})


console.log("end");