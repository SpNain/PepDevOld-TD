let matchLink = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-royal-challengers-bangalore-55th-match-1216505/full-scorecard";

const request = require("request"); // request is a high order function. isko jo page diya jaata hai uski html laaker de deta hai
const fs = require("fs");
const cheerio = require("cheerio");


request( matchLink , cb );  // jaise hi html file load ho jaayegi ye cb ko call kar dega // ye request variable name hai naki node module name

function cb(error , response , data){  //call hote hi ye data fetch kar lega 
    // console.log("got the data !!!");
    // console.log(data);
    // fs.writeFileSync("./match.html" , data);  // 1.just in case you want to see loaded html file // ye data string me aata h 
    getHighestWicketTaker(data);  
}

// let htmlKaData = fs.readFileSync("./match.html" , "utf8");  //2.just in case you want to see loaded html file


function getHighestWicketTaker(data){ // jo data cb me aaya hoga usko idhar pass kar denge
    let myDocument = cheerio.load(data);
    let bothBowlingTables = myDocument(".table.bowler");  //data me se table aur bowler class wala data aa jaayega // lekin ye as a obj store hoga bt me to agr fs.write use karna h to (bt+"") stringyfy karlo isko pahle.
    // {
    //     "0" : {bowling table} ,
    //     "1" : {bowling table}
    // }
    let highestWicketTakenName;
    let highestWicketsTaken;
    let economyOfHighestWicketTaker;
    
    for(let i=0 ; i<bothBowlingTables.length ; i++){  // jo table aayi hai use ek ek karke fetch karenge 
        let bowlingTable = myDocument(bothBowlingTables[i]);  // bothBowlingTable ko myDocument me pass kar diya taki cheerio k fxn use kar ske // matlab bothBowlingTable ke andar jo 2 bowling talbes pdi h wo ek ek krke pass hogi myDocument me
        let allTableRows = bowlingTable.find("tbody tr");  // tbody k andar tr ka data leke aa jaayega => indirectly no. of rows milegi, pahle 1st bowling talbe ki fir 2nd bowling table ki
        // {
        //     "0" : {tr},
        //     "1" : {tr},
        //     "2" : {tr}
        // }
        for(let j=0 ; j<allTableRows.length ; j++){  // rows pe loop lga diya
             // wicket "4"
            // name "0"
            // economy "5"
            let allTds = myDocument(allTableRows[j]).find("td");  // rows k andar ka data milega
            // {  0 : {} , 1: {} , 2: {}  ,3:{}  }
            if(i==0 && j==0){   // start me 1st data default daal denge
                highestWicketTakenName = myDocument(allTds[0]).find("a").text();
                highestWicketsTaken = myDocument(allTds[4]).text();
                economyOfHighestWicketTaker = myDocument(allTds[5]).text();
            }
            else{
                let currentWickets = myDocument(allTds[4]).text();
                let currentEconomy = myDocument(allTds[5]).text();
                if(currentWickets > highestWicketsTaken  || (currentWickets == highestWicketsTaken && currentEconomy < economyOfHighestWicketTaker)){
                    // update if current bowler have high wickets !!  // if wickets are same then judge on the basis of economy
                    highestWicketTakenName = myDocument(allTds[0]).find("a").text();
                    highestWicketsTaken = currentWickets;
                    economyOfHighestWicketTaker = currentEconomy;
                }
            }
        }
    
    }
    
    
    console.log("Name Of Highest Wicket Taker = " + highestWicketTakenName);
    console.log("Wickets Taken = " + highestWicketsTaken)
    console.log("Economy = " + economyOfHighestWicketTaker)
}