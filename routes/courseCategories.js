const express = require('express');
const router = express.Router();
const { CourseCategory } = require('../models');

router.get('/', async (req, res) => {
  try {
    const courseCategories = await CourseCategory.findAll();
    res.json(courseCategories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CourseCategory:
 *       type: object
 *       required:
 *         - course_id
 *         - category_id
 *       properties:
 *         course_id:
 *           type: integer
 *         category_id:
 *           type: integer
 */

/**
 * @swagger
 * /course-categories:
 *   get:
 *     summary: Récupère toutes les relations cours-catégories
 */
module.exports = router;
