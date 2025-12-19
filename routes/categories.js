const express = require('express');
const router = express.Router();
const { Category } = require('../models');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - label
 *       properties:
 *         id:
 *           type: integer
 *         label:
 *           type: string
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Récupère toutes les catégories
 */
module.exports = router;
