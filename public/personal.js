var oid = null;

document
  .getElementById("pchatForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var message = document.getElementById("pmessageInput").value;
    if (message.trim() !== "" && oid !== null) {
      socket.emit("privateMessage", {
        name: yourname,
        opponent: oid,
        mess: message,
      });
      document.getElementById("pmessageInput").value = "";
    } else if (message.trim() !== "") {
      var li = document.createElement("li");
      li.textContent = yourname + ": " + message;
      document.getElementById("pmessages").appendChild(li);
      document.getElementById("pmessageInput").value = "";
    } else {
      document.getElementById("pmessageInput").value = "";
    }
  });

socket.on("receivePrivateMessage", function ({ name, mess }) {
  var li = document.createElement("li");
  li.textContent = name + ": " + mess;
  document.getElementById("pmessages").appendChild(li);
});
