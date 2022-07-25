const {default:mongoose} = require("mongoose")

const restaurantSchema = new mongoose.Schema({
nom: String,
adresse: String,
cp: String,
ville: String,
nbTable: Number,
idRestaurateur: mongoose.Types.ObjectId
})

module.exports = mongoose.model("Restaurant", restaurantSchema) 