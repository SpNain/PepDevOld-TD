// parallely read contents of f1 f2 and f3 using promisified function
const fs = require("fs");

let f1KaPromise = fs.promises.readFile("./f1.txt");//FOCL:1. isse ek f1KaPromise bnega jiski state initially pending hogi
f1KaPromise.then(function(data){ // FOCL:4 ->1 2 3 inke chalne ke baad kisi bhi then ka scb chal skta hai. Jiske pass data pahle aa jaayega wo pahle execute ho jaayega
    console.log(data+"");
});

let f2KaPromise = fs.promises.readFile("./f2.txt");//FOCL:2. isse ek f2KaPromise bnega jiski state initially pending hogi
f2KaPromise.then(function(data){  //FOCL:4
    console.log(data+"");
});

let f3KaPromise = fs.promises.readFile("./f3.txt");//FOCL:3. isse ek f3KaPromise bnega jiski state initially pending hogi
f3KaPromise.then(function(data){  //FOCL:4
    console.log(data+"");
});


//then and catch are async fxn kyonki wo promise pe scb aur fcb attach to tabhi kar dete hai lekin chalte tabhi hai jab promise ki state pending se change hoti hai 
//agr to state change hoke data aa jaata hai to then ne jo ek callback fxn(let say scb) attach kiya tha wo execute hoga
//agr to state change hoke data nhi aata hai to catch ko ne jo ek callback fxn(let say fcb) attach kiya tha wo execute hoga

//Note=> then aur catch fxn async fxns hai lekin usme passed scb aur fcb sync fxns hai (Condition applied ki humne unme koi async kaam na kra ho).

