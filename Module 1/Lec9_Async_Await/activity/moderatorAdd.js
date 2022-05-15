const id = "pamico3332@nic58.com";
const pw = "12345678";
const puppeteer = require("puppeteer");


async function login(){
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
      });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);
    await tab.click( ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.waitForTimeout(2000);
    let element = await tab.$('div[data-analytics="NavBarProfileDropDown"]');
    await element.click();
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li' , {visible:true});
    let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
    let manageChallengeLi = bothLis[1];
    await manageChallengeLi.click();
    // ye uper wala code challenges wali file se uthaya hai || isse hum manage challenges wale page pe chle jaate hai
    await addModerators(browser , tab);
};
login();

/*
addModerators() : iske pass browser aur tab aayenge 
                us tab pe present saare questions ke links nikal dega
                aur ek ek krke saare questions pe moderators add kr dega
                aur agr agge koi page hai to uspe jaake moderator ko call lg jaati hai 
                jisse ye code recursive bn jaata hai aur ek ek krke saare tabs ke questions pe moderators add hote rehte hai
*/
async function addModerators(browser , tab){
    await tab.waitForSelector('.backbone.block-center' , {visible:true});
    let allATags = await tab.$$('.backbone.block-center');
    let allQuesLinks = [];
    for(let i=0 ; i<allATags.length ; i++){
        let qLink = await tab.evaluate( function(elem){  return elem.getAttribute("href");  }   , allATags[i]);
        qLink = "https://www.hackerrank.com"+qLink;
        allQuesLinks.push(qLink);
    }

    for(let i=0 ; i<allQuesLinks.length ; i++){
        let qLink = allQuesLinks[i];
        let newTab = await browser.newPage();
        await addModeratorToASingleQues(newTab , qLink); //Kyonki iske aage humne await likh diya hai to pahle ye function chalega fir jaake i increase hoga
    }                                                    // jisse ek time pe ek hi ques pe kaam hoga

    // next button active hai to click on next
    // addModerators(browser , tab);

    let allLis = await tab.$$('.pagination li'); // saari lis nikal li pages ki 
    let nextBtnLi = allLis[allLis.length-2];   // ye last se 2nd button hai jispe click krne se next page aata hai 
    let isDisabled = await tab.evaluate( function(elem){ return elem.classList.contains("disabled");  } , nextBtnLi );  // hum check krte hai ki kya iss button ki classlist me disabled class hai?? 
    // if true ??
    if(isDisabled){ // agr disabled class hai to that means aage koi page nhi hai return kr jaao 
        return;
    }
    // else false ?? // agr nhi hai to means aage page hai 
    await nextBtnLi.click();  // hum button pe click krte hai jo hume next page pe le jaata hai
    await tab.waitForTimeout(5000);
    await addModerators(browser , tab);  // aur fir us page pe jaake hum dobara se moderator ko call lga dete hai
}

// ek single ques pe moderator add krta hai
async function addModeratorToASingleQues(newTab , qLink){
       await newTab.goto(qLink);
       await newTab.waitForTimeout(2000);
       await newTab.click('li[data-tab="moderators"]');  // moderator page
       await newTab.waitForSelector('#moderator' , {visible:true});  // input box
       await newTab.type("#moderator" , "pep");
       await newTab.click('.btn.moderator-save');  // add button
       await newTab.click('.save-challenge.btn.btn-green');  // save button
       await newTab.waitForTimeout(2000);
       await newTab.close();
}