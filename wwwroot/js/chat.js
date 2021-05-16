"use strict";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("/chatHub")
  .build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceivedMessage", (user, message) => {
  const msg = `${user} says ${message}`;
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("messageList").appendChild(li);
});

connection
  .start()
  .then(() => {
    document.getElementById("sendButton").disabled = false;
  })
  .catch(err => console.error(err));

document.getElementById("sendButton").addEventListener("click", e => {
  const user = document.getElementById("userInput").value;
  const message = document.getElementById("messageInput").value;
  connection
    .invoke("SendMessage", user, message)
    .catch(err => console.error(err));
  e.preventDefault();
});
