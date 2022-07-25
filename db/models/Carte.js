const {default:mongoose} = require("mongoose")
const elementSchema = require('../models/Element')
const menuSchema = require('../models/Menu')


const carteSchema = new mongoose.Schema({
menus: [menuSchema.schema],
elements: [elementSchema.schema]

})

module.exports = mongoose.model("Carte", carteSchema) 