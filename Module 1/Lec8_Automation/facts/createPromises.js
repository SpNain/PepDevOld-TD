const { not } = require("cheerio/lib/api/traversing");
let fs = require("fs");

function myPromisifiedFun(filePath){
    return new Promise( function(scb , fcb){
        
        // async func
        fs.readFile( filePath , function(error , data){
            if(error){
                fcb("Data nhi aaya !!");
            }
            else{
                scb("testing success callback !!!");
            }
        })

    }); //it will create a new promise object !!!   
}

let pendingPromise = myPromisifiedFun("./f1.txt");

pendingPromise.then(scb);
pendingPromise.catch(fcb);

function scb(data){
    console.log(data+"");
}
function fcb(error){
    console.log(error);
}

/*
LETS FIND OUT HOW To CRATE A PROMISE. LET'S GO !!!

Execution starts from line 2.
Jaha program ko dikhta hai `require fs` to ye fs le aata hai
uske baad function myPromisifiedFun ko memory mil jaati hogi

Uske baad execution aata hai line no. 20 pe
jaha se myPromisifiedFun ko call lag jaati hai aur isko ek filepath(f1.txt in this case) pass kiya jaata hai 
myPromisifiedFun invoke ho gya hai 

myPromisifiedFun execute hona start karta hai 
usko Promise() constructor ki call dikhti to wo ek pending Promise ka object create kar deta hai 
Heap ki kisi jagah pe jiski state pending hogi
aur uska address save ho jaata hai hmare line 20 ke pendingPromise variable me
Promise ke constructor ke andar ek callback fxn pass kiya hai jise promise ka obj hi call lgayega
aur jo tabhi invoke krega jab use scb aur fcb mil jaayenge
scb aur fcb ke milne ka matlab hai jab use then aur catch ki call dikh jaayegi

To execution line no. 21 pe aata hai 
pendingPromise ko then aur catch ki call lagayi gyi jisse unhone pendingPromise se scb aur fcb ko attach kar diya
hamara Promise ka callback fxn invoke ho jaata hai kyonki use scb aur fcb mil gye 

Promise ka callback fxn execute hona start hota hai
to usko fs.readFile naam ka async fxn dikhta hai jo diye gye filepath se file ko read karta hai 
aur uske andar ek aur callback fxn pass kiya hai jo tab tak wait karta hai jab tak readFile data read nhi kar leta
aur jaise hi data read ho jaata hai iss async fxn ke andar likhe callback fxn ko lg jaati hai 
jiski arugments me humne data aur error pass kiye hai
agr to data succesfully read ho gya to callback fxn ko data mil jaayega aur scb ko call lagegi aur uska fxn execute hota hai
aur agr to data succesfully read nhi ho pata to fxn ko error milega aur fcb ko call lagegi aur uska fxn execute hota hai
*/