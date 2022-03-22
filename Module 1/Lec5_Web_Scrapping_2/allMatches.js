const request = require("request");
const cheerio = require("cheerio");
const getMatchDetails = require("./match");
// const allMatchesLink = require("./homepage");  //#



function getAllMatches(allMatchesLink){  // yaha pe isko allMatchLink joki Homepage se mila hai pass hoga
    request(allMatchesLink , function(err , res , data){  // ye hof hai to jaisehi isko data mila ye processData ko call laga dega
       processData(data);
    })
}


function processData(html){  //
    let myDocument = cheerio.load(html);
    let allATags = myDocument('a[data-hover="Scorecard"]');  // selectors using values // jitne bhi matches us homepage pe the unke scorecard ke anker link aage
    console.log(allATags.length);
    //    { "0" : {aTag} , ......... "59" : {aTag} };
    for(let i=0 ; i<allATags.length ; i++){
        let matchLink =  "https://www.espncricinfo.com" + myDocument(allATags[i]).attr("href");  // yha se hume ek ek krke saare matches ke scorecard ke link milte jaayenge 
        // console.log(matchLink);           
        getMatchDetails(matchLink);                                                               // jise hum yha ek ek krke pass krte jaayenge.
    }   
}



module.exports = getAllMatches;