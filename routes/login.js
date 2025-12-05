var express = require('express');
var router = express.Router();

// GET /login → afficher le formulaire
router.get('/', (req, res) => {
  res.render('login', { title: 'Connexion' });
});

// POST /login → traiter le formulaire
router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    req.session.username = username;
    req.session.isAdmin = true;
    return res.redirect('/');
  }

  res.render('login', {
    title: "Connexion",
    error: "Identifiants incorrects"
  });
});

module.exports = router;
