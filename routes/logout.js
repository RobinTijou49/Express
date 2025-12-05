// routes/logout.js
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/'); // redirige vers la page d'accueil
  });
});

module.exports = router;
