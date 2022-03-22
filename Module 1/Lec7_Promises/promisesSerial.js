// Serially read contents of f1 f2 and f3 using promisified function

const fs = require("fs");

// promise hell

let f1KaPromise = fs.promises.readFile("./f1.txt");           //FOCL:1. isse ek f1KaPromise bnega jiski state initially pending hogi

f1KaPromise.then(function(data){                              //FOCL:2 jaise hi f1 ke promise ki state change hogi is then ka scb chlega 
    console.log(data+"");                                     //FOCL:3 scb ke chalte ye line chalegi
    let f2KaPromise = fs.promises.readFile("./f2.txt");       //FOCL:4  isse ek f2KaPromise bnega jiski state initially pending hogi
    f2KaPromise.then(function(data){                          //FOCL:5 jaise hi f2 ke promise ki state change hogi is then ka scb chlega 
        console.log(data+"");                                 //FOCL:6  scb ke chalte ye line chalegi
        let f3KaPromise = fs.promises.readFile("./f3.txt");   //FOCL:7. isse ek f3KaPromise bnega jiski state initially pending hogi
        f3KaPromise.then(function(data){                      //FOCL:8 jaise hi f3 ke promise ki state change hogi is then ka scb chlega 
            console.log(data+"");                             //FOCL:9 scb ke chalte ye line chalegi
        })
    })
})

/*
Wrong way to write above code 

Abhi is code me hmara kaam to bn jaaye serial wise data laane ka 
lekin maanlo kal ko hume do api se data laana hota jisme 2nd api ka data laane ke liye 1st api ke data ki need hoti
us time 2nd api ka data nhi aa paata kyunki maybe us time tak 1st wali api ka data na aaya ho 
aur agr 2nd api ka data nhi aata to hum uske catch me chle jaayenge 

yha pe humne then ko attach to aise hi kiya hai jisse data serial wise print ho lekin data serial wise hi aaye iski gaurrantte nhi hai


let f1KaPromise = fs.promises.readFile("./f1.txt");
let f2KaPromise = fs.promises.readFile("./f2.txt");     
let f3KaPromise = fs.promises.readFile("./f3.txt");       

f1KaPromise.then(function(data){ 
        console.log(data+"");   
        f2KaPromise.then(function(data){
            console.log(data+"");
            f3KaPromise.then(function(data){
                 console.log(data+"");
        })
    })
})
*/
