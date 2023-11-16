var cereals = require('../models/cerealSchema');
// List of all institute
 
// List of all Costumes
exports.cereal_list = async function(req, res) {
    try{
    thecereal = await cereals.find();
    res.send(thecereal);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

    // exports.aeroplane_view_one_Page = async function(req, res) {
    //   console.log("single view for id " + req.query.id)
    //   try{
    //   result = await Costume.findById( req.query.id)
    //   res.render('cerealdetail',
    //  { title: 'Cereal Detail', toShow: result });
    //   }
    //   catch(err){
    //   res.status(500)
    //   res.send(`{'error': '${err}'}`);
    //   }
    //  };
 
    // VIEWS
// Handle a show all view
exports.cereal_view_all_Page = async function(req, res) {
    try{
    thecereal = await cereals.find();
    res.render('cereal', { title: 'cereal Search Results', results: thecereals });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
 
    // Handle Costume create on POST.
exports.cereal_create_post = async function(req, res) {
console.log(req.body)
let document = new cereals();
// We are looking for a body, since POST does not have query parameters.
// Even though bodies can be in many different formats, we will be picky
// and require that it be a json object
// {"costume_type":"goat", "cost":12, "size":"large"}
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

exports.cereal_view_one_Page = async function(req, res) {
  try{
  const result = await cereals.findById(req.query.id)
  res.render('cerealdetail',
  { title: 'Cereal Detail', toShow: result });
 
  }
  catch(err){
  res.status(500)
  res.send({'error': '${err}'});
  }
  };
 
// for a specific institute.
// exports.cereal_view_one_Page = async function(req, res) {
//     console.log("detail" + req.params.id)
//     try {
//     result = await cereals.findById( req.params.id)
//     res.send(result)
//     } catch (error) {
//     res.status(500)
//     res.send(`{"error": document for id ${req.params.id} not found`);
//     }
// };
  // Handle institute create on POST.
  /*exports.institute_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: institute create POST');
  };*/
  // Handle institute delete form on DELETE.
  exports.cereal_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await cereals.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
  };
  // Handle institute update form on PUT.
  exports.cereal_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
      let toUpdate = await cereals.findById(req.params.id);
   
      // Do updates of properties
      if (req.body.cerealBrandName) toUpdate.cerealBrandName = req.body.cerealBrandName;
      if (req.body.cerealFlavor) toUpdate.cerealFlavor = req.body.cerealFlavor;
      if (req.body.price) toUpdate.price = req.body.price;
   
      let result = await toUpdate.save();
      console.log("Success " + result)
      res.send(result);
    } catch (err) {
      res.status(500).send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }};
 



 
