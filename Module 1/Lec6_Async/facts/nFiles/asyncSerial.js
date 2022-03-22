let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];
const fs = require("fs");

// F1ka data => f2kaData => f3Kadata
// async code

// not possible with while loop , do while , for loop , for each

// try recursive solution ?

// Sp Nain Impletation - 1st revision : Sir ne nhi krwaya tha ye
function f(files, idx) {
    if (idx == files.length) {
        return;
    }
    fs.readFile(files[idx] , function(err , data){
        console.log(data + "");
        f(files, idx + 1);
    })

}

f(files, 0)

