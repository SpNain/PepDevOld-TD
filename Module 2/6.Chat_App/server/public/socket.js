/* emit bhi ek type ke event attach krne ke kaam hi aata hai 
   emit ka matlab hai data send hoga
   jo data send hoga(joki app.js se hi bheja jaayega) wo us on ke pass jaayega jispe same event jo emit pe lga hai lga hua hoga
*/
socket.emit("user-connected", name);

// when a new user joined the chat then the data that emit broacast to every socket will receive here and fxn code executes
socket.on("user-joined", function (name) {
  // create a join div
  let chatJoin = document.createElement("div");
  chatJoin.classList.add("chat");
  chatJoin.classList.add("join");
  chatJoin.innerHTML = name + " joined chat";
  chatWindow.append(chatJoin);
});

socket.on("user-leave", function (name) {
  // create a join div
  let chatLeave = document.createElement("div");
  chatLeave.classList.add("chat");
  chatLeave.classList.add("leave");
  chatLeave.innerHTML = name + " left chat";
  chatWindow.append(chatLeave);
});

// socket.js se aayi chat is on pe receive hogi aur as left chat sbke system pe append ho jaayegi
socket.on("append-chat", function ({name ,chat}) {
  let chatLeft = document.createElement("div");
  chatLeft.classList.add("chat");
  chatLeft.classList.add("left");
  chatLeft.innerHTML = name+" : " +chat;
  chatWindow.append(chatLeft);
});
