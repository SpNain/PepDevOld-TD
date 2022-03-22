let name = prompt("Enter Your Name !");
let chatInputBox = document.querySelector(".chat-input");
let chatWindow = document.querySelector(".chat-window");

chatInputBox.addEventListener("keypress", function (e) {
  if (e.key == "Enter" && chatInputBox.value) {
    let chatRight = document.createElement("div");
    chatRight.classList.add("chat");
    chatRight.classList.add("right");
    chatRight.innerHTML = chatInputBox.value;
    chatWindow.append(chatRight);
    
    socket.emit("chat-append", chatInputBox.value);
    chatInputBox.value = "";
  }
});

/*

humne chatInput aur chatWindow mangwayi
aur chatInput pe event lga diya ki agr Enter naam ki key press hui ho aur chatInput ki koi value ho
to us value ka ek msg bnke chatWindow pe append ho jaaye

ab jo ye chat hai ye sirf hmare system me append hui hai ab isko dusro ko bhi bhejna hai
uske liye hum isko emit kr dete hai aur chatInputbox.value ko as a data send kar dete hai 
fir ye chat server yani app.js ke pass jaati hai jo iss chat ko broadcastly emit kar deta hai
fir ye chat client yani socket.js ke pass jaati hai aur uske system me as left chat append hoti hai

*/