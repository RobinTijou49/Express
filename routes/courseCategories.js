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

module.exports = router;
