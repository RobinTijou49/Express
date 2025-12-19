const express = require('express');
const router = express.Router();
const { Enrollment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.json(enrollments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - user_id
 *         - course_id
 *       properties:
 *         id:
 *           type: integer
 *         user_id:
 *           type: integer
 *         course_id:
 *           type: integer
 *         date:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Récupère toutes les inscriptions
 *     responses:
 *       200:
 *         description: Liste des inscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enrollment'
 */
module.exports = router;
