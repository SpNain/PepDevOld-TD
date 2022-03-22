const fs = require("fs");

// sync function
// async function \
// promisifed function

let pendingPromise = fs.promises.readFile("./f1.txt" , "utf8");

console.log(pendingPromise);

// promise ka object ke pass do function hote hai then() and catch();


// then function attaches a success callback to the pendingPromise
pendingPromise.then( function(data){
    console.log("Inside scb");
    console.log(pendingPromise);// [#1]
    console.log(data+"");
} );


// catch function attaches a failure callback to the pendingPromise
pendingPromise.catch( function(error){
    console.log("Inside fcb");
    console.log(error);
});

//OVERALL EXECUTION
//Pahle promise bna fs.promise.readfile se
//then ne uske saath scb attach kar diya
//catch ne uske saath fcb ko attach kar diya 
//ab jaise hi state change hui to data aaya ki nhi aaya uske hisab se scb ya fcb ki body chlegi

/*
#1. Hmara pura code chlke khtam ho chuka tha means ki GEC bhi ud gya hoga
to fir humne pendingPromise ko use kaise kr liya ?
iska ans hai closure
jo then aur catch hai wo basically h to functions hi 
to unke lexical scope me GEC ka closure pda hoga.
*/