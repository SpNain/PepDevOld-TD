let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];


// Chaining with the help of loop !!!!

let f1KaPendingPromise = fs.promises.readFile(files[0]);  // hum pahle ek file ko read krenge

for(let i=1 ; i<files.length ; i++){  // fir loop laga denge jo start hoga 2nd file se

    f1KaPendingPromise = f1KaPendingPromise.then( function(data){   // ab humne f1KaPendingPromise pe .then lga ke usi me usko assign karwa diya 
        console.log(data+"");                                       // taki f1KaPendingPromise ka address update hota rhe aur usi par .then ki call lagti rhe
        let nextFilePromise = fs.promises.readFile(files[i]);       // humne previous wali file ke scb ke andar next ka promise bnaya
        return nextFilePromise;                                     // aur usi ko return kar diya jise f1KaPendingPromise mai hi next ka Promise assign hota rhe
    })

}

f1KaPendingPromise.then(function(data){  // ye wala .then sbse last me aane wali file ka data consume karne ke liye bnaya hai
    console.log(data+"");
})

// For better understanding refer pdf.