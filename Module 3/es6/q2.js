let o1 = { a: 1, b: 2 };

let o2 = { c: 3 };

let o3 = {...o1, ...o2, ...o1, ...o2 };

console.log(o3);

//kyunki ek object ke andar keys unique hoti hai 
//to jab bhi same keys dobara se aayegi 
//to jo latest keys me values hogi wo purani values ko overwrite kar degi