// let => block scoped variable
// const => block scoped variable

// console.log(a);  //kyonki abhi tak humne "a" declare nhi kiya tha to accessible nhi hai aur memory allocation phase me ise undefined de diya gya tha to isiliye undefined aaya
// var a = "Steve";
// console.log(a);


// Hoisting => mechanism of accessing the variable before the initialization !

// let const me hoisting hoti hai ??
// console.log(a);
// let a = "Steve";
// console.log(a);

// console.log(a);


// undefined : means ki variable define to hai(kyunki memory allocation ke time use kahi na kahi jgah to mili hi hogi) lekin abhi tk usme kuch assign nhi hua hai 
// ye var ke case me hi dhikhega
console.log(a);
var a = "Steve";
console.log(a);

// not defined : means ki us variable ko define hi nhi kr rkha hai kahi par bhi (means memory allocation ke time use kahi bhi jgah nhi mili hai kyunki wo exist hi nhi krta)
console.log(c);

// cannot access a before initialization
// ye let aur const ke case me dhikhega
console.log(b);
let b = "Steve";
console.log(b);


// this is also hoisting 
var d;
console.log(d);

let e;
console.log(e);