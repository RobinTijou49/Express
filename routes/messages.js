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


/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - message
 *         - room
 *       properties:
 *         id:
 *           type: integer
 *         message:
 *           type: string
 *         room:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /messages/{room}:
 *   get:
 *     summary: Récupère tous les messages d'une room
 *     parameters:
 *       - in: path
 *         name: room
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des messages d'une room
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */


module.exports = router;
