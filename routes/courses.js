const express = require('express');
const router = express.Router();
const { Course } = require('../models');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         price:
 *           type: number
 *         instructor_id:
 *           type: integer
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Récupère tous les cours
 *     responses:
 *       200:
 *         description: Liste des cours
 */

module.exports = router;
