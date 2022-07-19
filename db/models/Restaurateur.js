const {default:mongoose} = require("mongoose")

const restaurateurSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    mail: {
        type: String,
        unique: true // `email` dois etre unique
    },
    motdepasse : String
})

module.exports = mongoose.model("Restaurateur", restaurateurSchema)