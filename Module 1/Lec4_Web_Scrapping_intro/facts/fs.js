// In DEV_PP11 folder
// npm init -y : for package-lock.json file 
// npm install cheerio

const fs = require("fs");
const cheerio = require("cheerio");  // basically html file ke data ko scrap krne k kaam aata ye


let htmlKaData = fs.readFileSync("./index.html" , "utf8");
// console.log(htmlKaData); // we have stringified html file !!!

// html file is loaded in cheerio
let myDocument = cheerio.load(htmlKaData);  // loaded data assigned in myDocument

// document.querySelector("h1");

// console.log(myDocument);

// cheerio hume object ki form me data deta hai 
 // .text() : ye cheerio ka fxn hai. For more : refer pdf.
// let h1KaData = myDocument("h1").text();  // we stringify the data using .text()
// console.log(h1Element); element => cheerio => object form me data means ki h1 ka data to hume mil jaayega lekin wo data object ki form me hoga 
// console.log(h1KaData);

let PTag = myDocument("p");
let secondPTag = myDocument("p")["1"];  //jab ek se jyada element present hoto hum obj me se index daalkar jo data chahiye hota hai use nikal lete hai 
// console.log(secondPTag.text());// ye nhi chalega kyonki cheerio ke fxn sirf direct wale obj pe hi laagu hote hai

// console.log(myDocument(secondPTag).text());// isiliye hum us small obj ko bde wale obj me pass kar dete hai jisse ki uspe bhi fxn laagu ho ske

// Selectors
// console.log( myDocument("ul p").text() ); // it will give all the p tags inside ul

// a tag
// console.log(myDocument("a").text());
// you will get all a tags inside li
// console.log(myDocument("ul li a").text());

// only direct child !!
// console.log(myDocument("ul>a").text());


// classes and ids
// dot
// console.log( myDocument(".inside").text() );
// console.log( myDocument(".inside.main").text()  );


// // ids =>
// // #
// console.log( myDocument("#main-heading").text() );

// console.log(PTag);
// console.log("*********************");
// console.log(secondPTag);
// console.log("*********************");
// console.log(myDocument(secondPTag));