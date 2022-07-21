const {default:mongoose} = require("mongoose")

const commandeSchema = new mongoose.Schema({
    numTable: Number,
    menus : [mongoose.Types.ObjectId],
    elements :  [mongoose.Types.ObjectId],
    idRestaurant : mongoose.Types.ObjectId,
    etat: { type:String, default : 'enCours'}
})

module.exports = mongoose.model("Commande", commandeSchema) 