const form = document.getElementById("form");
const chatroom = document.getElementById("chatroom");
const chatroomUser = document.getElementById("chatroom_user");
const messageContainer = document.getElementById("messages");
const sendBtn = document.getElementById("message-input-container");
const messageInput = document.getElementById("message-input");
const socket = io();
let username;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  username = form.username.value;

  if (!username.trim()) {
    alert("Please Enter a username");
    return;
  }
  //   console.log(username)
  form.style.display = "none";
  chatroom.style.display = "flex";
  chatroomUser.innerText = `Chatroom - ${username}`;
  socket.emit("joined", username);
});

sendBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("sendMessage", { username, message });
  e.target.reset();
});
socket.on("joined", (newUser) => {
  if (newUser !== username) {
    messageContainer.innerHTML += `
    <div class="joined">${newUser} has joined the chatroom</div>
    `;
  }
});

socket.on("sendMessage", (data) => {
  showMessage(data);
});

function showMessage(data) {
  if (data.username === username) {
    messageContainer.innerHTML += `
        <div class="message sent">${data.username} : ${data.message}</div>
        `;
  } else {
    messageContainer.innerHTML += `
        <div class="message received">${data.username} : ${data.message}</div>
        `;
  }
}
