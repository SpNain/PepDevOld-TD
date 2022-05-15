const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

let leaderboard = [] ;
let countOfRequestSent = 0 ;  //[#1]


function getMatchDetails(matchLink){
    console.log("Sending Request " , countOfRequestSent);
    countOfRequestSent++; // to check ki kab hmare pass pura data aa jaayega print karne k liye

    //Async call
    request(matchLink , function(error , response , data){
        countOfRequestSent--;
        processData(data);
        console.log("callback " , countOfRequestSent);
        if(countOfRequestSent == 0){
            console.table(leaderboard);
        }
    })
}


function processData(html){
    let myDocument = cheerio.load(html);
    let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    for(let i=0 ; i<bothInnings.length ; i++){
        let oneInning = myDocument(bothInnings[i]);
        // <div class="Collapsible"></div>
        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        // console.log(teamName);
        let allTrs = oneInning.find(".table.batsman tbody tr");
        for(let j=0 ; j<allTrs.length-1 ; j++){
            let allTds = myDocument(allTrs[j]).find("td");
            if(allTds.length > 1){
                // batsmanName allTds[0]
                let batsmanName = myDocument(allTds[0]).text().trim();
                // runs allTds[2]
                let runs = myDocument(allTds[2]).text().trim();
                // balls
                let balls = myDocument(allTds[3]).text().trim();
                // fours allTds[5]
                let fours = myDocument(allTds[5]).text().trim();
                // sixes allTds[6]
                let sixes = myDocument(allTds[6]).text().trim();
                // sr allTds[7]
                let strikeRate = myDocument(allTds[7]).text().trim();
                // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} StrikeRate = ${strikeRate}`);
                // processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
                processLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes);// leaderboard ke liye alag se function create kar liya
            }
        }
    }
    // console.log("############################################");
}
function processLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes ){
    runs = Number(runs); // Number => ye string ki value ko numbers me convert kar deta hi
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    for(let i=0;i<leaderboard.length ; i++){
        let batsmanObject = leaderboard[i];// isse ek ek karke leaderboard ki har ek entry pe jaayega

        if(batsmanObject.Team == teamName && batsmanObject.Batsman == batsmanName){//aur jaake check krega ki kahi jo batsman abhi aaya hai iss batsman ka object yani ye batsman pahle se exist to nhi karta 
            batsmanObject.Runs = batsmanObject.Runs + runs;
            batsmanObject.Balls += balls;
            batsmanObject.Fours += fours;
            batsmanObject.Sixes += sixes;
            return;  // iski wajah se niche ki lines nhi chlegi
        }
    }

    // agr batsman exist nhi karta hoga to leaderboard ki length 0 hogi
    // aur hum for loop me nhi ghusenge aur sidha ye code chlega
    // aur jab leaderboard ki length hogi to wo batman ki checking krega 
    // aur agr batsman mil gya to wahi to return kr jaayenge aur agr nhi mila to fir us batsman ke liye bhi obj bnega
    let batsmanObject = { 
        Team : teamName ,
        Batsman : batsmanName ,
        Runs : runs ,
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes
    }
    leaderboard.push(batsmanObject);
}


module.exports = getMatchDetails;



/*
#1. Hume ye countOfRequestSent wale variable ki bhsad kyu machai?

Dekho humne leaderboard ka array bna to liya usme data daalne ke liye code bhi likh diye 
lekin hume ab us leaderboard ko console bhi to krwana hai
lekin isme problem ye thi ki hume pta kaise chlega ki leaderboard full ho chuka means ki saare matches ka data aake process ho chuka hai
to iske liye humne countOfRequestSent naam ka variable bnaya 
aur jaise hi getMatchDetails ko call lgti hai hum is variable ko increase kr dete hai 
aur jab request joki ek async fxn hai uske pass data aa jaata hai aur wo fir apne callback fxn ko call lgata hai 
tab hume countOfRequestSent variable ko decrease kr diya
ab hoga ye ki jaise hi getMatchDetails ko call lgti jaayegi countOfRequestSent increase hota jaayega 
aur jaise hi data ana suru hoga countOfRequestSent decrease hota jaayega
to jab countOfRequestSent 0 ho jaayega tab hume pta chal jaayega ki saara data aa chuka hai aur ab hum leaderboard ko console krwa skte hai
*/