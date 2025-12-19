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


module.exports = router;
