module.exports = function(io) {
  const db = require('./models');

  const messagesByRoom = { general: [] };
  const usersByRoom = {}; // <-- pour suivre les pseudos dans chaque room

  const badWords = ["merde", "con", "putain", "salope", "encule"];

  const Message = db.Message;
  

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
  socket.pseudo = pseudo;
  socket.room = room;
  usersByRoom[room].add(pseudo);

  socket.join(room);

  if (!messagesByRoom[room]) messagesByRoom[room] = [];

  // envoyer l'historique
  socket.emit("chatHistory", messagesByRoom[room]);

  // message système d'arriver
  const systemMsg = {
    pseudo: "System : ",
    message: `${socket.pseudo} a rejoint le salon.`,
    date: new Date().toLocaleTimeString("fr-FR"),
    system: true
  };
  io.to(room).emit("newMessage", systemMsg);
});


    socket.on("chatMessage", (message) => {
      if (!socket.pseudo || !socket.room) return;

      (async () => {
        try {
          const savedMessage = await Message.create({
            message: cleanMessage(message),
            room: socket.room
          });

          const messageData = {
            pseudo: socket.pseudo,
            message: savedMessage.message,
            date: savedMessage.createdAt.toLocaleTimeString("fr-FR")
          };

          // Ajouter dans la mémoire pour l’historique du chat
          if (!messagesByRoom[socket.room]) messagesByRoom[socket.room] = [];
          messagesByRoom[socket.room].push(messageData);

          io.to(socket.room).emit("newMessage", messageData);
        } catch (err) {
          console.error("Erreur DB:", err);
        }
      })();
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
