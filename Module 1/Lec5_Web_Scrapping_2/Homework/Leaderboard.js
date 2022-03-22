//This is my code not Sushant
// isme cheerio.load() expects a string krke error aata hai kabhi time lga to remove  - Solution : data ko string me convert krke daal do -> cheerio.load(""+html);
// ye koi leaderboard wgerha nhi bnata bas jo files pahle teamwise folders me pdi hoti thi
// ye code un sb files ko ek saath leadeboard naam ke folder me daal deta hai
// iska matlab kuch kaam ka nhi hai ye code bas kyunki maine khudne likha hai to rkha rkha hai 
// wrna sir wala code bdia hai jo teamwise bhi sort krke deta hai 


const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
// let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";


function getMatchDetails(matchLink){  //allMatches wale file  se iss fxn ko call lgegi //aur jo matchLink us file me prepare karke pass krenge wahi matchLink yaha pe milega
    request(matchLink, function (error, response, data) {  // jaise hi matchLink se data load ho jaayega ye cb fxn ko call lga dega
        processData(data);
    })
}


function processData(html){  // is fxn ke andar matchLink ka loaded data yani us match ki html file pass hogi 
    let myDocument = cheerio.load(html);
   
     let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");
    for(let i=0 ; i<bothInnings.length ; i++){
        let oneInning = myDocument(bothInnings[i]);
        // <div class="Collapsible"></div>
        let teamName = oneInning.find("h5").text();     // yaha se hume pura naam milega
        teamName = teamName.split("INNINGS")[0].trim();   // console se check karke ki kis basis pe hum teamName nikal skte hai us basis pe split kar diya
        console.log(teamName);             // trim = jo chij hume chahiye sirf use nikal k de deta hai
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
                processDetails(batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }
    }
    console.log("############################################");
}

function checkBatsmanFile(batsmanName){
    // "./IPL/Delhi Capitals/Rishabh pant.json"
    let batsmanFilePath = `./Leaderboard/${batsmanName}.json`;
    return fs.existsSync(batsmanFilePath);
}
function updateBatsmanFile(batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanFilePath = `./Leaderboard/${batsmanName}.json`;
    let batsmanFile = JSON.parse(fs.readFileSync(batsmanFilePath));  // hum batsmen ki file ko json se normal obj me convert karte hai taki hum us file ko update kar ske yani nyi inning push kar ske
    let inning = {                                                   //iss uper wale step ki createBatsmanFile wale fxn me isiliye jrurat nhi pdi kyonki waha pe file 1st time create ki thi jo ki ek array thi naki koi json type ki
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes ,
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync( batsmanFilePath , JSON.stringify(batsmanFile) );
}
function createBatsmanFile(batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanFilePath = `./Leaderboard/${batsmanName}.json`; //path bnaya 
    let batsmanFile = [];  //file bnayi array type ki
    let inning = {   // ek inning ka obj create kiya jisme key bnakar diff chije store kra li
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes ,
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);  // inning ke obj ko file me push kar diya
    fs.writeFileSync( batsmanFilePath , JSON.stringify(batsmanFile) );  //jo batsmen ki file hai jo ek array hai jisme obj pde hai. Ab jab tak hum usko stringify nhi kar dete tab tak uski values json me nhi dhikhegi for further check facts folder
}

function processDetails( batsmanName , runs , balls , fours , sixes , strikeRate){
   
        let isBatsmanPresent = checkBatsmanFile(batsmanName); //check ki us batsmen ki file uske team ke folder me pahle se hai ki nhi
        if(isBatsmanPresent){   
            updateBatsmanFile(batsmanName , runs , balls , fours , sixes , strikeRate);
        }
        else{
            createBatsmanFile(batsmanName , runs , balls , fours , sixes , strikeRate);
        }
}


module.exports = getMatchDetails;