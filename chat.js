module.exports = function(io) {
  const messagesByRoom = { general: [] };
  const usersByRoom = {}; // <-- pour suivre les pseudos dans chaque room

  const badWords = ["merde", "con", "putain", "salope", "encule"];

  function cleanMessage(message) {
    let cleaned = message;
    badWords.forEach(word => {
      const regex = new RegExp(word, "gi");
      cleaned = cleaned.replace(regex, "***");
    });
    return cleaned;
  }

  io.on("connection", (socket) => {
    console.log("🔌 Utilisateur connecté");

socket.on("joinRoom", ({ pseudo, room }) => {
  if (!usersByRoom[room]) usersByRoom[room] = new Set();

  // Vérification si pseudo déjà pris
  if (usersByRoom[room].has(pseudo)) {
    socket.emit("pseudoTaken", { message: "Pseudo déjà utilisé dans cette room !" });
    return;
  }

  // Ajouter le pseudo à la room
  socket.pseudo = pseudo;  // <-- assigner AVANT le message système
  socket.room = room;
  usersByRoom[room].add(pseudo);

  socket.join(room);

  if (!messagesByRoom[room]) messagesByRoom[room] = [];

  // envoyer l'historique
  socket.emit("chatHistory", messagesByRoom[room]);

  // message système
  const systemMsg = {
    pseudo: "System : ",
    message: `${socket.pseudo} a rejoint le salon.`, // <-- utiliser socket.pseudo
    date: new Date().toLocaleTimeString("fr-FR"),
    system: true
  };
  io.to(room).emit("newMessage", systemMsg);
});


    socket.on("chatMessage", (message) => {
      if (!socket.pseudo || !socket.room) return;

      const messageData = {
        pseudo: socket.pseudo,
        message: cleanMessage(message),
        date: new Date().toLocaleTimeString("fr-FR")
      };

      messagesByRoom[socket.room].push(messageData);

      io.to(socket.room).emit("newMessage", messageData);
    });

    socket.on("disconnect", () => {
      if (socket.room && socket.pseudo && usersByRoom[socket.room]) {
        usersByRoom[socket.room].delete(socket.pseudo);

        const systemMsg = {
          pseudo: "System",
          message: `${socket.pseudo} a quitté le salon.`,
          date: new Date().toLocaleTimeString("fr-FR"),
          system: true
        };
        io.to(socket.room).emit("newMessage", systemMsg);
      }

      console.log("❌ Utilisateur déconnecté");
    });
  });
};
