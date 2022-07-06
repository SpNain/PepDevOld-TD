function fn1(x, y) {
  console.log("Some process");
  return x + y;
}

let fa1 = (x, y) => {
  console.log("Some process");
  return x + y;
};

// -----------------------------------

function fn2(x) {
  console.log("Some process");
  return 2 * x;
}

let fa2 = x => {
  console.log("Some process");
  return 2 * x;
};

// -----------------------------------

function fn3(x) {
  return 3 * x;
}

fn3()

let fa3 = x => 3 * x;

fa3()

// -----------------------------------

function fn4() {
  return 4;
}

fn4()

let fa4 = () => 4;

fn4()

// -----------------------------------


/*
Edge of arrow fxns over normal fxns:-

    1. Syntax short ho jaata hai 
    2. "this" ko manage nhi karna pdta - this ke baare me backend me pdenge


agr ek hi argument hai to paranthesis ki jrurat nhi hai arrow fxn me
agr 0 ya 2 ya 2 se jayada argument hai to paranthesis lgane pdenge
agr fxn ke andar sirf ek hi line hai joki return line hai to hum usko sidha likh skte h bina curly braces aur return keyword ke
*/