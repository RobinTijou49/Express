const fs = require('fs');
const path = require('path');
var express = require('express');
var router = express.Router();
const { determineCoupure } = require('../dab');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/error', (req, res) => {
  res.status(500).render('error', {
    title: 'Erreur volontaire',
    message: 'Ceci est une page d’erreur volontaire.',
    error: {}
  });
});



router.get('/download', (req, res) => {

  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const filename = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}.txt`;

  const content = `Téléchargé le : ${now.toLocaleString()}`;

  const filepath = path.join(__dirname, '..', 'tmp', filename);

  fs.mkdirSync(path.join(__dirname, '..', 'tmp'), { recursive: true });

  fs.writeFileSync(filepath, content, 'utf8');

  res.download(filepath, filename, err => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors du téléchargement');
    } else {
      fs.unlinkSync(filepath);
    }
  });
});


router.get('/dab', (req, res) => {
  res.render('dab', { title: 'Dab', montant: null, devise: '€', result: null });
});


router.post('/dab', function(req, res) {
  const montant = parseFloat(req.body.montant);
  const devise = req.body.devise || '€';

  const result = determineCoupure({ montant, typeDevise: devise });

  res.render('dab', { title: 'Dab', montant, devise, result });
});



module.exports = router;
