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


module.exports = router;
