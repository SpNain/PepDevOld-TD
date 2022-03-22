// let is block scoped
// const is block scoped

/* var => function scope
var ek Function scope hai : matlab ki agr koi variable function ke andar defined hai to wo ek alag variable hai
                            aur jo variable with same name function ke bahar defined hai ek alag global variable hai 
                            means ki agr function ko chhodke us variable me kahi bhi change hoga to wo variable change ho jaayega
                            lekin agr usi naam ka variable kisi fxn me defined hai aur usme kuch change hota hai to uska scope fxn tak hi limit rhega
                            aur bahar wala variable affect nhi hoga
*/

/*
Note : 
1.var ke case me agr hum same naam ka variable dobara se bna dete hai to us variable ki value nyi value bn jaati hai
  jaise humne line no. 19 me kra hai usme hume dobara se a define krke value change kardi ab a ki value 30 hai naki 20.

2. kyunki var function scope hota hai isiliye agr hum kisi fxn me koi variable jo bahar defined hai 
   use alag se function me defined kiye bina console krwayenge to undefined aayega 
   kyunki var ke case me wo sirf apne function me hi check krega
   aur var me jo hoisting hoti usme hum variable ko initializtion se pahle access kr skte hai

*/

// var a = 20;

// var a = 30;

// console.log(a);

// if(true){
//     var a = 50;
//     console.log(a);
// }

// function callMe(){
//     console.log(a);// yaha pe undefined isiliye aaya kyonki ye pahle apne fxn ki body ke andar check krega ki koi iss name ka variable to nhi ban rkha agr hoga to kyonki usko access nhi kar sakta to undefined de dega
//     var a = 100;
//     console.log("Inside call me");
//     console.log(a);
// }

// callMe();

// console.log(a);


/*
Note :
1.let ke case me agr hum same naam ka variable dobara se bna dete hai to run krte time error aata hai 
  ki ye variable pahle se declared hai

2. kyunki let block scope hota hai isiliye agr hum kisi block(if else or any fxn etc.) me koi variable jo bahar defined hai 
   use alag se function me defined kiye bina console krwayenge to error aayega 
   ki can't access this variable before initialization
   kyunki wo sirf apne block me check krega
   aur let me jo hoisting hoti usme hum variable ko initializtion se pahle access nhi kr skte 
   kyunki wo temporal dead zone me hote hai

   ab hume block scope ka pta hai ki agr unhe apne block me variable nhi milta to wo us variable ko bahat search krte hai
   to agr humne function callMe me alag se "a" define nhi kiya hota to ye code chl jaata


*/

let a = 20;

// let a = 30;

console.log(a);

if(true){
    let a = 50;
    console.log(a);
}

function callMe(){
    
    console.log("Inside call me");
    console.log(a);  // this will throw a error due to point no. 2
    let a = 100;   // if this line isn't there this code will run smoothly without any error
    console.log(a);
}

callMe();

console.log(a);