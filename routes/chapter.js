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


module.exports = router;
