var yourname = null;
function displayUserList(users) {
  var userListElement = document.getElementById("userList");
  userListElement.innerHTML = "";
  users.forEach(function (username) {
    var li = document.createElement("li");
    li.textContent = username;
    userListElement.appendChild(li);
  });
}

function needlist() {
  socket.emit("listusers");
}

socket.on("users", function (users) {
  displayUserList(users);
});

socket.on("userJoined", function (username, users) {
  Update(username + " has joined the chat");
  displayUserList(users);
});

socket.on("userDisconnected", function (username, users) {
  Update(username + " got disconnected from the chat");
  displayUserList(users);
});
