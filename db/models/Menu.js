const {default:mongoose} = require("mongoose")

const menuSchema = new mongoose.Schema({
nom: String,
prix_HT: Number,
plats: mongoose.Types.ObjectId

})

module.exports = mongoose.model("Menu", menuSchema) 