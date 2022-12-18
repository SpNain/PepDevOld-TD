let a;

console.log(a);

a=10;

console.log(a);

sayHi();


function sayHi(){
    console.log("fun says Hi");
}

/*
Let's talk about global execution context :

jab bhi javascript me koi code run hota hai to uske 2 phases hote hai :

1. Memory allocation phase 
2. Code execution phase 

sbse pahle sb varibles aur functions ko memory allocate hoti hai 
jis variable me kuch assign nhi hai use undefined aur functions ko function ki body allocate ho jaati hai

to agr hum kisi fun ko as a varible declare krte h
aur us function ki body likhne se pahle us function ko call lga dete hai to 
usme error aayega kyunki allocation pahse me use as a variable treat kiya gya hai
to hum uski body ko likhne ke baad hi use bta skte hai tu fuction hai

right way -: calling function after writing fxn body

let fun;

fun(){
    console.log(hey);
}

fun();


wrong way -: calling function before writing fxn body

let fun;

fun();

fun(){
    console.log(hey);
}


*/