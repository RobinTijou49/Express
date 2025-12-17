// routes/logout.js
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/tp-api');
  });
});

module.exports = router;
