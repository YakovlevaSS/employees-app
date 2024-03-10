var express = require('express');
var router = express.Router();


router.post('/login', function(req, res) {
  res.send('login');
});

router.post('/register', function(req, res) {
  res.send('register');
});

router.get('/login', function(req, res) {
  res.send('current');
});

module.exports = router;
