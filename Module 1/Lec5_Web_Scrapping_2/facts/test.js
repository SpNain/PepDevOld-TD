let fs = require("fs");

let obj = [{
    "Runs" : "10" ,
    "Balls" : "2"
}]

// fs.writeFileSync("./a.json" , obj+"");

/*
uper wali line chalne se aisa result aayega -> result =>[object Object]  
jo uper wala obj hai wo abhi tak js ka ek simple obj hai jispe hum kuch operations perform nhi kr skte 
to uske liye ab hume is obj ko json ka obj bnana pdega 
isiliye hume JSON.stringify use karke js ke obj ko json ka obj bna diya aur us json ke obj ko stringify bhi kr diya
*/

// let jsonObj = JSON.stringify(obj)
// fs.writeFileSync("./a.json" , jsonObj);   // ab kyunki humne obj ko stringify kr diya tha to ab result will be something like this : [{"Runs":"10","Balls":"2"}]

// let JsonKaobj =fs.readFileSync("./a.json");
// console.log(JsonKaobj+"");

/*
kyunki json obj stringify kr diya tha to ab hume ouptut bhi string ki form me hi dhikhega 
to uper wala code will give result something like this : result => [{"Runs":"10","Balls":"2"}] lekin ye ek string hai bas naki koi obj
*/

// let obj = JSON.parse(fs.readFileSync("./a.json"));
// console.log(obj);

/*json ke obj ko wapas se apne wale obj me convert karna chahte h to hume JSON.parse use karna pdega 
*/
