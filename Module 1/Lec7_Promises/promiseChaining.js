// Promises Chaining => To avoid promise hell !

// Initial State is Pending 
// Either the Pending Promise can be resolved or rejected 
// if Pending Promise is Resolved => success callback is invoked
// if Pending Promise is Rejected => failure callback is invoked

// scb can be attached to pending promise using then function
// fcb can be attached to pending promises using catch function

// then and catch can only be called on pending promises


const fs = require("fs");

let f1KaPromise = fs.promises.readFile("./f1.txt");  //f1KaPromise bnega with initial state pending

// then() and catch() functions are async functions !
// then and catch also returns a pending promise also known as thenKaPromise
//aur us thenKapromise pe bhi hum then/catch lga skte hai

f1KaPromise.then(function(f1KaData){ // f1KaPromise pe then ne scb1 attach kar diya jo state change hote hi chlega
    console.log(f1KaData+"");
    let f2KaPromise = fs.promises.readFile("./f2.txt");//f2KaPromise bnega with initial state pending
    return f2KaPromise; // [#1] 
})
 .then(function (f2KaData) {
    console.log(f2KaData+"");
    let f3KaPromise = fs.promises.readFile("./f3.txt");//f3KaPromise bnega with initial state pending
    return f3KaPromise;
})
.then(function(f3KaData){
    console.log(f3KaData+"");
})


/*
#1.
ye returned value scb1 ki jagah chali jaayegi aur kyonki next then ka promise iss scb1 ko point kar rha tha 
ab wo f2KaPromise ko point karne lag jaayega.To indirectly next ka scb yani scb2 current wale scb yani scb1 pe dependent ho gya
aur jaise hi f2KaPromise ki state change hogi wo apni state next thenKePromise ko transfer kar dega 
aur wo thenKePromise ko state change hoke data aaya ki nhi usi hisab se scb/fcb ko call lga dega   
*/

/*
In depth me to maine explain kar diya hai 
ab mota moti smajh lete hai
to baat ye hai ki jab hum return keyword lagate hai to next scb previous scb pe depend ho jaata hai
aur agr return keyword mhi lgate to dono scb independent rehte hai
ab independent ka matlab ye nhi hai ki wo dono kisi bhi order me execute hoge 
iska matlab hai ki first wale scb ke pass jo bhi data aaya hai usse scb2 ko koi lena dena nhi hai 
*/



// UnderStanding Stage : 1

// let thenKaPromise = f1KaPromise.then(function(data){
//     console.log(data+"");
//     console.log(f1KaPromise);
//     return 5;  // agr hum koi value return nhi karte to thenKaPromise ki state undefined hogi lekin agr hum koi value return karte hai to uski state me wo value/data aa jaayega
// })
// thenKaPromise.then(function(returnValueOfScb1){ //jo value pichle wale ke promise se mili hai wo hume scb2 me get hogi
//     console.log(returnValueOfScb1);
//     console.log(thenKaPromise);
//     console.log("i ran after first scb !!");
// })



