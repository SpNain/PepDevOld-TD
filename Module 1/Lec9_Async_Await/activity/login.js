const puppeteer = require("puppeteer");
const id = "misid46226@isecv.com";
const pw = "123456789";
let challenges = require("./challenges");

async function login(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        // slowMo : 200
      });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");  // login page pe gye
    await tab.type("#input-1", id);  // id type ki 
    await tab.type("#input-2", pw);  // pw type kiya
    await tab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");  // logic button pe click kiya
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});  // profile wale navbar ke liye wait kiya
    await tab.waitForTimeout(2000);
    let element = await tab.$('div[data-analytics="NavBarProfileDropDown"]');  
    await element.click();  // profile navbar pe simple click kaam ni kr rha tha isiliye uper wait lgake, element nikal ke click kra
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});   // administration page
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');  
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();  // Manage challenges wala li pe click krwaya
    await tab.waitForSelector('.btn.btn-green.backbone.pull-right' , {visible:true}); // create challenge button
    let createChallengeElement = await tab.$('.btn.btn-green.backbone.pull-right');  // create challenge wale element ko nikala taki uska href nikala jaa skte
    let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute("href"); }   ,  createChallengeElement)  // href of create challenge 
    createChallengeLink = "https://www.hackerrank.com"+createChallengeLink;
    // console.log(createChallengeLink);
    
    for(let i=0 ; i<challenges.length ; i++){  // ek ek krke  challenge create honge
        await addChallenges(browser , createChallengeLink , challenges[i]);
    }


};
login();


async function addChallenges(browser , createChallengeLink , challenge){
    let newTab = await browser.newPage();
    // add one challenge
    // tab , challenge
    await newTab.goto(createChallengeLink);  // ye link hai isiliye ispe goto hi lgega click kisi selector pe hota hai
    // {
    //     "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
    //     "Description": "Question 1",
    //     "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
    //     "Input Format": "Integer",
    //     "Constraints": "n <= 10 ^ 9",
    //     "Output Format": "String",
    //     "Tags": "Basics",
    //   }
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problemStatement = challenge["Problem Statement"];
    let inputFormat = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let outputFormat = challenge["Output Format"];
    let tags = challenge["Tags"];

    await newTab.waitForTimeout(2000); // har ek selector ke liye alag alag wait lagane ki bjaye humne sbke liye ek saath wait lga diya 2s ka 
    await newTab.type("#name" , challengeName);
    await newTab.type("#preview" , description);
    await newTab.type('#problem_statement-container .CodeMirror textarea' , problemStatement); //[#1]
    await newTab.type('#input_format-container .CodeMirror textarea' , inputFormat);
    await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
    await newTab.type('#output_format-container .CodeMirror textarea' , outputFormat);
    await newTab.type('#tags_tag' , tags); // [#2]
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.waitForTimeout(3000); // ye timeout lgaya taki pahle save ho jaaye fir tab band ho
    await newTab.close(); // agr bnd nhi kiya multiple tabs open ho jaayenge
}


/*
#1. Code editor jo hota hai usme ek input box me type hota jaata hai 
    aur fir usme type ki hui chij span me add hoti jaati hai 
    aur input box aage bdta jaata hai to humne us box ko uthaya hai yha pe
    yaha pe hume {} iske apne aap type hone ki problem nhi handle krni pdi kyunki 
    texts me kahi brackets hai hi nhi
#2. Isme bhi wahi code editor wala hi input box hota hai 
    aur jaise hi enter hota hai type ki hui chij tag bn jaati hai 
    aur input box aage sarak jaata hai
    agr hmare pass multiple tags hote to line 73 aur 74 ko loop bnakar daala jaata
*/