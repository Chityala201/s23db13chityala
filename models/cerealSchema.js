const mongoose = require("mongoose")
const cerealSchema = mongoose.Schema({
cerealBrandName: String,
cerealFlavor: String,
price: Number
})
module.exports = mongoose.model("cereal",
cerealSchema)