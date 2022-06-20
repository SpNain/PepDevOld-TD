// yha pe hum kr kya rhe hai ?
// hum chahte hai ki jab koi bnda hmare FoodApp pe login kre 
// to use login krte hi ek welcome email mile
// whi mail hum idhar bhejne ke liye code likh rhe hai


const nodemailer = require('nodemailer');
const {nodemailer_passkey}=require('./secrets');
//userObj-> name email password 
module.exports = async function sendMail(userObj) { // jab hum is fxn ko authRouter se call lgate hai to wha se userObj bhi pass krte hai jo yha pe recieve hota hai
// hume mail bhejne ke liye ek transporter chahiye hota hai 
// transporter kya krta hai ki jisko mail bhejna hai aur jo mail bhej rha hai unke bich me ek type ka pull bna deta hai jiske through mail jaa skti hai
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,   // agr hum free wala mailing system use krte hai to uske liye port ye hoga, for paid use port no 465
    secure: false, // true for paid, false for other ports
    auth: {
      user: 'noblehacker9@gmail.com', // generated ethereal user - jo bnda bhej rha hai uski email(yani hmari khud ki email)
      pass: nodemailer_passkey, // generated ethereal password
    },
  });

  // designing the structure of the Email
  var Osubject,Otext,Ohtml;

  Osubject=`Thank you for signing ${userObj.name}`; // userObj jo mila tha usme se name nikal liya
  Otext=`
   Hope you have a good time !
   Here are your details-
   Name - ${userObj.name}
   Email- ${userObj.email}
   `
  Ohtml=`<h1>Welcome to foodAp.com</h1>`

  // ye ek prakar se email ka structure maanlo
  // means ki kisko bheja hai uski email 
  // subject, text, agr koi html file bhejni hai to wo html file etc.
  let info = await transporter.sendMail({
    from: '"FoodApp 🍱" <noblehacker9@gmail.com>',// sender address 
    to: "allaboutyou120@gmail.com", // list of receivers #1
    subject: Osubject, // Subject line
    text: Otext, // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId); // jb mail chla jaata hai to info ke andar jo messageId hoti hai use print krwa dete for confirmation
};

/*
#1.
we can give multiple receivers separated by comma
yha pe hume <${userObj.email}> dena chahiye kyunki usi ko to email bhejna hai
maine apna email sirf verify krne ke liye diya hai ki email aa rha h ki nhi check kr sku ek baar
*/