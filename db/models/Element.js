const {default:mongoose} = require("mongoose")

const elementSchema = new mongoose.Schema({
nom: String,
prix_HT: Number,
tva: Number,
description: String

})

module.exports = mongoose.model("Element", elementSchema) 