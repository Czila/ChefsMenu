const {default:mongoose} = require("mongoose")
const elementSchema = require('../models/Element')

const menuSchema = new mongoose.Schema({
nom: String,
prix_HT: Number,
remise:Number,
elements: [elementSchema.schema],
idRestaurant : mongoose.Types.ObjectId

})

module.exports = mongoose.model("Menu", menuSchema) 