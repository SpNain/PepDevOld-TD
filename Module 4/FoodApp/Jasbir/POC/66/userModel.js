
// let { PASSWORD } = require("../secrets");

let PASSWORD;
// jb app deployed hoga to use PASSWORD env vars se milega jo hum hi set krte h (jaise heroku me config vars me krte h)
if (process.env.PASSWORD) {
    PASSWORD = process.env.PASSWORD;
} else {
    // jb code locally chalega to fir use PASSWORD secrets se milega
    PASSWORD = require("../secrets").PASSWORD;
}

// aisa hi hr ek jagah krna h jha jha pe bhi secrets me se kuch bhi require kiya h
