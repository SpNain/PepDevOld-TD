// async => it can be used before a function name !!
// await => it can only be used inside a async function !!
/*
IIFE => Immediately Invoked Function Expressions !!
        IIFE fxns ko call lgane ki jrurat nhi pdti unhe apne aap call lag jaati hai 
    (function(){
                 <- it is a IIFE fxn skaleton
    });
*/

const fs = require("fs");

console.log("start");

async function callMe() {
  try {
    console.log("Hello World !!");
    console.log("I am inside async function !!");
    let f1KaPP = fs.promises.readFile("./f1.txt", "utf8");
    let f2KaPP = fs.promises.readFile("./f2.txt", "utf8");
    let bothFilesData = await Promise.all([f1KaPP, f2KaPP]);   // Promise.all me daalke humne combined pe await lga diya
    console.log(bothFilesData);
  } catch (error) {          // agr koi bhi ek await fail ho jata hai to hum sidha catch ke block me aayenge
      console.log(error);
  }
}
callMe();

console.log("end");


//Async fxn ke andar jab tak koi async kaam nhi hota tab tak wo sync ke jaise hi chalte hai

// Dekho promises me kya hota tha
// 1.hum ek promise bnate the 
// 2.aur next wale ko uspe dependent bnane ke liye return lagate the 
// 3.fir wo data next ke then ke scb me jata tha 
// 4.aur scb execute hota tha
// to await ne in sab steps ko summarize kar diya 
// ye kya karta hai ki internally promise pe then lga deta hai 
// matlab ki agr humne kisi promise ke aage await lga diya to jaise hi us promise ki state change hogi 
// us data ko jis variable me assign karwana tha usme assign karwa dega 
// aur next wali lines tab tak execute nhi hogi jab tak ye wali line chal nhi jaati jisse ek dependency create ho gyi

/*
Notes : 1. await hmesha pending promises pe hi lgta hai
        2. await sirf then ki call lgata hai isiliye await wale codes ko try catch me likha jaata hai 
           agr koi bhi ek await fail ho jata hai to hum sidha catch ke block me aayenge
*/