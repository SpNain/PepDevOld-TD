// let clicmds = process; [#1]
// console.log(clicmds);
  
const { getFilesData, applySFlag, applyBFlag, applyNFlag } = require("./util"); // jis jis  ka naam likh rkha h wo wo m.e k obj se uthkar yaha aa jaayega
let contents = process.argv.slice(2);  //contents me process array se flag aur files ko as a array store karwa liya humne

const flags = [];  //flag initialisation
const files = [];   //files initialisation

for (let i = 0; i < contents.length; i++) {  // ye loop flag aur files ko distinguish kar dega
    // "-s" , "-b" , "f1.txt" , "f2.txt" , "-n"
  if (contents[i].startsWith("-")) {  // jiske base pe distinguidh krenge
    flags.push(contents[i]);
  } else {
    files.push(contents[i]);
  }
}

// -s -b -n
// f1.txt // f2.txt

let filesData = getFilesData(files);  //yaha se fxn call kiya , ab jo fxn util me likh rkha h  uske hisab se kaam dega ye

if (flags.includes("-s")) {  // check krega ki kahi lag aaray me -s flag h ki nhi
  // filesData updated if s flag is present !
  filesData = applySFlag(filesData);  // jo getFilesData se aaya hoga uspe -s flag lag jaayega
}
// ab filesData me -s flag lag chuka h aur filesData update ho gya h
// console.log(filesData);

// when both -b and -n flags are present
if (flags.includes("-b") && flags.includes("-n")) {  // check ki kahi dono flag  to nhi  
  if (flags.indexOf("-b") < flags.indexOf("-n")) {  // agr h to index k base pe priorty milegi
    // apply b flag  
    filesData = applyBFlag(filesData);  
  } else {
    // apply n flag
    filesData = applyNFlag(filesData);
  }
}
// only -b flag is present
else if (flags.includes("-b")) {
  // apply b flag
  filesData = applyBFlag(filesData);
}
// only -n flag is present
else if (flags.includes("-n")) {
  // apply n flag
  filesData = applyNFlag(filesData);
}

console.log(filesData);

/*
#1.

process ek array hota hai jisme hum jo bhi terminal/CLI(command line interface) pe likhte hai unko store krta hai 
node aur agr koi js file di hai to uski location store hogi 
aur agr koi normal command hai like flag txt file to unke haam store honge.
*/