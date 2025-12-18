const socket = io();

const joinBtn = document.getElementById("join");
const loginDiv = document.getElementById("login");
const chatDiv = document.getElementById("chat");
const messagesDiv = document.getElementById("messages");
const changeRoomBtn = document.getElementById("changeRoom");

let currentPseudo = "";
let currentRoom = "";

// rejoindre un salon
joinBtn.addEventListener("click", () => {
  const pseudo = document.getElementById("pseudo").value.trim();
  const room = document.getElementById("room").value;

  if (!pseudo) {
    alert("Pseudo obligatoire");
    return;
  }

  currentPseudo = pseudo;
  currentRoom = room;

  socket.emit("joinRoom", { pseudo, room });

  loginDiv.style.display = "none";
  chatDiv.style.display = "block";
});

socket.on("chatHistory", (messages) => {
  messagesDiv.innerHTML = "";
  messages.forEach(addMessage);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

socket.on("newMessage", (data) => {
  addMessage(data);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// envoyer message
const messageForm = document.getElementById("messageForm");

// click on the button
document.getElementById("send").addEventListener("click", sendMessage);


document.getElementById("messageInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});


if (messageForm) {
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
  });
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();

  if (!message) return;

  socket.emit("chatMessage", message);
  input.value = "";
}

// affichage message
function addMessage({ pseudo, message, date }) {
  const div = document.createElement("div");
  div.classList.add("message");

  const pseudoSpan = document.createElement("strong");
  pseudoSpan.textContent = pseudo + " ";

  if (pseudo === currentPseudo) {
    pseudoSpan.classList.add("self");
  }

  const messageSpan = document.createElement("span");
  messageSpan.textContent = message;

  const dateSpan = document.createElement("span");
  dateSpan.textContent = date;
  dateSpan.classList.add("date");

  div.appendChild(pseudoSpan);
  div.appendChild(messageSpan);
  div.appendChild(dateSpan);

  messagesDiv.appendChild(div);
}

// bouton changer de salon
changeRoomBtn.addEventListener("click", () => {
  // cacher le chat et afficher la sélection
  chatDiv.style.display = "none";
  loginDiv.style.display = "block";

  // vider les messages
  messagesDiv.innerHTML = "";

  // réinitialiser la room
  currentRoom = "";
});

// vérification pseudo pris
socket.on("pseudoTaken", ({ message }) => {
  alert(message);

  // revenir à l'écran de choix de pseudo/room
  chatDiv.style.display = "none";
  loginDiv.style.display = "block";

  // vider les messages
  messagesDiv.innerHTML = "";
});
