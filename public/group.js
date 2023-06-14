var socket = io();

socket.on("connect", () => {
  socket.emit("addUser", yourname);
});

document
  .getElementById("chatForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var message = document.getElementById("messageInput").value;
    if (message.trim() !== "") {
      socket.emit("sendMessage", { name: yourname, mess: message });
      document.getElementById("messageInput").value = "";
    }
  });

socket.on("receiveMessage", function ({ name, mess }) {
  if (name === yourname) {
    messageByYou(mess);
  } else {
    messageByOtherUser(name, mess);
  }
});

socket.on("disconnect", () => {
  var li = document.createElement("li");
  li.textContent = "You got disconnected the chat";
  document.getElementById("messages").appendChild(li);
  Update("You got disconnected the chat");
});
