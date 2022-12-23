// let obj = require("./b.js");  //ye hume pura module.export ka object laake de dega
                                 // means ki b.js me module.export ke object me jo bhi pda hoga wo hume is obj variable me milega

// object destructuring - agr hume pura obj nhi chahiye ho usme se sirf koi ek specific key ki value chahiye hoto hum object destructing ka use krte hai.
// let { name } = require("./b.js");   // ye hume pure module.export k obj me se name naam ki key ki value laake de dega jise hum `name` naam ka variable me catch kr lenge

// by default module.export a empty object hota hai lekin humne b.js me line no. 16 me use ek string me convert kr diya hai
// to ab hume usko idhar ek string variable me hi catch krna pdega
let name = require("./b.js");  // here name is a string type of variable.

console.log(name);