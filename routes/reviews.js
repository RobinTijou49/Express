const express = require('express');
const router = express.Router();
const { Review } = require('../models');

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - user_id
 *         - course_id
 *         - rating
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         course_id:
 *           type: integer
 *         rating:
 *           type: integer
 *         comment:
 *           type: string
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Récupère tous les avis
 *     responses:
 *       200:
 *         description: Liste des avis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review '
 */
module.exports = router;
