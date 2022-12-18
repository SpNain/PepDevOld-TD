// function body / function statement

function fun(){
    console.log("fun says Hi !!!!");
}

// function call / invoke
// fun();

// In js , a function acts like a variable

// This is function expression
let sayHi = function(){
    console.log("sayHI function says Hi");
}


function callback(){
    console.log("I am passed as a argument");
    return 5;
}

// In js we can pass a function inside the parameters of another function because in js a function also can act like a variable.
function highOrderFunction( cb ){
    let value = cb(); // call cb
    console.log(value);
}


highOrderFunction( callback );

//Conclusion
// High Order Function => Function which accepts functions as a argument !!
// CallBack Function => Function which are passed as a argument in a function !!