const {default:mongoose} = require("mongoose")

const restaurantSchema = new mongoose.Schema({
nom: String,
adresse: String,
cp: String,
ville: String,
image: String,
horaire: Date,
nbTable: Integer,
idRestaurateur,
test
})

module.exports = mongoose.model("Restaurant", restaurantSchema) 