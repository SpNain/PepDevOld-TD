let a = [1, 2, 3, 4, 5];

function double(x) {
    return 2 * x;
}

let ansArr = a.map(double); // array pe map ko call kiya hai jisme double fxn pass kiya hua hai

console.log("Original Map function:");
console.log(a);
console.log(ansArr);

// ------------------------

// myMap

function myMap(arr, f) {
    let ans = [];

    for (let i = 0; i < arr.length; i++) {
        ans.push(f(arr[i]));
    }

    return ans;
}

console.log("Created Map function:");
console.log(a);
console.log(myMap(a, double));


/* Map method :-
it is a method on array
input - ek function as a input pass hoga
jis array pe call liya hai uspe loop chlayega
aur array ke har ek elem ko ek ek krke function me pass karta hai
aur jo function return karta hai us result ko ek res array me store karwata rehta hai
jab array ke saare elem process ho jaate hai uske baad res array ko return kar deta hai as a output
agr map method me koi aisa fxn pass kiya jaata hai jo true false return karta hai to map true false ka array return karega
map fxn original array me koi changes nhi karta

map method also passes index of element in the fxn as optional along with element 
e.g. -  function double(x,index) { aur agr ab hum chahe to iss index ko iss fxn me utilize kar skte hai
           return 2 * x;
        }

        let ansArr = a.map(double,);

*/