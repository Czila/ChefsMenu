const {default:mongoose} = require("mongoose")
const elementSchema = require('../models/Element')

const menuSchema = new mongoose.Schema({
nom: String,
prix_HT: Number,
tva: Number,
elements: [elementSchema.schema]

})

module.exports = mongoose.model("Menu", menuSchema) 