const {default:mongoose} = require("mongoose")

const carteSchema = new mongoose.Schema({
menus: [mongoose.Types.ObjectId],
plats: [mongoose.Types.ObjectId]

})

module.exports = mongoose.model("Carte", carteSchema) 