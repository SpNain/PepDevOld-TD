// This is utility file where all the required fxns are written.

let fs = require("fs");  //fs module implemented

function getFilesData(files) {   //files pass kri h jo wCat me bnayi h 
  let filesData = "";  // nya varible bna liya jisme hum files ko jodke store krenge
  for (let i = 0; i < files.length; i++) {  // array file ke ek ek element ko leke aayaega
    if (!fs.existsSync(files[i])) {     // file exist krti h bhi ki nhi check krega
      console.log("One or more Files Doesn't Exist !");
      return;
    }
    if (i == files.length - 1) {  // isse last wali file ko chhodke baki sb files k baad \n lagega
      filesData += fs.readFileSync(files[i]);
    } else {
      filesData += fs.readFileSync(files[i]) + "\r\n";
    }
  }
  return filesData;  // last me check chuk krke jod tod k de dega files ne
}
function applySFlag(data) {  // data bina updated filesData hai kyonki filesData ko update to yahi karta hai
  // Hey I am F1
  // space
  // space
  // space
  // space
  // space
  // Bye I am F1
  let emptyIncluded = false;  // taki text wali line l baad sirf ek hi space lge
  let removedSpaces = [];   //space remove karke string store karne k liye bnaya hai
  let splittedData = data.split("\r\n");
  //   [ 'Hey I am F1', '', '', '', '',  '','Bye I am F1', '' , "Hey m also f1"];  // data split hoke aisa bna gya
  //   splittedData.length = 9
  //   i=6;

  for (let i = 0; i < splittedData.length; i++) {  // ek ek krke splitted data wala array k element check krenge
    if (splittedData[i] == "" && emptyIncluded == false) {  
      removedSpaces.push(splittedData[i]);
      emptyIncluded = true;  // badal diya taki jab tak text na aave yu true hi rve or "if" me enter hi na hove
    } else if (splittedData[i] != "") {
      removedSpaces.push(splittedData[i]);
      emptyIncluded = false;
      // if (i < splittedData.length - 2) emptyIncluded = false;   //iss line ka khaas idea nhi h personally muje to galat lag rhi hai isiliye isko comment krke maine apna logic lgaya
    }
  }
  let removedSpacesString = removedSpaces.join("\r\n");  //string ko jod do
  return removedSpacesString;
  // Hey I am F1
  // space
  // Bye I am F1
}
function applyBFlag(data) {  // ye jo data hai wo updated hoga ki nhi depend karta h ki ispe s flag lga hai ki nhi 
  let count = 1;
  let splittedData = data.split("\r\n");
  for (let i = 0; i < splittedData.length; i++) {
    if (splittedData[i] != "") {
      splittedData[i] = `${count}. ${splittedData[i]}`; //$(value) matlab jo value hogi wo aa jaayegi
      // splittedData[i] = count+". "+splittedData[i];
      count++;
    }
  }
  // console.log(splittedData);
  let bFlaggedString = splittedData.join("\n");
  return bFlaggedString;
}
function applyNFlag(data) {  // same of b flag
  let count = 1;
  let splittedData = data.split("\r\n");
  for (let i = 0; i < splittedData.length; i++) {
    splittedData[i] = `${count}. ${splittedData[i]}`;
    count++;
  }
  // console.log(splittedData);
  let nFlaggedString = splittedData.join("\n");
  return nFlaggedString;
}

module.exports = {   // obj export krne k liye
  getFilesData,
  applySFlag,
  applyBFlag,
  applyNFlag
}

