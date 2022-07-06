let a = [1, 2, 3];

function sum(a, b) {
    return a + b;
}

let reducedValue = a.reduce(sum);

console.log(a);
console.log(reducedValue); // 1+2+3 = 6

// ------------------------

// myReduce

function myReduce(arr, f) {
    // f= sum
    //arr = [1,2,3]

    let ans = arr[0]; // 1

    for (let i = 1; i < arr.length; i++) { // start from 1 b/c one elem is already process 
        ans = f(ans, arr[i]); // ans ko hi as fisrt arugment send kar de rhe hai 
    } // aur baad me jo res fxn return kar rha hai use hi ans me store kra de rhe hai. Jis se fxn me jo bhi operation ho rha hai wo sbhi elem pe liye lag jaa rha hai

    return ans;
}

/*
Reduce fxn :-
it is a method on array
input - ek function as a input pass hoga
aur jo fxn pass kiya hai wo 2 argument lega opertion krne ke liye
jo bhi fxn me operation hota hai reduce fxn us operation ko array ke sbhi elem pe chlake uska res ek single var me store kar leta hai
aur saare elem process hone ke baad us var ko return kar deta hai
reduce fxn original array me koi changes nhi karta
*/