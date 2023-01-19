
let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const request = require("request");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches");  // why we export getAllMatches here : Refer Logic/pdf or Notes. 


// let allMatchesLink;  //#
request(matchLink , function(err , res , data){  
    processData(data);
})


function processData(html){
    let myDocument = cheerio.load(html);
    let aTag = myDocument(".widget-items.cta-link a");
    // console.log(aTag);

    // 1st option : hume aTag ko console kra ke apna needed element dekh liya kaha hai aur use dot aur bracket notations ka use krke get kr liye 
    let allMatchesLink = "https://www.espncricinfo.com" + aTag["0"].attribs.href;  
    
    // 2nd option : we can use cheerio fxn. attr is a fxn of cheerio through which we can get any attribute of a object. If multiple similar attributes are there it will give first only.
    // let allMatchesLink = "https://www.espncricinfo.com" + aTag.attr("href");
    
    // console.log(allMatchesLink);
    
    getAllMatches(allMatchesLink);  // ye allMatches wali file me getAllMatches ko call lgayega 
}

// module.exports= allMatchesLink;   //#

//#  -> ye sirf samjhane ke liye likha hai ki humne aisa kyu nhi kiya 
// -> agr hum in lines ka use karte to allMatchLink me hume undefined value milti 
// -> kyonki jab hum allMatches wali files se "let allMatchLink;" ko call lgate to us time tak allMatchLink me koi value nhi aayi thi
// -> kyonki tab tak data load hi nhi hua tha 
