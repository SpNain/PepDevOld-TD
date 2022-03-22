let fs = require("fs");  // fs module ko leke aayegi

let extensionsMapping = require("./util.js");  // util se obj import hoga
let extensionMappingKeysArr = [];

for (let key in extensionsMapping) {
    extensionMappingKeysArr.push(key);  // yaha pe humne extension keys ka arr bna liye 
}                                       // jisse jab bhi hum nested folder dekhe to check krle kahi wo folder extension ke naam ka folder to nhi hai na
function nestedSorting(folder){
    let testFolderPath = `./${folder}`; // jis folder pe test karna hai
    let allFiles = fs.readdirSync(testFolderPath);   //sari files ko read krega

    
    for (let i = 0; i < allFiles.length; i++){
        if (allFiles[i].includes(".")) {         // agr file . include krti hai to matlab folder nhi hai aur use sort krna hai
            sortFile(allFiles[i]);   // ek ek karke files jaayegi
        }
        else {                                                       // agr file . include nhi krti hogi to isme aayenge iska matlab file ek folder hai 
            if (extensionMappingKeysArr.includes(allFiles[i])) {     // yaha pe hum check kr rhe hai ki folder kahi extension ke naam wala folder to nhi hai na 
                break;                                               // aur agr wo folder extension ke naam wala folder hai to hume use sort nhi krna hai kyunki usme pahle se hi usi se related files pdi hogi to simple break kr jaana hai
            }
            else {
                nestedSorting(testFolderPath+"/"+allFiles[i]);      // agr wo extension ke naam wala folder nhi hai iska matlab use sort krna pdega to iss time hum folder me additional file path add krke bhejte hai jisse nested wale folder pe kaam ho
            }
        }
    }
    function sortFile(file){   // overall sort kar dega
        let extension = getExtension(file);  //idhar extension milegi
        // console.log(extension);
        let extensionFolderName = checkExtensionFolder(extension);  // folder ban jaane pe yaha mil jaayega 
        moveFile(file , extensionFolderName );  // file ko move kar denge us folder me
    }
    function getExtension(file) {   // extensions laake dega
            file = file.split(".");
            return file[1];  
    }
    function checkExtensionFolder(extension){   // overall agr folder nhi hoga to bna k dega
        // extension = "doc";
        let extensionFolderName = testFolderPath;  // ./Downloads
        for(let key in extensionsMapping){           //extensionMapping object se ek ek karke key uthayenge jaise first me document
            let extensions = extensionsMapping[key];   //isse hum document key ke elements ko extenions me store krwa reh h jaise doc pdf etc
            if(extensions.includes(extension)){       // check krega ki extensions me hmari extension(e.g.for doc - pdf,txt etc.) h ki nhi
                extensionFolderName = extensionFolderName+"/"+key;    //agr hmari extension mil gyi to isme path daal denge .downloads/Documents
                break;
            }
        }
        let isFolderExist =  fs.existsSync(extensionFolderName);  // download me jaake check krega ki documents naam ka folder h ki nhi
        if(!isFolderExist){
            fs.mkdirSync(extensionFolderName);  // nhi hua to create krenge
        }
        return extensionFolderName;   
    }
    function moveFile(file , extensionFolderName){
        let sourceFile = testFolderPath+"/"+file;      // 1st path - jaha se uthani hai means copy krni hai
        let destinationFile = extensionFolderName+"/"+file;  //2nd path - jaha daalni hai means paste krni hai
        // copy file from the source path to destination path !!
        fs.copyFileSync(sourceFile , destinationFile);  // 2 path given hai
        // then delete file from the source path !!
        fs.unlinkSync(sourceFile);
    }
}
nestedSorting("Downloads");


/*
New features implemented :

1. isme nested folder bhi sort ho skenge kyunki hume recursion ka use krke nya folder path deke code firse run kr diya 
to jab tak end tak folder khtam nhi honge tab tak recursion ki help se code ko nya folder path deke re-run krte rhenege

2. pahle jab bhi hum foldersort.js ko run krte the to download wali file sort ho jaati thi
lekin agr foldersort.js ko re-run krte the to sorted extension named folders ke andar firse usi naam ka folder bn jaata tha
jaise ki download/document/document 
jisko humne un extension keys ka array bnakar check kar liya jisse wo folder dobara na bne
*/