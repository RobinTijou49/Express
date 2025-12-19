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


module.exports = router;
