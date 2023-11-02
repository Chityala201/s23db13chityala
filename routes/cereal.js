var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cereal', { title: 'Search Results Cereal food' });
});

module.exports = router;
