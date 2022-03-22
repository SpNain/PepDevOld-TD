//Agar hmare pass n no. of files ho matlab we don't know ki kitni files hai

let files = ["../f1.txt", "../f2.txt", "../f3.txt"];// jha pe files hai un sbko ek variable me daal lo in the form of array
const fs = require("fs");
// async code
// simultaneous process
console.log("start");

for(let i=0 ; i<files.length ; i++){   // fir uspe loop maardo 
    fs.readFile(files[i] , function(err , data){
        console.log(data+"");
    })
}

console.log("end");

console.log("end");