const express = require('express');
const router = express.Router();
const { Message } = require('../models'); // chemin vers index.js

// GET /api/messages/:room
router.get('/:room', async (req, res) => {
  const { room } = req.params;

  try {
    const messages = await Message.findAll({
      where: { room },
      order: [['createdAt', 'ASC']]
    });

    // On renvoie seulement le contenu et la date
    const formatted = messages.map(m => ({
      message: m.message,
      date: m.createdAt
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
