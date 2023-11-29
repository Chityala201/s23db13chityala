const mongoose = require("mongoose")
const cerealSchema = mongoose.Schema({
cerealBrandName: String,
cerealFlavor: {
    type : String,
    required : true,
    min: [5, 'minimum price is 5'],
    max: [20, 'maximum price is 20']
} ,
price: {
    type : Number,
    required : true,
    min: [1, 'minimum price is 1'],
    max: [10, 'maximum price is 10']
} 
})
module.exports = mongoose.model("cereal",
cerealSchema)