const express = require('express');
const router = express.Router();
const { Chapter } = require('../models');

router.get('/', async (req, res) => {
  try {
    const chapters = await Chapter.findAll();
    res.json(chapters);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Chapter:
 *       type: object
 *       required:
 *         - course_id
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *         course_id:
 *           type: integer
 *         title:
 *           type: string
 *         duration:
 *           type: integer
 */

/**
 * @swagger
 * /chapters:
 *   get:
 *     summary: Récupère tous les chapitres
 *     responses:
 *       200:
 *         description: Liste des chapitres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chapter '
 */
module.exports = router;
