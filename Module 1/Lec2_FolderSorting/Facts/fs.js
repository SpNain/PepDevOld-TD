// Require : isse hum node.js ke diff modules ko mangwa skte hai 
//           jaise app download to kr liya lekin use ram me laane ke liye open krte hai 
//           waise hi kahi bhi koi npm ka package use krna ho to download krke require kr lete hai us file me

// fs => file System
const fs = require("fs"); // ye fs ka module node.js ke pass hai aur humne wha se mangwake hmare variable fs me store krwa liya
                          // aur us variable ko const bnaya taki wo pure code me kabhi change na ho
// console.log(fs);

// utf-8 => format for plain text !!

let f1KaData = fs.readFileSync("./f1.txt");
console.log(f1KaData + ""); //stringify data


fs.writeFileSync("index.html" , "Hello world !!!");
fs.writeFileSync("../activity/activity.js" , "akjsbfkjabsf");