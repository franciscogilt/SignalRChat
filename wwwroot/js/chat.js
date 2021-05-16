const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", (user, message) => {    
    const li = document.createElement("li");
    li.textContent = user + " says " + message;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(() => {
    document.getElementById("sendButton").disabled = false;
}).catch(err => {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", event => {
    const user = document.getElementById("userInput").value;
    const message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(err => {
        return console.error(err.toString());
    });
    event.preventDefault();
});