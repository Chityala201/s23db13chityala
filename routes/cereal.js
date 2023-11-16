var express = require('express');
var router = express.Router();
var cereal_controlers = require('../controllers/cereal');
/* GET home page. */
router.get('/' , cereal_controlers.cereal_view_all_Page)
router.get('/detail', cereal_controlers.cereal_view_one_Page);


module.exports = router;
