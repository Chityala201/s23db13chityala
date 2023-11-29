var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var cereal_controller = require('../controllers/cereal');
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// cereal ROUTES ///
// POST request for creating a cereal.
router.post('/cereal', secured, cereal_controller.cereal_create_post);
// DELETE request to delete cereal.
router.delete('/cereal/:id', secured , cereal_controller.cereal_delete);
// PUT request to update cereal.
router.put('/cereal/:id',secured, cereal_controller.cereal_update_put);
// GET request for one cereal.
// router.get('/cereal/:id', cereal_controller.cereal_detail);
// GET request for list of all cereal items.
router.get('/cereal', secured, cereal_controller.cereal_list);
module.exports = router;

