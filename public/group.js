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
  var li = document.createElement("li");
  li.textContent = name + ": " + mess;
  document.getElementById("messages").appendChild(li);
});

socket.on("disconnect", () => {
  var li = document.createElement("li");
  li.textContent = yourname + " got disconnected the chat";
  document.getElementById("messages").appendChild(li);
});
