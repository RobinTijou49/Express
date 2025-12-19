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

module.exports = router;
