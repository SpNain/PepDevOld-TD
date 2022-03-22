const express = require("express");

// express => it is used to create server easily

// server is created
const app = express();
// socket io ka code
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io"); // server naam ke object ko nikal liya
const io = new Server(server); // io socket io ka hi object hai

app.use(express.static("public")); // it makes public folder static

let users = [];

/* on == jaise javascript me event attach krne ke liye eventListner likhte the usi prakar se 
         socket.io ke obj pe event lgane ke liye on likha jaata hai
   connection == isko ek type ka event maanlo
                 matlab ki jaise hi koi socket aake app se connect hoga to isme written fxn execute hoga
   jo socket is fxn me aata hai wo wo socket hota hai jo us time aake connect hua hai 
*/
io.on("connection", function (socket) {
  console.log(socket.id, "Socket connected");

  // socket.on bhi yahi maanlo ek type se event attach krne ke kaam aata hai 
  // on ka matlab hai data(joki app.js se aayega) consume karna hai
  // user- connected ek event hai jiske occur hote hi fxn ke andar ka code chlega
  socket.on("user-connected", function (name) {  // name emit ne bheja hai 
    users.push({ id: socket.id, name: name });
    console.log(users);

    // emit on all the socket except the sender
    // jaise hi koi nya user connect hoga to sbhi sockets ko data bhej diya jaayega jo "on with same event" pe receive hoga
    socket.broadcast.emit("user-joined", name);
  });
  
  // app.js ke emit yaha pe receive hoga aur fir ye us user ke name ke saath us chat ko sbko bhej dega
  socket.on("chat-append" , function(chat){
    let name;
    for(let i=0 ; i<users.length ; i++){
      if(users[i].id == socket.id){  // jis user ki id current jo socket connect hai usse match hi gyi to iska matlab usne hi msg bheja hai 
        name = users[i].name;
        break;
      }
    }
    socket.broadcast.emit("append-chat" , {name , chat});
  })

  socket.on("disconnect", function () {
    let disconnectedUser;
    let filteredUsers = users.filter((userObj) => {
      if (userObj.id == socket.id) {  // jis user ki id socket ki id se match ho jaayegi matlab wo user chhod ke gya hai
        disconnectedUser = userObj;
        return false;
      }
      return true;
    });
    users = filteredUsers;
    socket.broadcast.emit("user-leave", disconnectedUser.name);
  });
});

/*
// / == localhost:4000(given port) -> localhost default / route hota hai
// agr humne likha "localhost:4000/homepage" aur hume apne fxn ke andar ka data wha pe show karna hai to 
// hume "app.get("/homepage",function(request,response){response.send("data we want to show");})" aise likhna pdega
// hum apne given port pe kya dhikhana chahte hai wo function ke andar aata hai
// GET method with route /
// request : jab bhi hum browser pe hit lgate hai localhost:4000 likhe ke to iss application of hit lagti hai 
// aur jo browser se humne hit lgayi hai wo apne saath request naam ka package leke aata hai jisme diff methods hote hai
app.get("/", function (request,response) {
  response.send("<h1>Welcome<h1>");
});
*/
server.listen(4000, function () { // idhar hume btana hota hai ki app kis port pe chalu karni hai
  console.log("App started at port 4000 !!");
});
