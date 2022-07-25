const {default:mongoose} = require("mongoose")

const categorieSchema = new mongoose.Schema({
nom: String,
idRestaurant: mongoose.Types.ObjectId
})

module.exports = mongoose.model("Categorie", categorieSchema) 