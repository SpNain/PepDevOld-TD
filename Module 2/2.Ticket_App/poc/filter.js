let values = [2,3,4,5,6,7,8,9];

let evenValues = values.filter( function(value){
    if(value%2 == 0){
        return true;
    }
    return false;
})
console.log(evenValues);

/*
filter fxn ek prakar se values ko filter karne ke kaam aata hai 
agr to isko true milta hai to usko to rehne deta hai aur jisse false mitla hai usko filter kar deta hai yani hta deta hai

Note : ye filter wala kaam simple loop se bhi ho skta hai
*/