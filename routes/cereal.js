var express = require('express');
var router = express.Router();
var cereal_controlers = require('../controllers/cereal');
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
/* GET home page. */
router.get('/' , cereal_controlers.cereal_view_all_Page)
router.get('/detail', secured,  cereal_controlers.cereal_view_one_Page);
router.get('/create', secured, cereal_controlers.cereal_create_Page);
router.get('/update',secured,  cereal_controlers.cereal_update_Page);
router.get('/delete', secured, cereal_controlers.cereal_delete_Page);

module.exports = router;
