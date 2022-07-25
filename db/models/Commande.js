const {default:mongoose} = require("mongoose")

const menuSchema = require('../models/Menu')
const elementSchema = require('../models/Element')


const commandeSchema = new mongoose.Schema({
    numTable: Number,
    menus : [menuSchema.schema],
    elements :  [elementSchema.schema],
    idRestaurant : mongoose.Types.ObjectId,
    etat: { type:String, default : 'enCours'}
})

module.exports = mongoose.model("Commande", commandeSchema) 