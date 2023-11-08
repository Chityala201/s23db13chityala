var Costume = require('../models/cerealSchema');
var express = require('express');
const costume_controlers= require('../controllers/costume');
var router = express.Router();
// List of all Costumes
// exports.costume_list = function(req, res) {
// res.send('NOT IMPLEMENTED: Costume list');
// };

// exports.costume_list = async function(req, res) {
// try{
// theCostumes = await Costume.find();
// res.send(theCostumes);
// console.log(theCostumes);
// }
// catch(err){
// res.status(500);
// res.send(`{"error": ${err}}`);
// }
// };

exports.costume_list = async function (req, res) {
    try {
      const costumes = await Costume.find();
      res.json(costumes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.costume_view_all_Page = async function(req, res) {
    try{
    theCostumes = await Costume.find();
    res.render('cereal', { title: 'Costume Search Results', results: theCostumes });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
 
    // /* GET costumes */
    // router.get('/', costume_controlers.costume_view_all_Page );
    // module.exports = router;
    
    exports.costume_create_post = async function(req, res) {
        console.log(req.body)
        let document = new Costume();
        // We are looking for a body, since POST does not have query parameters.
        // Even though bodies can be in many different formats, we will be picky
        // and require that it be a json object
        // {"costume_type":"goat", "cost":12, "size":"large"}
cerealBrandName: String,
        document.cerealBrandName = req.body.cerealBrandName;
        document.cerealFlavor = req.body.cerealFlavor;
        document.price = req.body.price;
        try{
        let result = await document.save();
        res.send(result);
        }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
        };

// for a specific Costume.
exports.costume_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Costume detail: ' + req.params.id);
};
// Handle Costume create on POST.
// exports.costume_create_post = function(req, res) {
// res.send('NOT IMPLEMENTED: Costume create POST');
// };
// Handle Costume delete form on DELETE.
exports.costume_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.costume_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Costume update PUT' + req.params.id);
};
