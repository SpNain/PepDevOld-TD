let a = [1, 2, 3, 4, 5];

function isEven(x) {
    return x % 2 == 0;
}

let filteredArr = a.filter(isEven);

console.log("Original filter function:");
console.log(a);
console.log(filteredArr);

// --------------------------

// myFilter

function myFilter(arr, f) {
    let ans = [];

    for (let i = 0; i < arr.length; i++) {
        if (f(arr[i])) {
            ans.push(arr[i]);
        }
    }

    return ans;
}

console.log("Created filter function:");
console.log(a);
console.log(myFilter(a, isEven));

/*
Filter fxn :-
it is a method on array
input - ek function as a input pass hoga
jis array pe call liya hai uspe loop chlayega
aur array ke har ek elem ko ek ek krke function me pass karta hai
aur jin jin elem ke liye fxn true return karta hai unko res array me rkhwata rehta hai
aur jin jin elem ke liye fxn false return karta hai unko res array me store nhi krwata
to is hisab se res array me elem kisi condition ke basis pe filter ho jaate hai 
baad me usi res array ko return kar deta hai filter method
filter fxn original array me koi changes nhi karta
*/