const express = require('express');
const router = express.Router();
const { Certificate } = require('../models');

router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.findAll();
    res.json(certificates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       required:
 *         - enrollment_id
 *       properties:
 *         id:
 *           type: integer
 *         enrollment_id:
 *           type: integer
 *         issue_date:
 *           type: string
 *           format: date
 *         serial_number:
 *           type: string
 */

/**
 * @swagger
 * /certificates:
 *   get:
 *     summary: Récupère tous les certificats
 */
module.exports = router;
